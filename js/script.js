"use strict";
const main = document.querySelector("main");
const form = document.querySelector("form");
const search = document.querySelector("#buscador");
const button = document.querySelector("button");

const apiUrl = "https://pokeapi.co/api/v2/pokemon?limit=10000&offset=0";
//Creamos función para llamar a la api
async function getData(url) {
  try {
    const response = await fetch(url);
    const data = response.json();
    return data;
  } catch (error) {
    console.error("fallo al contactar con la api");
  }
}
/* creamos otra funcionar para gestionar el json y poder trabajar 
 con los datos obtenidos*/

async function createPokemon(url) {
  try {
    const allPokemons = [];
    const data = await getData(url);
    console.log(data);
    const { results } = data;

    for (const pokemons of results) {
      const { name, url: urlPokemon } = pokemons;
      const poke = await getData(urlPokemon);
      const { name: pokemon, height, weight, stats, types, sprites } = poke;
      const hp = stats[0].base_stat;
      const attack = stats[1].base_stat;
      const defense = stats[2].base_stat;
      const speed = stats[5].base_stat;
      const tipo1 = types[0].type.name;
      //Creo dos constantes con url de imagenes para extraerlas
      const image1 = sprites.front_default;
      /* console.log(poke); */
      allPokemons.push({
        pokemon,
        height,
        weight,
        hp,
        attack,
        defense,
        speed,
        tipo1,
        image1,
      });
    }
    /*  console.log(allPokemons);  */
    return allPokemons;
  } catch (error) {
    console.error("fallo al crear las fichas pokemons");
  }
}
//creamos funcion para recibir el array de allPokemons y asi
//poder introducir las cartas de los pokemosn en el html
const frag = document.createDocumentFragment();

function printPokemons(allPokemons) {
  main.innerHTML = ""; // vacia el main para no tener problemas a la hora de filtrar y con el evento de submit

  for (const poke of allPokemons) {
    // Hacemos destructuring para quedarnos con lo que nos interesa y luego introducirlo
    //en el html
    const {
      pokemon,
      height,
      weight,
      hp,
      attack,
      defense,
      speed,
      tipo1,
      image1,
    } = poke;
    const article = document.createElement("article");
    article.innerHTML = `
    <img src="${image1}" alt="imagen pokemon">
    <div>
        <h2>${pokemon}</h2>
        <p>Height: ${height}</p>
        <p>Weight: ${weight}</p>
        <p>Hp: ${hp}</p>
        <p>Attack: ${attack}</p>
        <p>Defense: ${defense}</p>
        <p>Speed: ${speed}</p>
        <p>Type1: ${tipo1}</p>
        </div>
        `;
    frag.append(article);
    switch (tipo1) {
      case "fire":
        article.style.backgroundColor = '#ec966e'
        break;
        case "grass":
          article.style.backgroundColor = '#5ccb5f'
          break;
          case "water":
            article.style.backgroundColor = '#0CB7F2'
            break;
            case "bug":
              article.style.backgroundColor = '#98ff96'
              break;
              case "poison":
                article.style.backgroundColor = '#4c007d'
                break;
                case "normal":
                  article.style.backgroundColor = '#b5bac9'
                  break;
                  case "electric":
                    article.style.backgroundColor = '#ffff00'
                    break;
                    case "ground":
                      article.style.backgroundColor = '#c57d56'
                      break;
                      case "fairy":
                        article.style.backgroundColor = '#f988ff'
                        break;
                        case "fighting":
                          article.style.backgroundColor = '#ffa372'
                          break;
                          case "psychic":
                            article.style.backgroundColor = '#1b004b'
                            break;
                            case "rock":
                              article.style.backgroundColor = '#7a7a7a'
                              break;
                              case "ghost":
                                article.style.backgroundColor = '#4b0081'
                                break;
                                case "ice":
                                  article.style.backgroundColor = '#bceeff'
                                  break;
                                  case "dragon":
                                    article.style.backgroundColor = '#f7d547'
                                    break;
                                    case "dark":
                                      article.style.backgroundColor = '#171718'
                                      case "steel":
                                        article.style.backgroundColor = '#6a6e73'
                                        
      default:
        break;
    }
  }
  main.append(frag);
}

form.addEventListener("submit", (e) => e.preventDefault());

//Creamos una funcion asincrona para poder crear las cartas de los pokemons
//Esperamos a que se cree la constante all pokemons que recibirá lo que necesitamos para
//luego pasar la variable por la función printPokemons

async function principal(apiUrl) {
  const allPokemons = await createPokemon(apiUrl);
  printPokemons(allPokemons);
}
principal(apiUrl);

//Creamos la funcion filtrar con indexOf para que solo muestre los pokemons
//que contengan aquellas palabras que se escriban en el buscador

async function filtrar() {
  const allPokemons = await createPokemon(apiUrl);
  const text = search.value;
  for (const poke of allPokemons) {
    const {
      pokemon,
      height,
      weight,
      hp,
      attack,
      defense,
      speed,
      tipo1,
      image1,
    } = poke;

    if (pokemon.indexOf(text) !== -1) {
      main.innerHTML = "";
      const article = document.createElement("article");
      article.innerHTML = `
    <img src="${image1}" alt="imagen pokemon">
    <div>
        <h2>${pokemon}</h2>
        <p>Height: ${height}</p>
        <p>Weight: ${weight}</p>
        <p>Hp: ${hp}</p>
        <p>Attack: ${attack}</p>
        <p>Defense: ${defense}</p>
        <p>Speed: ${speed}</p>
        <p>Type1: ${tipo1}</p>
        </div>
        `;
      frag.append(article);
       switch (tipo1) {
      case "fire":
        article.style.backgroundColor = '#ec966e'
        break;
        case "grass":
          article.style.backgroundColor = '#5ccb5f'
          break;
          case "water":
            article.style.backgroundColor = '#0CB7F2'
            break;
            case "bug":
              article.style.backgroundColor = '#98ff96'
              break;
              case "poison":
                article.style.backgroundColor = '#4c007d'
                break;
                case "normal":
                  article.style.backgroundColor = '#b5bac9'
                  break;
                  case "electric":
                    article.style.backgroundColor = '#ffff00'
                    break;
                    case "ground":
                      article.style.backgroundColor = '#c57d56'
                      break;
                      case "fairy":
                        article.style.backgroundColor = '#f988ff'
                        break;
                        case "fighting":
                          article.style.backgroundColor = '#ffa372'
                          break;
                          case "psychic":
                            article.style.backgroundColor = '#1b004b'
                            break;
                            case "rock":
                              article.style.backgroundColor = '#7a7a7a'
                              break;
                              case "ghost":
                                article.style.backgroundColor = '#4b0081'
                                break;
                                case "ice":
                                  article.style.backgroundColor = '#bceeff'
                                  break;
                                  case "dragon":
                                    article.style.backgroundColor = '#f7d547'
                                    break;
                                    case "dark":
                                      article.style.backgroundColor = '#171718'
                                      case "steel":
                                        article.style.backgroundColor = '#6a6e73'
                                        
      default:
        break;
    }
    }
  }
  main.append(frag);
}
button.addEventListener("click", filtrar);
