let Urldata = "https://mindhub-xj03.onrender.com/api/amazing";
let data = {};
let types = [];
let inputBusqueda = document.querySelector("input[name=search]");
let checkboxes;

async function getData() {
  try {
    let response = await fetch(Urldata);
    let responseData = await response.json();
    
    if (Array.isArray(responseData)) {
      data.events = responseData;
    } else {
      data = responseData;
    }
    renderCards(data.events);
    let now = new Date();

    data.upcomingEvents = data.events.filter((evento) => {
      return new Date(evento.date) > now;
    });

    data.pastEvents = data.events.filter((evento) => {
      return new Date(evento.date) < now;
    });

   


    types = extractCategories(data.events);

    renderCheckboxes(types);

    checkboxes = document.querySelectorAll("input[type=checkbox]");

    checkboxes.forEach((checkbox) => {
      checkbox.addEventListener("change", () => {
        renderSearch();
      });
    });
  } catch (error) {
    console.log(error.message);
  }
}

getData();

function renderCards(eventos) {
    let container = document.querySelector("#eventcards");
    let htmlCards = "";
    eventos.forEach((evento) => {
      htmlCards += createCard(evento);
    });
    container.innerHTML = htmlCards;
  }
  

function createCard(evento) {
  return ` <div class="card text-end" style="width: 18rem;">
    <img src="${evento.image}" class="card-img-top" alt="${
    evento.category
  }" height="180">
      <div class="card-body">
        <h5 class="card-title">${evento.name}</h5>
        <p class="card-text text-start">${evento.description}</p>
        <p class="card-text text-start">${evento.price}$USD</p>
        <a href="./Detail.html?id=${evento._id}" class="btn btn-primary">See more</a>
      </div>
  </div>`;
}

function extractCategories(eventos) {
  let categorias = [];
  eventos.forEach((evento) => {
    if (!categorias.includes(evento.category)) {
      categorias.push(evento.category);
    }
  });

  return categorias;
}

function renderCheckboxes(categorias) {
  let container = document.querySelector("#box");
  container.innerHTML = categorias
    .map(
      (categoria) =>
        `<div class="form-check form-check-inline">
        <input class="form-check-input" type="checkbox" id="inlineCheckbox" value="${categoria}">
        <label class="form-check-label">${categoria}</label>
    </div>`
    )
    .join("");
}

inputBusqueda.addEventListener("input", () => {
  renderSearch();
});

function getChequeados() {
  let chequeados = [];
  checkboxes.forEach((checkbox) => {
    if (checkbox.checked) {
      chequeados.push(checkbox.value);
    }
  });
  return chequeados;
}

function renderSearch() {
  let textoBusqueda = inputBusqueda.value;
  let tiposChequeados = getChequeados();
  let resultados = data.events.filter((evento) => {
    let includesTextoBusqueda = evento.name.toLowerCase().includes(textoBusqueda.toLowerCase());
    let includesTiposChequeados = tiposChequeados.includes(evento.category);
    return includesTextoBusqueda && (tiposChequeados.length === 0 || includesTiposChequeados);
  });
  renderCards(resultados);
}

function detail() {
  const queryString = location.search
  const params = new URLSearchParams(queryString)
  const id = params.get("id")
  const eventos = data.events.find(info => info._id == id)
  const div = document.querySelector("#eventcards")
  div.innerHTML = `
    
  <div class="card mb-3" style="max-width: 740px; height: 460px;">
              <div class="row g-0">
                <div class="col-md-4">
                  <img src="${eventos.image}" class="img-fluid rounded-start" alt="${eventos.category}">
                </div>
                <div class="col-md-8">
                  <div class="card-body">
                    <h5 class="card-title">${eventos.name}</h5>
                    <p class="card-text">${eventos.description}</p>
                    <p class="card-text text-start">${eventos.price}$USD</p>
                    <a href="./index.html" class="btn btn-primary">Back</a>
                  </div>
                </div>
              </div>
            </div>
  `

}