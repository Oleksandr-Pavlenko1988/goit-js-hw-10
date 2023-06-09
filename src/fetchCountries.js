export const fetchCountries = countryName => fetch(`https://restcountries.com/v3.1/name/${countryName}?fields=name,capital,population,flags,languages`).then(response => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json();
  });

export default {fetchCountries} 