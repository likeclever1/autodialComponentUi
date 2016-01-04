"use strict";
let inst = new addCSVList({
    "componentRoot": document.querySelector("[data-component='userUploadCSVFile']"),
    "btnFile": document.getElementById("uploadFile"),
    "btnRenderTable": document.getElementById("renderTable"),
    "btnSubmit": document.getElementById("submitData"),
    "typeFields": [
        {
            "id": "name",
            "title": "Имя"
        },
        {
            "id": "lname",
            "title": "Фамилия"
        },
        {
            "id": "email",
            "title": "Почтовый адресс"
        },
        {
            "id": "index",
            "title": "Индекс"
        },
        {
            "id": "phoneNumber",
            "title": "Номер Телефона"
        }
    ]
});

let dialog = new Dialog(
    {
        "component": "dialog",
        "templateId": "dialog-edit-row"
    }
);


let theTemplateScript = document.getElementById("title-list-handlebars").innerHTML.trim();
let theTemplate = Handlebars.compile(theTemplateScript);

var items = {
    data: [
        {
            "id"   : "name",
            "title": "Имя",
            "options": ["Имя", "Индекс", "Фамилия"]
        },
        {
            "id"   : "lname",
            "title": "Фамилия",
            "options": ["Имя", "Индекс", "Фамилия"]
        },
    ],
}
var theCompiledHtml = theTemplate(items);

