let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
function showTime() {
    const date = new Date()
    return date.getHours() + "Hrs:" + date.getMinutes() + "Mins:" + date.getSeconds() + "Secs";
}
function makePromiseCall(methodType, url, async = true, data = null) {
    return new Promise(function (resolve, reject) {
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            // console.log(methodType+" State Changed called at:"+showTime()
            //         +" Ready state: "+xhr.readyState+" status: "+xhr.status);
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

        xhr.open(methodType, url, async);
        if (data) {
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.send(JSON.stringify(data));
        } else xhr.send();
        console.log(methodType + " request sent to the server at: " + showTime());
    });
}
const getURL = "http://127.0.0.1:3000/employees/1";
makePromiseCall("GET", getURL, true)
    .then(responseText => {
        console.log("Get User Data at: " + showTime() + "data:" + responseText)
    })
    .catch(error => console.log("GET  Eror Status: " + JSON.stringify(error)));



const deleteURL = "http://127.0.0.1:3000/employees/1";
makePromiseCall("DELETE", deleteURL, false)
    .then(responseText => {
        console.log("User Deleted: " + showTime() + "data:" + responseText)
    })
    .catch(error => console.log("DELETE Error status: " + JSON.stringify(error)));


const postURL = "http://127.0.0.1:3000/employees";
const empData= {"name":"Chethan","Salary":"23000"};
makePromiseCall("POST",postURL,true,empData)
.then(responseText => {
    console.log("User Added: " + showTime() + "data:" + responseText)
})
.catch(error => console.log("POST Eror Status: " + JSON.stringify(error)));