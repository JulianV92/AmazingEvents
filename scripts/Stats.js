let Urldata = "https://mindhub-xj03.onrender.com/api/amazing";
let data = {};
let types = [];

async function getData() {
  try {
    let response = await fetch(Urldata);
    let responseData = await response.json();
    
    if (Array.isArray(responseData)) {
      data.events = responseData;
    } else {
      data = responseData;
    }

    types = extractCategories(data.events);

    loadStats(types, data);

  } catch (error) {
    console.log(error.message);
  }
}
getData();

function extractCategories(eventos) {
  let categorias = [];
  eventos.forEach((evento) => {
    if (!categorias.includes(evento.category)) {
      categorias.push(evento.category);
    }
  });

  return categorias;
}

function loadStats(types) {
    let container = document.querySelector(".tabla1");
    let tableBodyHtml = "";
    types.forEach((type) => {
      let filteredData = getCategory(type, data);
      let highPercent = getHighPercent(filteredData);
      let lowPercent = getLowPercent(filteredData);
      let capacity = getCapacity(filteredData);
  
      tableBodyHtml += `
        <tr>
          <td>${type}</td>
          <td>${highPercent.eventName}</td>
          <td>${highPercent.percent}%</td>
          <td>${lowPercent.eventName}</td>
          <td>${lowPercent.percent}%</td>
          <td>${capacity.eventName}</td>
          <td>${capacity.capacity}</td>
        </tr>
      `;
    });
    container.innerHTML = tableBodyHtml;
  }
  

function getCategory(type, data) {
    return data.events.filter(dato => dato.category === type);  
}

function getHighPercent(data){
    let max = 0;
    let maxEvent = null;
    data.forEach(evento => {
        let percent = evento.current / evento.capacity;
        if (percent > max) {
            max = percent;
            maxEvent = evento;
        }
    });
    return `${maxEvent.name} - ${Math.round(max * 100)}%`;
}

function getLowPercent(data){
    let min = Infinity;
    let minEvent = null;
    data.forEach(evento => {
        let percent = evento.current / evento.capacity;
        if (percent < min) {
            min = percent;
            minEvent = evento;
        }
    });
    return `${minEvent.name} - ${Math.round(min * 100)}%`;
}

function getCapacity(data){
    let total = 0;
    data.forEach(evento => {
        total += evento.capacity;
    });
    return total;
}


