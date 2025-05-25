const endpoint =
  "https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json";

const cities = [];
const searchInput = document.querySelector(".search");
const suggestions = document.querySelector(".suggestions");
const clearBtn = document.querySelector(".clear-btn");
const loading = document.querySelector(".loading");

// Show loading indicator
loading.style.display = "block";
fetch(endpoint)
  .then((blob) => blob.json())
  .then((data) => {
    cities.push(...data);
    loading.style.display = "none";
  })
  .catch(() => {
    loading.textContent = "Error loading data";
  });

function findMatches(wordToMatch, cities) {
  if (!wordToMatch) return [];
  return cities.filter((place) => {
    const regex = new RegExp(wordToMatch, "gi");
    return place.city.match(regex) || place.state.match(regex);
  });
}

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Debounce function to limit frequent calls
function debounce(func, wait) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

function displayMatches() {
  const matchArray = findMatches(this.value, cities);
  const html =
    matchArray.length > 0
      ? matchArray
          .map((place) => {
            const regex = new RegExp(this.value, "gi");
            const cityName = place.city.replace(
              regex,
              `<span class="hl">${this.value}</span>`
            );
            const stateName = place.state.replace(
              regex,
              `<span class="hl">${this.value}</span>`
            );
            return `
          <li>
            <span class="name">${cityName}, ${stateName}</span>
            <span class="population">${numberWithCommas(
              place.population
            )}</span>
          </li>
        `;
          })
          .join("")
      : "<li>No results found</li>";
  suggestions.innerHTML = html;
  clearBtn.style.display = this.value ? "block" : "none";
}

// Clear input and suggestions
function clearSearch() {
  searchInput.value = "";
  suggestions.innerHTML = "<li>Filter for a city</li><li>or a state</li>";
  clearBtn.style.display = "none";
}

const debouncedDisplayMatches = debounce(displayMatches, 300);
searchInput.addEventListener("input", debouncedDisplayMatches);
clearBtn.addEventListener("click", clearSearch);
