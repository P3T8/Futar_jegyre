const backendurl = "http://localhost:3000/futar";
document.addEventListener("DOMContentLoaded", function () {
    async function listaFrissites() {
        let select = document.getElementById("id");
        //-- töröljük a benne lévő option tagokat ---
        let length = select.options.length;
        for (i = length - 1; i >= 0; i--) {
            select.options[i] = null;
        }
    }
    listaFrissites();
    document.getElementById("updateButton").addEventListener("click", function () {
        let modifiedFutar = new FormData(document.getElementById("updateForm"));
        modifiedFutar = Object.fromEntries(modifiedfutar);
        console.log(modifiedFutar);
        fetch(backendurl + "/" + modifiedFutar.id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(modifiedFutar)
        })
    })
    document.getElementById("id").addEventListener("change", async function () {
        let id = this.value;
        const response = await fetch(backendurl + "/" + id);
        const data = await response.json();
        console.log(data);
        document.getElementById("nev").value = data.nev;
        document.getElementById("tel").value = data.tel;
    });
    document.getElementById("deleteButton").addEventListener("click", async function () { });

})