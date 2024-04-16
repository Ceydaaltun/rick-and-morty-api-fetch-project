const searchTerm = document.querySelector(".search");
const searchForm = document.querySelector("form");
const cards = document.querySelector(".cards-container");
const filterDisplay = document.querySelector(".filter-display");
const pageInfo = document.querySelector(".page-info");
const options = document.querySelectorAll(".option");


const baseURL = "https://rickandmortyapi.com/api/character/";

searchForm.addEventListener("submit", submitSearch);

function submitSearch(e) {
  fetchResults(e);
}


const fetchResults = (e) => {

  e.preventDefault();

  let url = `${baseURL}?name=${searchTerm.value}`;

  fetch(url)
    .then((res) => res.json())
    .then((data) => displayResults(data))
    .catch((err) => console.log(`Error fetching data: ${err}`))
};


const displayResults = (data) => {

  cards.style.display = "grid";
  filterDisplay.style.display = "flex"


  while (pageInfo.firstChild) {
    pageInfo.removeChild(pageInfo.firstChild);
    pageInfo.style.display = "none";
  }

  while (cards.firstChild) {
    cards.removeChild(cards.firstChild);

  }

  const { results } = data;

  results.map((obj) => {

    const { gender, name, species, image, status } = obj;

    const { location: { name: locationName } } = obj

    const { origin: { name: originName } } = obj

    cards.innerHTML += `
      <div class="character-div">
      <h2>${name}</h2>
      <img src="${image}" alt="${name}" class="char-img">
      <ul>
        <li>Location: ${locationName}</li>
        <li>Origin: ${originName}</li>
        <li>Gender: ${gender}</li>
        <li>Species: ${species} </li>
        <li>Status: ${status}</li>
      </ul>
    </div>
`;
  })
};


options.forEach(option => {
  option.addEventListener("click", () => {
    console.log(option, "option")
    const cols = option.dataset.cols;
    console.log(cols, "cols");

    cards.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
  })
});


const header = document.querySelector("header");
const supportPageOffset = window.pageXOffset !== undefined;
const isCSS1Compat = (document.compatMode || "") === "CSS1Compat"

let prevScrollPos = 0;

const isScrollingDown = () => {

  //Calculate current scroll position on different browsers
  let currentScrollPos =
    supportPageOffset
      ? window.pageYOffset
      : isCSS1Compat
        ?
        document.documentElement.scrollTop //gives the y scroll position in standards mode
        : document.body.scrollTop; //gives the y scroll position in quirks mode.

  let isScrollDown;

  if (currentScrollPos > prevScrollPos) {
    isScrollDown = true;
  } else {
    isScrollDown = false;
  }

  //track scrolling direction during the next scroll event
  prevScrollPos = currentScrollPos;
  return isScrollDown;
};

const handleHeaderScroll = () => {
  if (isScrollingDown() && !header.contains(document.activeElement)) {
    header.classList.add("scroll-down");
    header.classList.remove("scroll-up");

  }
  else {
    header.classList.add("scroll-up");
    header.classList.remove("scroll-down");
  }
}

window.addEventListener("scroll", handleHeaderScroll);

