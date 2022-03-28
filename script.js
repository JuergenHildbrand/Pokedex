let allPokemons = [];



async function loadPokemon() {
    for (let id = 1; id < 111; id++) {
        let url = `https://pokeapi.co/api/v2/pokemon/${id}`;
        let response = await fetch(url);
        let currentPokemon = await response.json();
        console.log('loadet Pokemon', currentPokemon);
        allPokemons.push(currentPokemon);
    }
    renderPokemons();
}

function renderPokemons() {
    let content = document.getElementById('pokedex');
    content.innerHTML = '';
    for (let i = 0; i < allPokemons.length; i++) {
        let pokemon = allPokemons[i];
        let name = pokemon['name'];
        let type1 = pokemon['types']['0']['type']['name'];
        // let type2 = pokemon['types']['1']['type']['name'];
        content.innerHTML += `
            <div class="${pokemon['types']['0']['type']['name']}" id="pokadexInfo">
                <div class="nameType" id="nameType${i}">
                    <h1>${name[0].toUpperCase() + name.substring(1)}</h1>
                    <div class="types">
                        <div class="type">${type1[0].toUpperCase() + type1.substring(1)}</div>
                        
                    </div>
                </div>
                <img id="pokemonImg${i}" class="pokemonImg">
            </div>
        `;
        document.getElementById('pokemonImg' + i).src = pokemon['sprites']['other']['dream_world']['front_default'];
        if (pokemon['types']['0']['type']['name'] == 'normal') {
            document.getElementById('nameType' + i).classList.add('changeColor');
        } else if (pokemon['types']['0']['type']['name'] == 'electric') {
            document.getElementById('nameType' + i).classList.add('changeColor');
        }
    }
}

{/* <div class="type">${type2}</div> */}