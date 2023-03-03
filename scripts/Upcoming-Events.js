let upcomingEvents = data.events.filter(evento => evento.date>currentDate)

crearLista(upcomingEvents,"#eventcards")

