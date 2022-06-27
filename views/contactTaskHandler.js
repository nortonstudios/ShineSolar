
//Build and send http request.
const todoUrl = 'https://jsonplaceholder.typicode.com/todos';
const todoXhr = new XMLHttpRequest();
var respJSON;
todoXhr.open("GET", todoUrl);
todoXhr.send();

todoXhr.onload = function(){
    
    //Successful http query, saves results.
    if (todoXhr.status === 200){
        
        respJSON = JSON.parse(todoXhr.responseText);
    } 

    //Error screen for anything but a 200 response.
    else {
        document.getElementById("modal-content").innerHTML = "Cannot load user content from remote server.";
    }
}

//http request fail error message
todoXhr.onerror = function() {
    document.getElementById("modal-content").innerHTML = "Cannot load todo tasks from remote server.";
}

//Builds list of tasks. Passed id from clicked element matched against 
//userId in http get payload. Each entry is added as a new div.
function buildModal(rowId){

    for(var i = 0; i < respJSON.length; i++){
            if (respJSON[i].userId == parseInt(rowId)){
                var taskRow = document.createElement("div");
                taskRow.innerHTML = respJSON[i].title;
                document.getElementById("modal-content").appendChild(taskRow);
            }
        }
    
}