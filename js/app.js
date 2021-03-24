const formValue = document.querySelector(".form");
const card = document.querySelector(".card");
const cardDetails = document.querySelector(".details");
const time = document.querySelector("img.time")
const icon = document.querySelector(".icon img");

const updateUI = (data) =>{
    
    console.log(data);
    const city = data.cityDetails;
    const weather = data.weather;

    const html = `
    <h3 class="my-4">${city.EnglishName}</h3>
    <div class="my-2">${weather.WeatherText}</div>
    <h1>${weather.Temperature.Metric.Value} &#8451;</h1>
    `;

    cardDetails.innerHTML = html;

    imgSrc = null;

    if(weather.IsDayTime){
        imgSrc = "./images/day.jpg";
    }
    else{
        imgSrc = "./images/night.jpg";
    }

    time.setAttribute('src',imgSrc);

    let iconSrc = `./icons/${weather.WeatherIcon}.svg`;
    icon.setAttribute('src', iconSrc);
}

const updateCity = async(city) =>{

    const cityDetails = await getCity(city);
    const weather = await getWeather(cityDetails.Key);

    return{
        cityDetails: cityDetails,
        weather: weather,
    }

}



formValue.addEventListener("submit", (e) =>{

    e.preventDefault();

    const city = formValue.city.value.trim();
    formValue.reset();

    //console.log(city);

    updateCity(city)
    .then((data) => {
        updateUI(data);
    })
    .catch((err) => console.log(err));

});