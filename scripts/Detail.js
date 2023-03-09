const queryString = location.search

const params = new URLSearchParams(queryString)

const id = params.get("id")
console.log(id);

const eventos = data.events.find(info => info._id == id)
console.log(eventos);

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
