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
            <div class="${pokemon['types']['0']['type']['name']}" id="pokadexInfo" onclick="openTask(${i})">
                <div class="nameType" id="nameType${i}">
                    <h1>${name[0].toUpperCase() + name.substring(1)}</h1>
                    <div class="openTypes">
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

function openTask(i) {
    document.getElementById('overlay').classList.remove('d-none');
    document.getElementById('openPokedexCont').classList.remove('d-none');
    document.getElementById('openPokemonName').innerHTML = allPokemons[i]['name'];
    let order = allPokemons[i]['order'];
    document.getElementById('openType1').innerHTML = allPokemons[i]['types']['0']['type']['name'];
    // document.getElementById('type2').innerHTML = allPokemons[i]['types']['1']['type']['name'];
    document.getElementById('openPokemonImg').src = allPokemons[i]['sprites']['other']['dream_world']['front_default'];
    let height = allPokemons[i]['height'];
    let weight = document.getElementById('weight').innerHTML = allPokemons[i]['weight'];
    document.getElementById('hp').innerHTML = allPokemons[i]['stats']['0']['base_stat'];
    document.getElementById('attack').innerHTML = allPokemons[i]['stats']['1']['base_stat'];
    document.getElementById('defense').innerHTML = allPokemons[i]['stats']['2']['base_stat'];
    document.getElementById('spAtk').innerHTML = allPokemons[i]['stats']['3']['base_stat'];
    document.getElementById('spDef').innerHTML = allPokemons[i]['stats']['4']['base_stat'];
    document.getElementById('speed').innerHTML = allPokemons[i]['stats']['5']['base_stat'];
    calculate(order, height, weight);
    total(i);
}

function calculate(order, height, weight) {
    document.getElementById('order').innerHTML = `# ${order}`;
    height = height * 10;
    document.getElementById('height').innerHTML = `<b>${height}</b> cm`;
    document.getElementById('weight').innerHTML = `<b>${weight}</b> kg`;
}

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

function closeTask() {
    document.getElementById('overlay').classList.add('d-none');
    document.getElementById('openPokedexCont').classList.add('d-none');
}



    

{/* <div class="type">${type2}</div> */}