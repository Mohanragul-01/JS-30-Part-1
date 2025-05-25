const people = [
  { name: "Wes", year: 1988 },
  { name: "Kait", year: 1986 },
  { name: "Irv", year: 1970 },
  { name: "Lux", year: 2015 },
];

let comments = [
  { text: "Love this!", id: 523423 },
  { text: "Super good", id: 823423 },
  { text: "You are the best", id: 2039842 },
  { text: "Ramen is my fav food ever", id: 123523 },
  { text: "Nice Nice Nice!", id: 542328 },
];

// Helper function to render table
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

// Helper function to render single object
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

// 1. Check if at least one person is 19 or older
const isAdult = people.some(
  (person) => new Date().getFullYear() - person.year >= 19
);
document.querySelector("#exercise1 .result").textContent = isAdult
  ? "Yes"
  : "No";
console.log({ isAdult });

// 2. Check if everyone is 19 or older
const allAdults = people.every(
  (person) => new Date().getFullYear() - person.year >= 19
);
document.querySelector("#exercise2 .result").textContent = allAdults
  ? "Yes"
  : "No";
console.log({ allAdults });

// 3. Find comment with ID 823423
const comment = comments.find((comment) => comment.id === 823423);
renderObject(comment, document.querySelector("#exercise3 .result"));
console.log(comment);

// 4. Find index of comment with ID 823423
const index = comments.findIndex((comment) => comment.id === 823423);
document.querySelector("#exercise4 .result").textContent = index;
console.log(index);

// 5. Toggle delete comment with ID 823423
let isDeleted = false;
function toggleDeleteComment() {
  if (isDeleted) {
    // Restore original comments
    comments = [
      { text: "Love this!", id: 523423 },
      { text: "Super good", id: 823423 },
      { text: "You are the best", id: 2039842 },
      { text: "Ramen is my fav food ever", id: 123523 },
      { text: "Nice Nice Nice!", id: 542328 },
    ];
    document.querySelector("#toggleDelete").textContent = "Delete Comment";
  } else {
    // Delete comment with ID 823423
    const index = comments.findIndex((comment) => comment.id === 823423);
    comments = [...comments.slice(0, index), ...comments.slice(index + 1)];
    document.querySelector("#toggleDelete").textContent = "Restore Comment";
  }
  isDeleted = !isDeleted;
  renderTable(comments, document.querySelector("#exercise5 .result"));
  console.log(comments);
}

// Initial render of comments
renderTable(comments, document.querySelector("#exercise5 .result"));
document
  .querySelector("#toggleDelete")
  .addEventListener("click", toggleDeleteComment);
