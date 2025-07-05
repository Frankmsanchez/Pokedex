import { guardarEquipo, obtenerEntrenadores } from './db.js'; 

document.addEventListener('DOMContentLoaded', async () => {
  const selectEntrenador = document.getElementById('select-entrenador');

  try {
    const entrenadores = await obtenerEntrenadores();
    entrenadores.forEach(ent => {
      const option = document.createElement('option');
      option.value = ent.id;
      option.textContent = ent.nombre;
      selectEntrenador.appendChild(option);
    });
  } catch (err) {
    console.error('Error al cargar entrenadores', err);
  }

  // Formulario de equipo
  document.getElementById('form-equipo').addEventListener('submit', async (e) => {
    e.preventDefault();

    const form = e.target;
    const nombre = form.nombre.value;
    const imagen = form.imagen.value;
    const entrenadorId = Number(form.entrenador.value);
    const pokemons = Array.from(form.querySelectorAll('input[name="pokemon"]:checked')).map(el => el.value);

    if (pokemons.length > 6) {
      alert("Solo puedes seleccionar hasta 6 Pokémon.");
      return;
    }

    const equipo = { nombre, imagen, entrenadorId, pokemons };

    try {
      await guardarEquipo(equipo);
      alert("Equipo guardado con éxito.");
      form.reset();
    } catch (error) {
      alert("Error al guardar equipo");
      console.error(error);
    }
  });
});

