async function getPokemons(url){
  return fetch(url).then(data=>data.json()).then(data => data.results);
}
export default getPokemons;
