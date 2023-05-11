/*
  *JS PokeAPI
*/

const listaPokemon = document.querySelector("#listaPokemon");
const botonesHeader = document.querySelectorAll(".btn-header");

let URL = "https://pokeapi.co/api/v2/pokemon/";

for(let i = 1; i <= 386; i++){
  fetch(URL + i)
  .then((response) => response.json())
  .then(data => mostrarPokemon(data))
}

function mostrarPokemon(data){
  let tipos = data.types.map((type) => `<p class="${type.type.name} tipo">${type.type.name}</p>`);
  tipos = tipos.join('');

  const div = document.createElement("div");
  div.classList.add("pokemon");
  div.innerHTML = `
  <div class="pokemon-imagen">
    <img src="${data.sprites.other["home"].front_default}" alt="${data.name}">
  </div>
  <div class="pokemon-info">
    <div class="nombre-contenedor">
      <p class="pokemon-id">#${data.id}</p>
      <h1 class="pokemon-nombre">${data.name}</h1>
    </div>
    <div class="pokemon-tipos">
      ${tipos}
    </div>
    <div class="pokemon-stats">
      <p class="stat">${data.height}m</p>
      <p class="stat">${data.weight}kg</p>
    </div>
  </div>
`;
listaPokemon.append(div);
}

function returnPokemons() {
  const requests = [];

  for (let i = 1; i <= 9; i++) {
      requests.push(fetch(URL + i)
          .then((response) => response.json()));
  }

  Promise.all(requests).then((data) => {
      data.forEach(pokemon => mostrarPokemon(pokemon));
  });
}

botonesHeader.forEach(boton => boton.addEventListener("click", (event)=>{
  const botonId = event.currentTarget.id;

  listaPokemon.innerHTML = "";

  for(let i = 1; i <= 386; i++){
    fetch(URL + i)
    .then((response) => response.json())
    .then(data => {
      if(botonId === "ver-todos"){
        mostrarPokemon(data);
      }else{
        const tipos = data.types.map(type => type.type.name);
        if (tipos.some(tipo => tipo.includes(botonId))){
        mostrarPokemon(data);
        }
      }
      
    })
  }
}))
/*
    *JS para la comprobacion de Email
*/ 
const emailInput = document.getElementById('email-input');
const submitButton = document.getElementById('submit-button');

emailInput.addEventListener('input', function() {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Expresión regular para validar el formato del correo electrónico
  if (regex.test(emailInput.value)) {
    submitButton.disabled = false; // Si el correo es válido, habilita el botón enviar
  } else {
    submitButton.disabled = true; // Si el correo no es válido, deshabilita el botón enviar
  }
});