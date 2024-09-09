import { data, nombrePokemon, idPokemon, listaPokemonIngresado} from "./data.js";

const posicionPokemon = pokemon => data[idPokemon.get(pokemon) || nombrePokemon.get(pokemon)]

const buscarPokemon = (pokemon, callback) => 
    setTimeout(() => {
        callback(posicionPokemon(pokemon))
    }, 1000);

const ordenarPokemon = (pokemon, callback) => {
    setTimeout(() => {
        const listaPokemonArray = [...pokemon];
        callback(listaPokemonArray.slice().sort((a, b) => 
            { return a.id - b.id; })
        );
    }, 500);
};

const anadirPokemon = pokemon => {
    if(pokemon !== undefined) {
        if(listaPokemonIngresado.has(pokemon)) {
            alert(`Ingrese un Pokemon diferente`)
        } else {
                listaPokemonIngresado.add(pokemon);
                ordenarPokemon(listaPokemonIngresado, pokemonOrdenados => {
                    const contenedorMostrarPokemon = document.getElementById("contenedorMostrarPokemon");
                    contenedorMostrarPokemon.innerHTML = "";
                    pokemonOrdenados.forEach(pokemon => {
                        contenedorMostrarPokemon.appendChild(ordenarDatos(pokemon));                        
                    })
                });
        }
    } else {
        alert(`El pokemon ingresado no existe`);
    }
}

const buscarTipos = pokemon => {
    let texto = "";
    for(const tipo in pokemon) {
        texto += `<p class="tipoPokemon ${pokemon[tipo]}">${pokemon[tipo]}</p>`;
    }
    return texto;
}

const cambiarIdPokemon = pokemon => 
    (pokemon.toString().length == 1) ? pokemon = "00" + pokemon 
    : (pokemon.toString().length == 2) ? pokemon = "0" + pokemon 
    : pokemon

const ordenarDatos = pokemon => {
    const contenedorPokemon = document.createElement("div");
    contenedorPokemon.classList.add("contenedorPokemon");
    contenedorPokemon.innerHTML += `
        <p class="idPokemon">#${cambiarIdPokemon(pokemon.id)}</p>
        <p class="nombrePokemon">${pokemon.name}</p>
        <div class="contenedorTipos">
            ${buscarTipos(pokemon.types)}
        </div>
        `;
    return contenedorPokemon;
}

export {buscarPokemon, anadirPokemon};