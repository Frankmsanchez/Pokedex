// db.js
const DB_NAME = "PokedexDB";
const DB_VERSION = 1;

export function abrirDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => reject("Error al abrir DB");
    request.onsuccess = () => resolve(request.result);

    request.onupgradeneeded = (e) => {
      const db = e.target.result;
      if (!db.objectStoreNames.contains('entrenadores')) {
        db.createObjectStore('entrenadores', { keyPath: 'id', autoIncrement: true });
      }
      if (!db.objectStoreNames.contains('equipos')) {
        db.createObjectStore('equipos', { keyPath: 'id', autoIncrement: true });
      }
    };
  });
}

export async function guardarEquipo(equipo) {
  const db = await abrirDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction('equipos', 'readwrite');
    const store = tx.objectStore('equipos');
    const request = store.add(equipo);
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject("Error al guardar equipo");
  });
}
export async function guardarEntrenador(entrenador) {
  const db = await abrirDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction('entrenadores', 'readwrite');
    const store = tx.objectStore('entrenadores');
    const request = store.add(entrenador);
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject("Error al guardar entrenador");
  });
}

export async function obtenerEntrenadores() {
  const db = await abrirDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction('entrenadores', 'readonly');
    const store = tx.objectStore('entrenadores');
    const request = store.getAll();
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject("Error al obtener entrenadores");
  });
}
