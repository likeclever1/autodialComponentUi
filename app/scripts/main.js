"use strict";
let inst = new uploadData({
    "url": "server.js",
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



