const url = "http://localhost:3000/futar";

document.addEventListener("DOMContentLoaded", function () {
    const createButton = document.getElementById("create");
    const readButton = document.getElementById("select");
    const updateButton = document.getElementById("update");
    const deleteButton = document.getElementById("delete");

    createButton.addEventListener("click", function () {
        //-- insert.html betöltése
        window.location.href = "insert.html";
    });

    readButton.addEventListener("click", function () {
        window.location.href = "select.html";
    });

    updateButton.addEventListener("click", function () {
        window.location.href = "update.html";
    });

    deleteButton.addEventListener("click", function () {    
        window.location.href = "delete.html";
    });
});