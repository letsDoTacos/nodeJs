// NASA ISS Location frontend api

let button = document.getElementById('btn');
const url = 'http://api.open-notify.org/iss-now.json';

button.addEventListener('click', () => {
  fetch(url)
  .then(responce => {
    if(!responce.ok) {
      throw Error(responce.statusText);
    }
    return responce.json();
  })
  .then(data => {
    let latitude = data.iss_position.latitude;
    let longitude = data.iss_position.longitude;
    latLong.innerHTML = latitude + ' ,' + longitude;
  })
  .catch(error => {
    console.log('Error from the network', error);
  });
});