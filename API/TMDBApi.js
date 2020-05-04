import { API_TOKEN } from 'react-native-dotenv';
const baseUrl = 'https://api.themoviedb.org/3';
const lang = 'fr';

export function getFilmsFromApiWithSearchedText(text, page) {
  const url = baseUrl + '/search/movie?api_key=' + API_TOKEN + `&language=${lang}&query=` + text + "&page=" + page
  return fetch(url)
    .then((response) => response.json())
    .catch((error) => console.error(error))
}

export function getImageFromApi(name) {
  return 'https://image.tmdb.org/t/p/w300' + name
}

export function getFilmDetailFromApi(id) {
  return fetch(baseUrl + '/movie/' + id + '?api_key=' + API_TOKEN + `&language=${lang}`)
    .then((response) => response.json())
    .catch((error) => console.error(error));
}