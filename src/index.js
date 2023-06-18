
import './css/styles.css';
import { fetchBreeds } from './js/ApiCatFunctions';
import { fetchCatByBreed } from './js/ApiCatFunctions';
import Notiflix from 'notiflix';

const breedSelect = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');
const loaderText = document.querySelector('.loader');


loaderText.classList.add("invisible");

function fillList() {
  loaderText.classList.remove("invisible");

  fetchBreeds()
    .then((data) => {
      const breedList = data.map((item) => ({ name: item.name, id: item.id }));
      breedSelect.insertAdjacentHTML('afterbegin', breedList.map(({ id, name }) =>
        `<option value = "${id}">${name}</option>`)
        .join(''));
    })
    .catch(() =>
      Notiflix.Notify.failure('Oops! Something went wrong! Try reloading the page!')
  );
  
  loaderText.classList.add("invisible");
};

fillList();


breedSelect.addEventListener('change', () => {
  
  loaderText.classList.remove("invisible");

  clearCatCard();
    const value = breedSelect.options[breedSelect.selectedIndex].value;
    const name = breedSelect.options[breedSelect.selectedIndex].text;
    
  fetchCatByBreed(value)
    .then(catData => {
      loaderText.classList.add("invisible");
      createCatCard(catData, name); 
  })
    .catch(() => {
      loaderText.classList.add("invisible");
      Notiflix.Notify.failure('Oops! Something went wrong! Try reloading the page!')
    })
    
});


function createCatCard(cats, title) {
  
  const cat = cats[0];

  const markup = `
    <div>
    <img src="${cat.url}" class = "cat-img" alt="cat" width="600">
    </div>
    <div>
    <h2>${title}</h2>
    <p> ${cat.breeds[0].description}</p>
    <h3>Temperamnet</h3>
    <p class ="cat-temp"> ${cat.breeds[0].temperament}</p> 
    </div> 
    `;
    catInfo.insertAdjacentHTML('afterbegin', markup);
  };

function clearCatCard() {
  catInfo.innerHTML = '';
};