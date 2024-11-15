

document.addEventListener("DOMContentLoaded", async function () {
  const createButton = document.getElementById("createButton");

  const backendurl = "http://localhost:3000/futar";
  const nev = document.getElementById("nev").value;
  const tel = document.getElementById("tel").value;
  //-- ellenőrzések ----------------------------------------------------------------
  const jsontext = `{"nev":"${nev}",
          "tel":"${tel}"}`; //-- mező tartalmakat JSON string formátumúra alakitjuk
  const json = JSON.parse(jsontext); // JSON stringet JSON objektummá alakitja
  console.log(json);
  const response = await fetch(backendurl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(json),
  });
  if (response.status === 200) {
    alert("Sikeres adatfelvitel");
    document.getElementById("nev").value = "";
    document.getElementById("tel").value = "";
  } else {
    alert("Sikertelen adatfelvitel");
  }
  console.log(response);
});

    //-- mező tartalmakat JSON string formátumúra alakitjuk
   