var usersUrl = 'https://jsonplaceholder.typicode.com/users';
var usersXhr = new XMLHttpRequest();
usersXhr.open("GET", usersUrl);
usersXhr.send();
usersXhr.onload = function () {
    if (usersXhr.status === 200) {
        var httpResponse = JSON.parse(usersXhr.responseText);
        var contactList = document.getElementById("contact-list");
        var titleRowDiv = document.createElement("div");
        titleRowDiv.id = "title-row";
        titleRowDiv.className = "title-row";
        titleRowDiv.innerHTML = "<span class=\"title-col\">Name</span><span class=\"title-col\">Website</span><span class=\"title-col\">Email</span><span class=\"title-col\">Address<span>";
        contactList.appendChild(titleRowDiv);
        for (var i = 0; i < httpResponse.length; i++) {
            var contactRowDiv = document.createElement("div");
            contactRowDiv.id = httpResponse[i].id;
            contactRowDiv.className = "contact-row";
            contactRowDiv.addEventListener('click', function () { buildModal(this.id, respJSON); });
            contactRowDiv.innerHTML = "<div id=\"contact-name\" class=\"contact-col\">" + httpResponse[i].name + "</div>" +
                "<div class=\"contact-col\">" + httpResponse[i].website + "</div>" +
                "<div class=\"contact-col\">" + httpResponse[i].email + "</div>" +
                "<div class=\"contact-col\">" + httpResponse[i].address.street + ',' +
                httpResponse[i].address.city + ',' +
                httpResponse[i].address.zipcode + "</div>";
            contactList.appendChild(contactRowDiv);
        }
    }
    else {
        document.getElementById("contact-list").innerHTML = "Cannot load contact list from remote server.";
    }
};
usersXhr.onerror = function () {
    document.getElementById("contact-list").innerHTML = "Cannot contact remote server for contact list.";
};
var todoUrl = 'https://jsonplaceholder.typicode.com/todos';
var todoXhr = new XMLHttpRequest();
var respJSON;
todoXhr.open("GET", todoUrl);
todoXhr.send();
todoXhr.onload = function () {
    if (todoXhr.status === 200) {
        respJSON = JSON.parse(todoXhr.responseText);
    }
    else {
        document.getElementById("modal-content").innerHTML = "Cannot load user content from remote server.";
    }
};
todoXhr.onerror = function () {
    document.getElementById("modal-content").innerHTML = "Cannot load todo tasks from remote server.";
};
function buildModal(rowId, respJSON) {
    document.getElementById("modal-content").innerHTML = "";
    for (var i = 0; i < respJSON.length; i++) {
        if (respJSON[i].userId == parseInt(rowId)) {
            var taskRow = document.createElement("div");
            taskRow.innerHTML = respJSON[i].title;
            document.getElementById("modal-content").appendChild(taskRow);
        }
    }
}
