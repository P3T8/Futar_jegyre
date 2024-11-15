const apiUrl = '/futar';

// Futár lista betöltése
function loadFutars() {
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      const tableBody = document.querySelector('#futarTable tbody');
      tableBody.innerHTML = '';
      data.forEach(futar => {
        const row = `
          <tr>
            <td>${futar.id}</td>
            <td>${futar.fazon}</td>
            <td>${futar.fnev || '-'}</td>
            <td>${futar.ftel}</td>
            <td>
              <button class="edit" onclick="editFutar(${futar.id})">Szerkesztés</button>
              <button class="delete" onclick="deleteFutar(${futar.id})">Törlés</button>
            </td>
          </tr>
        `;
        tableBody.insertAdjacentHTML('beforeend', row);
      });
    })
    .catch(error => console.error('Hiba a futárok betöltésekor:', error));
}

// Új futár hozzáadása
document.querySelector('#addFutarForm').addEventListener('submit', function(e) {
  e.preventDefault();
  
  const formData = new FormData(e.target);
  const data = {
    fazon: formData.get('fazon'),
    fnev: formData.get('fnev'),
    ftel: formData.get('ftel'),
  };

  fetch(apiUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
    .then(response => response.json())
    .then(() => {
      loadFutars();
      e.target.reset();
    })
    .catch(error => console.error('Hiba új futár hozzáadásakor:', error));
});

// Futár törlése
function deleteFutar(id) {
  fetch(`${apiUrl}/${id}`, { method: 'DELETE' })
    .then(() => loadFutars())
    .catch(error => console.error('Hiba a futár törlésekor:', error));
}

// Oldal betöltésekor futárok betöltése
document.addEventListener('DOMContentLoaded', loadFutars);
