// CrearEntrenadores.js
import { guardarEntrenador } from './db.js';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const entrenador = {
      nombre: form.nombre.value.trim(),
      sexo: form.sexo.value,
      residencia: form.residencia.value.trim(),
      foto: form.foto.value.trim(),
    };

    try {
      await guardarEntrenador(entrenador);
      alert('Entrenador guardado con éxito');
      form.reset();
    } catch (error) {
      alert('Error al guardar el entrenador');
      console.error(error);
    }
  });
});
