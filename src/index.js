import './css/styles.css';
import Notiflix from 'notiflix';
import API from './fetchCountries';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;
const refs = {
    input: document.querySelector('#search-box'),
    countryList: document.querySelector('.country-list'),
    countryInfo: document.querySelector('.country-info'),
};

refs.input.addEventListener('input', debounce(handleSearch, DEBOUNCE_DELAY));

function handleSearch(e) {
    e.preventDefault();
    let textInput = e.target.value.trim();
    resetMarkup();
    if (textInput === '') {
        return
    };
    API.fetchCountries(textInput)
        .then(renderMarkup)
        .catch(handleFetchError)
};

function renderMarkup(countries) { 

    if (countries.length > 10) {
        Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');

    } else if (countries.length <= 10 && countries.length >= 2) {

        const createdElements = countries.map(e => {
            const createdElement = `
            <li class="country-list__item">
                <div class="country-list__container">
                    <img class="country-list__img" src="${e.flags.svg}" alt="${e.flags.alt}">
                    <p class="country-list__text"><b>${e.name.official}</b></p>
                </div>
            </li>
            `;
            return createdElement;
        }).join('')
        
        refs.countryList.innerHTML = createdElements;

    } else if (countries.length === 1) {
        refs.countryInfo.innerHTML = `
                <div class="country-info__imgContainer">
                    <img class="country-info__img" src="${countries[0].flags.svg}" alt="${countries[0].flags.alt}">
                    <h1 class="country-info__name">${countries[0].name.official}</h1>
                </div>
                <div class="country-info__body">
                    <p class="country-info__title"><b>Capital:</b> ${countries[0].capital}</p>
                    <p class="country-info__text"><b>Population:</b> ${countries[0].population}</p>
                    <p class="country-info__text"><b>Languages:</b> ${Object.values(countries[0].languages)}</p>
                </div>
    `;
    }
};

function handleFetchError() { 
    Notiflix.Notify.failure('Oops, there is no country with that name');
};

function resetMarkup() {
    refs.countryInfo.innerHTML = '';
    refs.countryList.innerHTML = '';
}