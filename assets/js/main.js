import { buscarPokemon, anadirPokemon} from "./callback.js";

document.getElementById("btn").addEventListener("click", e => {
    buscarPokemon(document.getElementById("pokemon").value, anadirPokemon)
})