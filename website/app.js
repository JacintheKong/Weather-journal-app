const baseURL = 'https://api.openweathermap.org/data/2.5/weather?units=imperial&';
const apiKey = '93c4067c6d3bc9987d7423090701104b';
const keyParam = `&key=&APPID=${apiKey}`;

const getWeatherData = async function(zipcode) {
    try {
        // construct URL
        const url = `${baseURL}zip=${zipcode},us${keyParam}`;

        // call weather API
        const res = await fetch(url);
        const json = await res.json();
        return json;
    } catch (error) {
        console.log("error", error);
    }
};

// Posts and entry of data to server.
const postData = async function(url = '/add', data = {}) {
    console.log(data);
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    try {
        const newData = await response.json();
        console.log(newData);
        return newData;
    } catch (error) {
        console.log("error", error);
    }
};

// Gets the most recent entry from the server from given id.
const getEntry = async function(id) {
    try {
        // call weather API
        const res = await fetch(`/entry/${id}`);
        const json = await res.json();
        return json;
    } catch (error) {
        console.log("error", error);
    }
};

/**
 * Creates and returns a new date instance in the form of a string
 * dynamically with JS.
 */
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + '.' + d.getDate() + '.' + d.getFullYear();

/**
 * Event listener handler for the "generate" button which generates a new
 * entry.
 */

document.getElementById('generate').addEventListener('click', () => {
    const zipcode = document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;
    if (zipcode) {
        // call weather API and chain events
        getWeatherData(zipcode)
            .then((value) => {
                const req = {
                    date: newDate,
                    temp: value.main.temp,
                    content: feelings,
                };
                return postData('/add', req);
            })
            .then((json) => getEntry(json.id))
            .then((json) => {
                document.getElementById('date').innerHTML = json.date;
                document.getElementById('temp').innerHTML = `${json.temp} &#8457;`;
                document.getElementById('content').innerHTML = json.content;
            });
    };
})