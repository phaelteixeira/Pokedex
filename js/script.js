const pokemonName = document.querySelector('.pokemon__name');
const pokemonNumber = document.querySelector('.pokemon__number');
const pokemonImage = document.querySelector('.pokemon__image');
const form = document.querySelector('.form');
const input = document.querySelector('.input__search');
const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');

let pokemonSearch = 1;

const fetchPokemon = async (pokemon) => {
    const apiResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    if (apiResponse.status === 200){
        const data = await apiResponse.json();
        return data;
    }  
}

const renderPokemon = async (pokemon) => {
    pokemonName.innerHTML = 'Loading...';

    const data = await fetchPokemon(pokemon);

    if (data) {
        pokemonSearch = data.id;
        pokemonImage.style.display = 'block';
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id;
        pokemonImage.src = data.sprites.versions['generation-v']['black-white'].animated.front_default;
        input.value = '';
    } else { 
        pokemonImage.style.display = 'none';
        pokemonName.innerHTML = 'Not Found';
        pokemonNumber.innerHTML = '404';
    }
}

form.addEventListener('submit', (event) => {
    event.preventDefault();
    renderPokemon(input.value.toLowerCase());
});

buttonPrev.addEventListener('click', () => {
    if (pokemonSearch > 1) {
        pokemonSearch -= 1;
        renderPokemon(pokemonSearch);
    }    
});

buttonNext.addEventListener('click', () => {
    pokemonSearch += 1;
    renderPokemon(pokemonSearch);
});

renderPokemon(pokemonSearch);