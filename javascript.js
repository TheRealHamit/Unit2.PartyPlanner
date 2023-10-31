const API_URL = `https://fsa-crud-2aa9294fe819.herokuapp.com/api/2308-ACC-PT-WEB-PT-B/events`;

const state = {
    events: [],
};

const eventList = document.querySelector("#events");

const deleteButtons = [];

const addEventForm = document.querySelector("#addEvent");

const addEventButton = document.querySelector("#addEvent > button")



addEventForm.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log(e.target.name.value);
    const name = e.target.name.value;
    const date = e.target.date.value + ":00.000Z";
    const location = e.target.location.value;
    const description = e.target.description.value;
    const obj = {name: name, description: description, date: date, location: location};
    addEvent(obj);
    console.log(JSON.stringify(obj));
});

async function render() {
    await getEvents();
    console.log(JSON.stringify(state.events));
    renderEvents();
    deleteButtons.forEach((button) => {
        button.addEventListener("click", (e) => {
            e.preventDefault();
            deleteEvent(e.target.id.slice(1));
        })
    });
}
render();

async function addEvent(obj) {
    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers:{"Content-Type": "application/json"},
            body: JSON.stringify(obj),
        });
        if (json.error) {
            throw new Error(json.message);
        }
        const result = await response.json();
        console.log(result);
    } catch {

    } finally {
    render();
    }
}

async function getEvents() {
    const response = await fetch(API_URL);
    const data = await response.json();
    state.events = data.data;
}

function renderEvents() {
    const currentEvents = state.events.map((event) => {
        const row = document.createElement("tr");

        const id = event.id;

        const name = document.createElement("td");
        name.textContent = event.name;
        row.append(name);

        const dt = event.date.split("T")
        const date = document.createElement("td");
        date.textContent = dt[0];
        row.append(date);

        const time = document.createElement("td");
        time.textContent = dt[1].slice(0,5);
        row.append(time);

        const location = document.createElement("td");
        location.textContent = event.location;
        row.append(location);

        const description = document.createElement("td");
        description.textContent = event.description;
        row.append(description);

        const del = document.createElement("td");
        del.className = "delete"
        const delButton = document.createElement("button");
        del.append(delButton);
        delButton.textContent = "X";
        delButton.id = `d${id}`;
        row.append(del);
        deleteButtons.push(delButton);

        return row;
    })
    eventList.replaceChildren(...currentEvents);
}

async function deleteEvent(id) {
    try {
        await fetch (`${API_URL}/${id}`, {method:"DELETE"});

    } catch {

    } finally {
        render();
    }
}