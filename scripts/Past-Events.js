let pastEvents = data.events.filter(evento => evento.date<currentDate)

crearLista(pastEvents,"#eventcards")