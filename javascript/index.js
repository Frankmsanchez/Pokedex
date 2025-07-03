// Obtenemos los elementos del DOM
const pokemonListElement = document.getElementById('pokemon-list');
const generationSelect = document.getElementById('generation-select');

// Configuración para cada generación (offset = desde qué número, limit = cuántos Pokémon)
const generations = {
    1: { offset: 0, limit: 151 },
    2: { offset: 151, limit: 100 },
    3: { offset: 251, limit: 135 },
    4: { offset: 386, limit: 107 },
    5: { offset: 493, limit: 156 }
};

// Función para obtener la lista de Pokémon (nombre y URL para más datos)
async function fetchPokemonData(offset = 0, limit = 151) {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
    const response = await fetch(url);
    const data = await response.json();
    return data.results; // Devuelve un array con nombre y URL de cada Pokémon
}

// Función para mostrar en pantalla los Pokémon de la generación elegida
async function displayPokemon(offset = 0, limit = 151) {
    pokemonListElement.innerHTML = ""; // Limpiar la vista antes de renderizar nuevos


    // Traemos la lista de Pokémon con nombre y URL
    const pokemonArray = await fetchPokemonData(offset, limit);

    // Por cada Pokémon, traemos su información completa y creamos su tarjeta
    for (const pokemon of pokemonArray) {
        const response = await fetch(pokemon.url);           // Llamada individual por cada Pokémon
        const pokemonDetails = await response.json();        // Obtenemos todos sus datos

        // Crear contenedor/card para cada Pokémon
        const pokemonCard = document.createElement('div');
        pokemonCard.classList.add('card', 'text-center', 'p-2'); // p-2 es más ligero
        pokemonCard.style.width = "150px";

        // Imagen del Pokémon (sprite frontal)
        const pokemonImage = document.createElement('img');
        pokemonImage.src = pokemonDetails.sprites.front_default;
        pokemonImage.classList.add("card-img-top");
        pokemonImage.alt = pokemonDetails.name;

        // Contenedor para el nombre del Pokémon
        const body = document.createElement("div");
        body.classList.add("card-body", "p-1");

        const title = document.createElement('h6');
        title.classList.add("card-title", "text-capitalize");
        title.textContent = pokemonDetails.name;

        // Insertar nombre e imagen en la tarjeta
        body.appendChild(title);
        pokemonCard.appendChild(pokemonImage);
        pokemonCard.appendChild(body);

        // Añadir la tarjeta al contenedor principal
        pokemonListElement.appendChild(pokemonCard);
    }
}

// Cuando el usuario cambia de generación, se cargan los nuevos Pokémon
generationSelect.addEventListener('change', () => {
    const gen = generationSelect.value;               // Obtener generación seleccionada
    const { offset, limit } = generations[gen];       // Obtener datos correspondientes
    displayPokemon(offset, limit);                    // Cargar Pokémon
});

// Mostrar por defecto la generación 1 al cargar la página
displayPokemon();
