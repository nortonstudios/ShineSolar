//Build and send http request for users.
const usersUrl : string = 'https://jsonplaceholder.typicode.com/users';
const usersXhr = new XMLHttpRequest();
usersXhr.open("GET", usersUrl);
usersXhr.send();

//Receive response from url
usersXhr.onload = function(){
    //Expected 200, trusting that it is the JSON we are expecting. 
    //With more time, the next improvement would be more valitation here.
    if(usersXhr.status === 200){
       
        const httpResponse = JSON.parse(usersXhr.responseText); 
        const contactList = document.getElementById("contact-list");

        //Creates header row.
        var titleRowDiv = document.createElement("div");
        titleRowDiv.id = "0";
        titleRowDiv.className = "title-row";
        titleRowDiv.innerHTML = "<span>Name</span><span>Website</span><span>Email</span><span>Address<span>";
        //titleRowDiv.onclick();
        contactList.appendChild(titleRowDiv);
        
        //Makes HTML rows for each entry.        
        //Chunks into the desired fields in spans inside a div.
        for(var i =0; i < httpResponse.length; i++){
            var contactRowDiv = document.createElement("div");
            //contactRowDiv.style = "cursor: pointer";
            contactRowDiv.id = httpResponse[i].id;
            contactRowDiv.className = "contact-row";
            //On Click, calls build function from contactTaskHandler.js
            contactRowDiv.addEventListener('click', function(){buildModal(this.id);});
            //Builds out data in row.
            contactRowDiv.innerHTML = "<span class=\"contact-name\">" + httpResponse[i].name + "</span>" + 
                "<span>" + httpResponse[i].website + "</span>" + 
                "<span>" + httpResponse[i].email + "</span>" +
                "<span>" + httpResponse[i].address.street + ',' +
            httpResponse[i].address.city + ',' +
            httpResponse[i].address.zipcode + "</span>";
            contactList.appendChild(contactRowDiv);
        }
    } 
    //Error screen for anything but a 200 response.
    else {
        document.getElementById("contact-list").innerHTML = "Cannot load contact list from remote server.";
    }
}

//http request fail error message
usersXhr.onerror = function() {
    document.getElementById("contact-list").innerHTML = "Cannot contact remote server for contact list.";
}

//Build and send http request for todo list items. 
const todoUrl : string = 'https://jsonplaceholder.typicode.com/todos';
const todoXhr = new XMLHttpRequest();
var respJSON : any;
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
function buildModal(rowId : string ){

    //Clear modal
    document.getElementById("modal-content").innerHTML = "";

    //Builds contect 1 row at a time. Each matching rowId from http response is appended to end.
    for(var i = 0; i < respJSON.length; i++){
        if (respJSON[i].userId == parseInt(rowId)){
            var taskRow = document.createElement("div");
            taskRow.innerHTML = respJSON[i].title;
            
            document.getElementById("modal-content").appendChild(taskRow);
        }
    }

    //Set modal to visable
    
    
}