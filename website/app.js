/* Global Variables */
const baseLink = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = 'f51b9f79275b985e491dbd6778df2515';

const button = document.getElementById('generate');
const projectData = {};

/* Function to GET Web API Data*/
async function openWeatherData(apiKey) {
    let zipCode = document.getElementById("zip").value;
    fetch(baseLink + zipCode + ",us&appid=" + apiKey).then((response) => {
        return response.json();
    }).then((result) => {
        postProjectData(result.main.temp);
    });
}

button.addEventListener('click', async () => {
    button.textContent = 'Generating...';
    // openWeatherData();
    // projectData();
});
/* Function to GET Project Data */
async function getProjectData() {
    fetch(baseLink + 'projectData').then((response) => {
        return response.json();
    }).then((result) => {
        document.getElementById("date").innerHTML = result.date;
        document.getElementById("temp").innerHTML = JSON.stringify(result.temp);
        document.getElementById("content").innerHTML = result.content;
        document.getElementById("city").innerHTML = result.city;
        document.getElementById("zip").value = "";
        document.getElementById("feelings").value = "";
    });
}


/* Function to POST Project data */
async function postProjectData(temp) {
    // Create a new date
    let d = new Date();
    let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();
    let content = document.getElementById("feelings").value;
    let data = {
        date: newDate,
        temp: temp,
        content: content,
    };
    let options = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    };
    fetch(openWeatherData + 'projectData', options).then((response) => {
        return response.json();
    }).then((result) => {
        getProjectData()
    });
}