/* Global Variables */
const baseLink = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = 'f51b9f79275b985e491dbd6778df2515';

const button = document.getElementById('generate');
const projectData = {};

/* Function to GET Web API Data*/
async function getWeatherData() {
    let zipCode = document.getElementById("zip").value;
    fetch(baseLink + zipCode + ",us&units=imperial&appid=" + apiKey).then((response) => {
        return response.json();
    }).then((result) => {
        // Create a new date
        let d = new Date();
        let date = d.getMonth() + 1 + '/' + d.getDate() + '/' + d.getFullYear();
        let content = document.getElementById("feelings").value;

        document.getElementById("date").innerHTML = date;
        document.getElementById("temp").innerHTML = result.main.temp + ' °F';
        document.getElementById("content").innerHTML = content;
        document.getElementById("city").innerHTML = result.name;
        document.getElementById("zip").value = "";
        document.getElementById("feelings").value = "";
        button.textContent = 'Generate';
    });
}

button.addEventListener('click', async () => {
    button.textContent = 'Generating...';
    getWeatherData();
});

console.log(getWeatherData);