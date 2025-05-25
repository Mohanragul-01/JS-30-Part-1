const dogs = [
  { name: "Snickers", age: 2 },
  { name: "hugo", age: 8 },
];
const p = document.querySelector("#actionText");
let isGreen = false;

// Helper to render simple messages
function renderMessage(message, container) {
  container.textContent = message;
}

// Helper to render table
function renderTable(data, container) {
  const table = document.createElement("table");
  const headers = Object.keys(data[0] || {});
  const thead = document.createElement("thead");
  const headerRow = document.createElement("tr");
  headers.forEach((header) => {
    const th = document.createElement("th");
    th.textContent = header;
    headerRow.appendChild(th);
  });
  thead.appendChild(headerRow);
  table.appendChild(thead);
  const tbody = document.createElement("tbody");
  data.forEach((item) => {
    const tr = document.createElement("tr");
    headers.forEach((header) => {
      const td = document.createElement("td");
      td.textContent = item[header];
      tr.appendChild(td);
    });
    tbody.appendChild(tr);
  });
  table.appendChild(tbody);
  container.innerHTML = "";
  container.appendChild(table);
}

// Helper to render object as table
function renderObject(obj, container) {
  const table = document.createElement("table");
  const tbody = document.createElement("tbody");
  for (const [key, value] of Object.entries(obj)) {
    const tr = document.createElement("tr");
    const th = document.createElement("th");
    th.textContent = key;
    const td = document.createElement("td");
    td.textContent = value;
    tr.appendChild(th);
    tr.appendChild(td);
    tbody.appendChild(tr);
  }
  table.appendChild(tbody);
  container.innerHTML = "";
  container.appendChild(table);
}

// Toggle green style
function toggleGreen() {
  isGreen = !isGreen;
  p.classList.toggle("green", isGreen);
  p.textContent = isGreen ? "×STYLED×" : "×BREAK×DOWN×";
}

// Console methods
function logRegular() {
  console.log("hello");
  renderMessage("hello", document.querySelector("#logResult"));
}

function logInterpolated() {
  console.log("Hello I am a %s string!", "💩");
  renderMessage(
    "Hello I am a 💩 string!",
    document.querySelector("#interpolatedResult")
  );
}

function logWarning() {
  console.warn("OH NOOO");
  renderMessage("OH NOOO", document.querySelector("#warningResult"));
}

function logError() {
  console.error("Shit!");
  renderMessage("Shit!", document.querySelector("#errorResult"));
}

function logInfo() {
  console.info("Crocodiles eat 3-4 people per year");
  renderMessage(
    "Crocodiles eat 3-4 people per year",
    document.querySelector("#infoResult")
  );
}

function logAssert() {
  console.assert(p.classList.contains("ouch"), "That is wrong!");
  renderMessage(
    p.classList.contains("ouch") ? "Assertion passed" : "That is wrong!",
    document.querySelector("#assertResult")
  );
}

function viewDOM() {
  console.log(p);
  console.dir(p);
  renderObject(
    { tagName: p.tagName, id: p.id, className: p.className },
    document.querySelector("#domResult")
  );
}

function logGroups() {
  let output = "";
  dogs.forEach((dog) => {
    console.groupCollapsed(`${dog.name}`);
    console.log(`This is ${dog.name}`);
    console.log(`${dog.name} is ${dog.age} years old`);
    console.log(`${dog.name} is ${dog.age * 7} dog years old`);
    output += `This is ${dog.name}\n${dog.name} is ${dog.age} years old\n${
      dog.name
    } is ${dog.age * 7} dog years old\n`;
    console.groupEnd(`${dog.name}`);
  });
  renderMessage(output, document.querySelector("#groupResult"));
}

function logCounts() {
  const counts = { Wes: 0, Steve: 0 };
  [
    "Wes",
    "Wes",
    "Steve",
    "Steve",
    "Wes",
    "Steve",
    "Wes",
    "Steve",
    "Steve",
    "Steve",
    "Steve",
    "Steve",
  ].forEach((name) => {
    console.count(name);
    counts[name]++;
  });
  renderMessage(
    `Wes: ${counts.Wes}, Steve: ${counts.Steve}`,
    document.querySelector("#countResult")
  );
}

function logTiming() {
  console.time("fetching data");
  fetch("https://api.github.com/users/wesbos")
    .then((data) => data.json())
    .then((data) => {
      console.timeEnd("fetching data");
      renderObject(
        { name: data.name, login: data.login, bio: data.bio },
        document.querySelector("#timingResult")
      );
      console.log(data);
    });
}

function logTable() {
  console.table(dogs);
  renderTable(dogs, document.querySelector("#tableResult"));
}

function clearConsole() {
  console.clear();
  document
    .querySelectorAll(".result")
    .forEach((result) => (result.innerHTML = ""));
}

// Event listeners
p.addEventListener("click", toggleGreen);
