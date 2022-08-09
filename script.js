// imports

class OpenWeatherAPI {
  constructor(api_key) {
    this.api_key = api_key;
  }

  // returns a Promise
  async makeRequest_asyncAwait(local) {
    const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${local}&appid=${this.api_key}`);
    return await response.json();
  }
}

class DOMControls {
  constructor() {
    this.img = document.querySelector('img');
    this.input = document.querySelector('input');
    this.giphy_api_key = 'lbAcyNxEzDl4zODjkfVmZQ08FLKw1DWf';
  }

  updateGif_promises(subject) {
    fetch(`https://api.giphy.com/v1/gifs/translate?api_key=${this.giphy_api_key}&s=${subject}`, {mode: 'cors'})
    .then(function(response) {
      return response.json()
    })
    .then(response => {
      this.img.src = response.data.images.original.url;
    })
    .catch(err => {console.log(err)})
  }
}

const api = new OpenWeatherAPI('a083c46c556d7aa4813227569cd85aee');
const dc = new DOMControls();

document.querySelector('button').addEventListener('click', (e) => {
  const city = e.target.previousElementSibling.value;
  api.makeRequest_asyncAwait(city)
    .then(result => {

      // Change picture
      const weather_description = result.weather[0].main;
      dc.updateGif_promises(weather_description)

      // Use weather API for updates
      const details = document.querySelector('.details');
      details.innerHTML = '';
      const main = result.main;
      console.log(main);

      for (const [key, val] of Object.entries(main)) {
        const detail = document.createElement('div');
        detail.innerHTML = `${key} : ${val}`;
        details.appendChild(detail)
      }
  });
});


api.makeRequest_asyncAwait('boston')
    .then(result => { console.log(result) });