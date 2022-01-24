let button = document.getElementById('btn');
const url = 'http://numbersapi.com/random/trivia?json';

button.addEventListener('click', ()=> {
fetch(url)
.then(response => {
  if(!response.ok) {
    throw Error(response.statusText);
  }
  return response.json();
})
.then(data => {
  let trivia = data.text;
  displayTrivia.innerHTML = trivia;
})
.catch(error => {
  console.error('Error from network: ', error);
});
});