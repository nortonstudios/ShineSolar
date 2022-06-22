
//Build and send http request.
const url = 'https://jsonplaceholder.typicode.com/users';
const xhr = new XMLHttpRequest();
xhr.open("GET", url);
xhr.send();

//Receive response from url
xhr.onload = function(){
    //Expected 200, trusting that it is the JSON we are expecting. 
    //With more time, the next improvement would be more valitation here.
    if(xhr.status === 200){
       
        const httpResponse = JSON.parse(xhr.responseText); 
        const contactList = document.getElementById("contact-list");

        //Creates header row.
        var titleRowDiv = document.createElement("div");
        titleRowDiv.id = "0";
        titleRowDiv.innerHTML = "<span>Name</span><span>Website</span><span>Email</span><span>Address<span>";
        //titleRowDiv.onclick();
        contactList.appendChild(titleRowDiv);
        
        //Makes HTML rows for each entry.        
        //Chunks into the desired fields in spans inside a div.
        for(var i =0; i < httpResponse.length; i++){
            var contactRowDiv = document.createElement("div");
            contactRowDiv.id = httpResponse[i].id;
            contactRowDiv.innerHTML = "<span>" + httpResponse[i].name + "<span>" + 
                "<span>" + httpResponse[i].website + "<span>" + 
                "<span>" + httpResponse[i].email + "<span>" +
                "<span>" + httpResponse[i].address.street + ',' +
            httpResponse[i].address.city + ',' +
            httpResponse[i].address.zipcode + "<span>";
            contactList.appendChild(contactRowDiv);
        }
    } 
    //Error screen for anything but a 200 response.
    else {
        document.getElementById("contact-list").innerHTML = "Cannot load contact list from remote server.";
    }
}

//xhr request fail error message
xhr.onerror = function() {
    document.getElementById("contact-list").innerHTML = "Cannot contact remote server for contact list.";
}
