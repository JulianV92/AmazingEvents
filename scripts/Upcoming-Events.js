async function getData() {
  try {
    let response = await fetch(Urldata);
    let responseData = await response.json();

    if (Array.isArray(responseData)) {
      data.events = responseData;
    } else {
      data = responseData;
    }
    
    let now = new Date();

    data.upcomingEvents = data.events.filter((evento) => {
      return new Date(evento.date) > now;
    });

    renderCards(data.upcomingEvents);
    renderCheckboxes(types);


    types = extractCategories(data.events);
    checkboxes = document.querySelectorAll("input[type=checkbox]");

    checkboxes.forEach((checkbox) => {
      checkbox.addEventListener("change", () => {
        renderSearch();
      });
    });

    // ...
  } catch (error) {
    console.log(error.message);
  }
}

getData();
