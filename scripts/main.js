let currentDate = data.currentDate
let contenedorCards = document.getElementById("eventcards");

// crea boxes
let categoria=[]
let box = ""
data.events.forEach(item =>{
    if(!categoria.includes(item.category)){
    categoria.push(item.category)
    box += `<div class="form-check form-check-inline">
    <input class="form-check-input" type="checkbox" id="inlineCheckbox" value="${item.category}">
    <label class="form-check-label">${item.category}</label>
</div>`
}}) 

let item2 = document.getElementById("box")
item2.innerHTML = box;

function crearLista(arr,contenedor){
  let fragment = document.createDocumentFragment()
  let contenedorCard= document.querySelector(contenedor)
  contenedorCard.innerHTML=""
for (const datos of arr) {
    let card = document.createElement("card")
    card.innerHTML += `
  
    <div class="card text-end" style="width: 18rem;">
      <img src="${datos.image}" class="card-img-top" alt="${datos.category}" height="180">
        <div class="card-body">
          <h5 class="card-title">${datos.name}</h5>
          <p class="card-text text-start">${datos.description}</p>
          <p class="card-text text-start">${datos.price}$USD</p>
          <a href="./Detail.html?id=${datos._id}" class="btn btn-primary">See more</a>
        </div>
    </div> 
  `
    fragment.appendChild(card)
}
contenedorCard.appendChild(fragment)
}



let checkbox = document.querySelectorAll("input[type=checkbox]")

checkbox.forEach(caja => caja.addEventListener("change", verificarSeleccion))



function verificarSeleccion(){
  let seleccionado = Array.from(checkbox).filter(caja=>caja.checked)
    if(seleccionado.length !== 0){
      NuevaCategoria = filtrarContenido(data.events,seleccionado[0].value)
      crearLista(NuevaCategoria,"#eventcards")
    } else if(seleccionado.length==0){
      crearLista(data.events,"#eventcards");
    }
    
}

function filtrarContenido(arr,valor){

    let contenidofiltrado = arr.filter(contenido=> contenido.category==valor)

    return contenidofiltrado
}

// Barra de busqueda

const searchInput = document.getElementById('buscador');
const cards = document.getElementsByClassName('card');

const filterCards = () => {
  const searchValue = searchInput.value.toLowerCase();

  Array.from(cards).forEach(card => {
    const cardContent = card.textContent.toLowerCase();
    if (cardContent.includes(searchValue)) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
};

searchInput.addEventListener('input', filterCards);


