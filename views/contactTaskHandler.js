


//Build and send http request.
const todoUrl = 'https://jsonplaceholder.typicode.com/todos';
const todoXhr = new XMLHttpRequest();
todoXhr.open("GET", todoUrl);
todoXhr.send();

todoXhr.onload = function(){
    
    if (todoXhr.status === 200){
        document.getElementById("modal-content").innerHTML = todoXhr.responseText;
    } 

    //Error screen for anything but a 200 response.
    else {
        document.getElementById("modal-content").innerHTML = "Cannot load user content from remote server.";
    }
}

todoXhr.onerror = function() {
    document.getElementById("modal-content").innerHTML = "Cannot load todo tasks from remote server.";

}