const api = location.hostname == "localhost"? 'http://localhost:8000' : '/api';
const hurricaneDOM = document.querySelector(".hurricanes");
const startInput = document.querySelector(".start");
const endInput = document.querySelector(".end");
const searchBtn = document.querySelector(".search");
let startDate = 1980;
let endDate = 2000;

let allData = {};

fetch(`${api}/hurricanes`)
  .then(resp => resp.json())
  .then(data => {
    startInput.value = startDate;
    endInput.value = endDate;
    allData = location.hostname == "localhost" ? data : data.hurricanes;
    // handleData(data);
    addEventListeners();
    searchBtn.click();
  });

/**
 * Cat 1 : 75 - 95
 * Cat 2 : 96 - 110
 * Cat 3 : 111 - 129
 * Cat 4 : 130 - 156
 * Cat 5 : 157+
 */

function addEventListeners() {
  startInput.addEventListener("input", updateDate);
  endInput.addEventListener("input", updateDate);
  searchBtn.addEventListener("click", searchHurricanes);
}

function updateDate(e) {
  const target = e.target;
  if (target.classList.contains("start")) {
    startDate = +e.target.value;
  } else {
    endDate = +e.target.value;
  }
}

function searchHurricanes(e) {
  e.preventDefault();
  filterData();
}

function filterData() {
  const wind = "Wind(WMO)";
  const newData = {
    ...getCategories(allData.filter(d => d.Season >= startDate && d.Season <= endDate)),
  };

  const newDataKeys = Object.keys(newData.named);
  console.log(newDataKeys);

  const newOutput = newDataKeys
    .sort((a, b) => {
      return newData.named[a].Season > newData.named[b].Season ? 1 : -1;
    })
    .map(c => {
      return `<article  class="hurricane">
      <h1>${newData.named[c].Name}</h1>
      <p>Season: ${newData.named[c].Season}</p>
      <p>Max Wind Speed: ${newData.named[c][wind]}</p>
    </article>`;
    })
    .join("");

  hurricaneDOM.innerHTML = newOutput;
}

function handleData(data) {
  allData = data;
  const wind = "Wind(WMO)";
  // console.log(data.length);
  const childhood = {
    ...getCategories(data.filter(d => d.Season >= 1980 && d.Season <= 1999)),
  };

  const childhoodNamedKeys = Object.keys(childhood.named);
  console.log(childhoodNamedKeys);

  const childhoodOutput = childhoodNamedKeys
    .sort((a, b) => {
      return childhood.named[a].Season > childhood.named[b].Season ? 1 : -1;
    })
    .map(c => {
      return `<article  class="hurricane">
      <h1>${childhood.named[c].Name}</h1>
      <p>Season: ${childhood.named[c].Season}</p>
      <p>Max Wind Speed: ${childhood.named[c][wind]}</p>
    </article>`;
    })
    .join("");

  hurricaneDOM.innerHTML = childhoodOutput;

  const twoThousands = {
    ...getCategories(data.filter(d => d.Season >= 2000)),
  };

  console.log(childhood);
  console.log(twoThousands);
  console.log(`There were ${twoThousands.total - childhood.total} more storms in the 2000's than in the 80's and 90's`);
  console.log(`80's & 90's total storms ${childhood.total}`);
  console.log(`2000's & 2010's total storms ${twoThousands.total} (data complete until 2016)`);
}

function getCategories(data) {
  const wind = "Wind(WMO)";
  const allStorms = data.reduce(allStormsAtStrongestPoint, {});
  const total = Object.keys(allStorms).length;
  const tropical = data.filter(d => d[wind] < 75).reduce(namedStormAtStrongestPoint, {});
  const named = data.filter(filterNamedStorms).reduce(namedStormAtStrongestPoint, {});
  const unnamed = data.reduce(unnamedStormAtStrongestPoint, {});
  const cat1 = data.filter(d => d[wind] > 75 && d[wind] < 95).reduce(namedStormAtStrongestPoint, {});
  const cat2 = data.filter(d => d[wind] > 96 && d[wind] < 110).reduce(namedStormAtStrongestPoint, {});
  const cat3 = data.filter(d => d[wind] > 111 && d[wind] < 129).reduce(namedStormAtStrongestPoint, {});
  const cat4 = data.filter(d => d[wind] > 130 && d[wind] < 157).reduce(namedStormAtStrongestPoint, {});
  const cat5 = data.filter(d => d[wind] > 157).reduce(namedStormAtStrongestPoint, {});

  return { allStorms, total, tropical, named, unnamed, cat1, cat2, cat3, cat4, cat5 };
}

function filterNamedStorms(d) {
  const name = d.Name.split(":");
  const hasUnnamed = name.some(n => n != "UNNAMED");
  return name.length == 1 && hasUnnamed;
}

function namedStormAtStrongestPoint(acc, d) {
  const name = d.Name;
  const wind = "Wind(WMO)";
  if (!acc[name]) {
    acc[name] = d;
  }

  if (acc[name][wind] < d[wind]) {
    acc[name] = d;
  }
  return acc;
}

function allStormsAtStrongestPoint(acc, d) {
  const name = d.Name != "UNNAMED" ? d.Name : `${d.Season}-${d.Num}`;
  // const name = d.Name.includes("UNNAMED") ? `${d.Season}-${d.Num}` : d.Name;
  const wind = "Wind(WMO)";

  if (!acc[name]) {
    acc[name] = d;
  }

  if (acc[name][wind] < d[wind]) {
    acc[name] = d;
  }
  return acc;
}

function unnamedStormAtStrongestPoint(acc, d) {
  if (d.Name != "UNNAMED") {
    return acc;
  }
  const name = `${d.Season}-${d.Num}`;
  const wind = "Wind(WMO)";

  if (!acc[name]) {
    acc[name] = d;
  }

  if (acc[name][wind] < d[wind]) {
    acc[name] = d;
  }
  return acc;
}
