let allPokemons = [];
let searchPokemon = [];


/**
 * load api objects, 1 - 20, from server and push to the array
 * 
 */
async function loadPokemon() {
    for (let id = 1; id < 20; id++) {
        let url = `https://pokeapi.co/api/v2/pokemon/${id}`;
        let response = await fetch(url);
        let currentPokemon = await response.json();
        console.log('loadet Pokemon', currentPokemon);
        allPokemons.push(currentPokemon);
    }
    renderPokemons();
    setTimeout(loadPokemons, 1500)
}
/**
 * load api objects, 21 - 304, from server and push to the array
 * 
 */
async function loadPokemons() {
    for (let id = 21; id < 304; id++) {
        let url = `https://pokeapi.co/api/v2/pokemon/${id}`;
        let response = await fetch(url);
        let currentPokemon = await response.json();
        console.log('loadet Pokemon', currentPokemon);
        allPokemons.push(currentPokemon);
    }
    renderPokemons();
}


/**
 * render all searched pokemons from inputfield
 * 
 */
function renderSearchPokemons() {
    let content = document.getElementById('pokedex');
    content.innerHTML = '';
    for (let i = 0; i < searchPokemon[0].length; i++) {
        let pokemon = searchPokemon[0][i];
        let name = pokemon['name'];
        let type1 = pokemon['types']['0']['type']['name'];
        let order = searchPokemon[0][i]['id'];
        content.innerHTML += `
            <div class="${pokemon['types']['0']['type']['name']}" id="pokadexInfo" onclick="openTask(${i})">
                <div class="nameType" id="nameType${i}">
                    <h1 class="h1">${name[0].toUpperCase() + name.substring(1)}</h1>
                    <div class="type"><b>${type1[0].toUpperCase() + type1.substring(1)}</b></div>
                    <div class="order"># ${order}</div>
                </div>
                <img id="pokemonImg${i}" class="pokemonImg">
            </div>
        `;
        document.getElementById('pokemonImg' + i).src = pokemon['sprites']['other']['dream_world']['front_default'];
        if (pokemon['types']['0']['type']['name'] == 'normal') {
            document.getElementById('nameType' + i).classList.add('changeColor');
        } else if (pokemon['types']['0']['type']['name'] == 'electric') {
            document.getElementById('nameType' + i).classList.add('changeColor');
        } else if (pokemon['types']['0']['type']['name'] == 'ice') {
            document.getElementById('nameType' + i).classList.add('changeColor');
        }
    }
}


/**
 * render all pokemons
 * 
 */
function renderPokemons() {
    if (searchPokemon.length > 0) {
        renderSearchPokemons();
    } else {
        let content = document.getElementById('pokedex');
        content.innerHTML = '';
        for (let i = 0; i < allPokemons.length; i++) {
            let pokemon = allPokemons[i];
            let name = pokemon['name'];
            let type1 = pokemon['types']['0']['type']['name'];
            let order = allPokemons[i]['id'];
            content.innerHTML += `
            <div class="${pokemon['types']['0']['type']['name']}" id="pokadexInfo" onclick="openTask(${i})">
                <div class="nameType" id="nameType${i}">
                    <h1 class="h1">${name[0].toUpperCase() + name.substring(1)}</h1>
                    <div class="type"><b>${type1[0].toUpperCase() + type1.substring(1)}</b></div>
                    <div class="order"># ${order}</div>
                </div>
                <img id="pokemonImg${i}" class="pokemonImg">
            </div>
        `;
            document.getElementById('pokemonImg' + i).src = pokemon['sprites']['other']['dream_world']['front_default'];
            if (pokemon['types']['0']['type']['name'] == 'normal') {
                document.getElementById('nameType' + i).classList.add('changeColor');
            } else if (pokemon['types']['0']['type']['name'] == 'electric') {
                document.getElementById('nameType' + i).classList.add('changeColor');
            } else if (pokemon['types']['0']['type']['name'] == 'ice') {
                document.getElementById('nameType' + i).classList.add('changeColor');
            }
        }
    }
}


/**
 * open a pokedex
 * 
 * @param {number} i -  passes the position of the object
 */
function openTask(i) {
    document.getElementById('overlay').classList.remove('d-none');
    document.getElementById('openPokedexCont').classList.remove('d-none');
    let pokemon = allPokemons[i]['types']['0']['type']['name'];
    let name = allPokemons[i]['name'];
    name = name[0].toUpperCase() + name.substring(1);
    let type = allPokemons[i]['types']['0']['type']['name']; 
    type = type[0].toUpperCase() + type.substring(1);
    document.getElementById('openPokedexCont').innerHTML = generateHTML(name, pokemon, type);
    let order = allPokemons[i]['id'];
    document.getElementById('openPokemonImg').src = allPokemons[i]['sprites']['other']['dream_world']['front_default'];
    let height = allPokemons[i]['height'];
    let weight = document.getElementById('weight').innerHTML = allPokemons[i]['weight'];
    document.getElementById('hp').innerHTML = allPokemons[i]['stats']['0']['base_stat'];
    document.getElementById('attack').innerHTML = allPokemons[i]['stats']['1']['base_stat'];
    document.getElementById('defense').innerHTML = allPokemons[i]['stats']['2']['base_stat'];
    document.getElementById('spAtk').innerHTML = allPokemons[i]['stats']['3']['base_stat'];
    document.getElementById('spDef').innerHTML = allPokemons[i]['stats']['4']['base_stat'];
    document.getElementById('speed').innerHTML = allPokemons[i]['stats']['5']['base_stat'];
    if (pokemon == 'normal') {
        document.getElementById('openPokadex').classList.add('changeColor');
        document.getElementById('backArrow').classList.add('changeArrow');
    } else if (pokemon == 'electric') {
        document.getElementById('openPokadex').classList.add('changeColor');
        document.getElementById('backArrow').classList.add('changeArrow');
    } else if (pokemon == 'ice') {
        document.getElementById('openPokadex').classList.add('changeColor');
        document.getElementById('backArrow').classList.add('changeArrow');
    }
    calculate(order, height, weight);
    total(i);
}
/**
 * generates HTML and returns the generated to the openTask
 *
 * @param {string} name - passes the name of the pokemeon with big letter
 * @param {string} pokemon - passe the type of pokemon
 * @param {string} type - passes the name of the type with big letter
 * @returns - HTML-template
 */
function generateHTML(name, pokemon, type) {
    return `
            <div class="openPokadex ${pokemon}">
                <img id="backArrow" src="img/backArrow.ico" onclick="closeTask()">
                <div id="openPokadex">
                    <div id="openOrder"></div>
                    <h1>${name}</h1>
                    <div class="openType bold">${type}</div>
                </div>
            </div>
            <div id="openPokemonInfo">
                <img id="openPokemonImg">
                <h2>About</h2>
                <table class="width" >
                    <tr>
                        <td>Hight</td>
                        <td class="textRight" id="height"></td>
                    </tr>
                    <tr>
                        <td>Weight</td>
                        <td class="textRight" id="weight"></td>
                    </tr>
                </table>
                <h2>Base States</h2>
                <table class="width" >
                    <tr>
                        <td>HP</td>
                        <td class="bold textRight" id="hp"></td>
                    </tr>
                    <tr>
                        <td>Attack</td>
                        <td class="bold textRight" id="attack"></td>
                    </tr>
                    <tr>
                        <td>Defense</td>
                        <td class="bold textRight" id="defense"></td>
                    </tr>
                    <tr>
                        <td>Sp. Atk</td>
                        <td class="bold textRight" id="spAtk"></td>
                    </tr>
                    <tr>
                        <td>Sp. Def</td>
                        <td class="bold textRight" id="spDef"></td>
                    </tr>
                    <tr>
                        <td>Speed</td>
                        <td class="bold textRight" id="speed"></td>
                    </tr>
                    <tr>
                        <td>Total</td>
                        <td class="bold textRight" id="total"></td>
                    </tr>
                </table>
            </div>
        `;
}


/**
 * calculate the height ans add strings
 * 
 * @param {number} order - passes the number of pokemon and add a string
 * @param {number} height - passes the height of pokemon 
 * @param {number} weight - passes the weight op pokemon and add a string
 */
function calculate(order, height, weight) {
    document.getElementById('openOrder').innerHTML = `# ${order}`;
    height = height * 10;
    document.getElementById('height').innerHTML = `<b>${height}</b> cm`;
    document.getElementById('weight').innerHTML = `<b>${weight}</b> kg`;
}


/**
 * calculate the total of abouts
 * 
 * @param {number} i - passes the position of the object
 */
function total(i) {
    let hp = allPokemons[i]['stats']['0']['base_stat'];
    let attack = allPokemons[i]['stats']['1']['base_stat'];
    let defense = allPokemons[i]['stats']['2']['base_stat'];
    let spAtk = allPokemons[i]['stats']['3']['base_stat'];
    let spDef = allPokemons[i]['stats']['4']['base_stat'];
    let speed = allPokemons[i]['stats']['5']['base_stat'];
    let total = hp + attack + defense + spAtk + spDef + speed;
    document.getElementById('total').innerHTML = total;
}


/**
 * cloese the open task
 * 
 */
function closeTask() {
    document.getElementById('overlay').classList.add('d-none');
    document.getElementById('openPokedexCont').classList.add('d-none');
}

/**
 * passes the letters() from the inputfield to the function filterName()
 * 
 */
window.addEventListener('load', function () {
    const input = document.querySelector('input');
    input.addEventListener('input', filterName);
})


/**
 * filters the array by letter, and pushes the filtered objects into the searchPokemon-array and renders them
 * 
 * @param {inputEvent} e - passes the letter
 */
function filterName(e) {
    let filteredlist = allPokemons.filter(p => p.name.startsWith(e.srcElement.value));
    console.log(filteredlist);
    searchPokemon = [];
    searchPokemon.push(filteredlist)
    renderSearchPokemons();
    console.log(e.srcElement.value)
}
