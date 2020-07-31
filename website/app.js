/* Global Variables */
const baseUrl = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = '6d535f8ac21002b728c1ab86702dacf1';

const submitBtn = document.getElementById('generate');

submitBtn.addEventListener('click', async () => {

    //Getting user responses from the website
    submitBtn.textContent = 'Generating...';

    /* Function to GET Web API Data*/
    async function getDataFromOpenWeatherAPI(apiKey) {
        let zipCode = document.getElementById("zip").value;
        fetch(baseUrl + zipCode + ",us&appid=" + apiKey).then((response) => {
            return response.json();
        }).then((result) => {
            postProjectData(result.main.temp);
        });
    }
    /* Function to GET Project Data */
    async function getProjectData() {
        fetch(baseUrl + 'projectData').then((response) => {
            return response.json();
        }).then((result) => {
            document.getElementById("date").innerHTML = result.date;
            document.getElementById("temp").innerHTML = JSON.stringify(result.temp);
            document.getElementById("content").innerHTML = result.content;
            document.getElementById("zip").value = "";
            document.getElementById("feelings").value = "";
        });
    }
})
/* Function to POST Project data */
async function postProjectData(temp) {
    // Create a new date instance dynamically with JS
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
    fetch(baseURL + 'projectData', options).then((response) => {
        return response.json();
    }).then((result) => {
        getProjectData()
    });
}