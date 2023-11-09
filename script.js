baseURL = 'https://rickandmortyapi.com/api/character/'

const searchTerm = document.querySelector('.search');
const searchForm = document.querySelector('form');
const card = document.querySelector('.card');
const main = document.querySelector('.main');
const pageInfo = document.querySelector('.page-info');


searchForm.addEventListener("submit", submitSearch);

function submitSearch(e){
  fetchResults(e);
}

function fetchResults(e) {
  e.preventDefault();


  let url = `${baseURL}?name=${searchTerm.value}`;

  fetch(url)
    .then((res) => res.json())
    .then((json) => displayData(json))
    .catch((err) => console.error(`Error fetching data: ${error}`))

}

function displayData(json) {
  
  while (card.firstChild) {
    card.removeChild(card.firstChild)
  }

  const characters = json.results;

  

  if (characters.length === 0) {
    const para = document.createElement("p");
    para.textContent = "No results returned.";
    card.appendChild(para);
  } else {
    for (const character of characters) {


      const characterDiv = document.createElement("div");
      characterDiv.setAttribute('class', 'characterDiv')

      const characterList = document.createElement('ul');


      const heading = document.createElement("h2");
      const img = document.createElement("img");
      const name = document.createElement('li');
      const gender = document.createElement('li');
      const species = document.createElement("li");
      const status = document.createElement("li");
      const location = document.createElement('li');
      const origin = document.createElement('li');

      heading.textContent = character.name;
      name.textContent = `Name:    ${character.name}`;
      gender.textContent = `Gender:    ${character.gender}`;
      species.textContent = `Species:    ${character.species}`
      status.textContent = `Status:    ${character.status}`
      location.textContent = `Location:    ${character.location.name}`
      origin.textContent = `Origin:    ${character.origin.name}`


      img.src = character.image;
      img.alt = character.name;



      characterDiv.appendChild(heading);
      characterDiv.appendChild(img)


      characterList.appendChild(name);
      characterList.appendChild(status)
      characterList.appendChild(gender);
      characterList.appendChild(species)
      characterList.appendChild(location);
      characterList.appendChild(origin);


      characterDiv.appendChild(characterList);

      card.appendChild(characterDiv)

    }
  }

};

