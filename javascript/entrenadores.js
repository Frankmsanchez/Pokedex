// entrenadores.js
import { obtenerEntrenadores } from './db.js';

document.addEventListener('DOMContentLoaded', async () => {
  const lista = document.getElementById('lista-entrenadores');

  try {
    const entrenadores = await obtenerEntrenadores();

    if (entrenadores.length === 0) {
      lista.innerHTML = "<p class='text-muted'>No hay entrenadores registrados aún.</p>";
      return;
    }

    entrenadores.forEach(ent => {
      const card = document.createElement('div');
      card.classList.add('card', 'm-2');
      card.style.width = '200px';

      card.innerHTML = `
        <img src="${ent.foto}" class="card-img-top" alt="${ent.nombre}">
        <div class="card-body">
          <h5 class="card-title">${ent.nombre}</h5>
          <p class="card-text">${ent.sexo}<br>${ent.residencia}</p>
        </div>
      `;

      lista.appendChild(card);
    });
  } catch (error) {
    lista.innerHTML = "<p class='text-danger'>Error cargando entrenadores.</p>";
    console.error(error);
  }
});

