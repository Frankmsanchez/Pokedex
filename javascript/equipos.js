import { abrirDB } from './db.js'; 

document.addEventListener('DOMContentLoaded', async () => {
  const container = document.getElementById('lista-equipos');
  try {
    const db = await abrirDB();
    const transaction = db.transaction('equipos', 'readonly');
    const store = transaction.objectStore('equipos');
    const request = store.getAll();

    request.onsuccess = () => {
      const equipos = request.result;
      if (equipos.length === 0) {
        container.innerHTML = "<p class='text-muted'>No hay equipos registrados aún.</p>";
        return;
      }

      equipos.forEach((equipo) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.style.width = '200px';

        card.innerHTML = `
          <img src="${equipo.imagen}" class="card-img-top" alt="${equipo.nombre}">
          <div class="card-body">
            <h5 class="card-title">${equipo.nombre}</h5>
            <a href="equipos.html?id=${equipo.id}" class="btn btn-primary">Ver Detalle</a>
          </div>
        `;
        container.appendChild(card);
      });
    };

    request.onerror = () => {
      container.innerHTML = "<p class='text-danger'>Error cargando equipos.</p>";
    };

  } catch (error) {
    container.innerHTML = "<p class='text-danger'>Error inesperado.</p>";
    console.error(error);
  }
});
