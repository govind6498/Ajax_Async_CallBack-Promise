function showTime(){
    const date = new Date()
    return date.getHours()+"Hrs:"+date.getMinutes()+"Mins:"+date.getSeconds()+"Secs";
}
function makeServiceCall(methodType, url, async = true, data = null) {
    return new Promise(function (resolve, reject) {
        let xhr = new XMLHttpRequest();
        xhr.onload = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200 || xhr.status === 201) {
                    resolve(xhr.responseText);
                }
                else if (xhr.status >= 400) {
                    reject({
                        status: xhr.status,
                        statusText: xhr.statusText
                    });
                    console.log("Handle 400 client Error or 500 server Error at: " + showTime());
                }
            }
        }
        xhr.onerror = function(){
            reject({
                status: this.status,
                statusText: xhr.statusText
            });
        };

        xhr.open(methodType, url, async);
        if (data) {
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.send(JSON.stringify(data));
        } 
        else {
            xhr.send();
        }
        console.log(methodType + " request sent to the server at: " + showTime());
    });
}


const getElem = document.querySelector("#get_services");
const getURL = "http://127.0.0.1:3000/employeePayrollDB/1";
makeServiceCall("GET", getURL, true)
    .then(responseText => {
       getElem.textContent = "Get user data: "+responseText;
    })
    .catch(error => {getElem.textContent = "GET Error status: "+JSON.stringify(error)
});


const deleteElem = document.querySelector("#delete_services");
const deleteURL = "http://127.0.0.1:3000/employeePayrollDB/3";
makeServiceCall("DELETE", deleteURL, false)
    .then(responseText => {
        deleteElem.textContent = "User deleted:"+responseText;
    })
    .catch(error => {deleteElem.textContent="DELETE Error status:"+JSON.stringify(error)
});

const postElem = document.querySelector("post_services")
const postURL = "http://127.0.0.1:3000/employeePayrollDB/1";
const empData= {"name":"Chethan","Salary":"23000"};
makeServiceCall("POST",postURL,true,empData)
.then(responseText => {
    postElem.textContent = "User added: "+responseText;
})
.catch(error => {postElem.textContent="POST Error status: "+JSON.stringify(error)
});