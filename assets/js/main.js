const data = [
    { id: 1, name: "Bulbasaur", types: ["poison", "grass"] },
    { id: 5, name: "Charmeleon", types: ["fire"] },
    { id: 9, name: "Blastoise", types: ["water"] },
    { id: 12, name: "Butterfree", types: ["bug", "flying"] },
    { id: 16, name: "Pidgey", types: ["normal", "flying"] },
    { id: 23, name: "Ekans", types: ["poison"] },
    { id: 24, name: "Arbok", types: ["poison"] },
    { id: 25, name: "Pikachu", types: ["electric"] },
    { id: 37, name: "Vulpix", types: ["fire"] },
    { id: 52, name: "Meowth", types: ["normal"] },
    { id: 63, name: "Abra", types: ["psychic"] },
    { id: 67, name: "Machamp", types: ["fighting"] },
    { id: 72, name: "Tentacool", types: ["water", "poison"] },
    { id: 74, name: "Geodude", types: ["rock", "ground"] },
    { id: 87, name: "Dewgong", types: ["water", "ice"] },
    { id: 98, name: "Krabby", types: ["water"] },
    { id: 115, name: "Kangaskhan", types: ["normal"] },
    { id: 122, name: "Mr. Mime", types: ["psychic"] },
    { id: 133, name: "Eevee", types: ["normal"] },
    { id: 144, name: "Articuno", types: ["ice", "flying"] },
    { id: 145, name: "Zapdos", types: ["electric", "flying"] },
    { id: 146, name: "Moltres", types: ["fire", "flying"] },
    { id: 148, name: "Dragonair", types: ["dragon"] }
];

const nombrePokemon = new Map(),
    idPokemon = new Map(),
    listaPokemonIngresado = new Set();

for(const pokemon in data) {
    nombrePokemon.set(data[pokemon].name, pokemon);
    idPokemon.set(data[pokemon].id.toString(), pokemon);
}

const posicionPokemon = pokemon => data[idPokemon.get(pokemon) || nombrePokemon.get(pokemon)]

const buscarPokemon = (pokemon, callback) => 
    setTimeout(() => {
        callback(posicionPokemon(pokemon))
    }, 1000);

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

const anadirPokemon = pokemon => {
    if(listaPokemonIngresado.has(pokemon)) {
        alert(`Ingrese un Pokemon diferente`)
    } else {
        listaPokemonIngresado.add(pokemon);
        ordenarPokemon(listaPokemonIngresado, pokemonOrdenados => {
            const contenedorMostrarPokemon = document.getElementById("contenedorMostrarPokemon");
            contenedorMostrarPokemon.innerHTML = "";
            pokemonOrdenados.forEach(pokemon => {
                try {
                    contenedorMostrarPokemon.appendChild(ordenarDatos(pokemon));
                } catch (error) {
                    alert(`El Pokemon ingresado no existe.`);
                }
            })
        });
    }
}

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

document.getElementById("btn").addEventListener("click", e => {
    buscarPokemon(document.getElementById("pokemon").value, anadirPokemon)
})

const ordenarPokemon = (pokemon, callback) => {
    setTimeout(() => {
        const listaPokemonArray = [...pokemon];
        callback(listaPokemonArray.slice().sort((a, b) => 
            { return a.id - b.id; })
        );
    }, 500);
};