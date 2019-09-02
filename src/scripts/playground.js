const api = "http://localhost:8000";

fetch(`${api}/hurricanes`)
  .then(resp => resp.json())
  .then(data => {
    handleData(data);
  });

/**
 * Cat 1 : 75 - 95
 * Cat 2 : 96 - 110
 * Cat 3 : 111 - 129
 * Cat 4 : 130 - 156
 * Cat 5 : 157+
 */

function handleData(data) {
  // console.log(data);
  const childhood = getChildhoodData(data);
  const childhoodTotal = childhood.allStorms.length;
  const twoThousands = getTwoThouandsData(data);
  const twoThousandsTotal = twoThousands.allStorms.length;
  console.log(childhood.allStorms.length);
  console.log(twoThousands.allStorms.length);
  console.log(`There were ${twoThousandsTotal - childhoodTotal} more storms in the 2000's than in the 80's and 90's`);
}

function getChildhoodData(data) {
  const allStorms = data.filter(d => d.Season >= 1980 && d.Season <= 1999);
  // console.log(allStorms); // 7562

  return {
    allStorms,
    ...getCategories(allStorms),
  };
}

function getTwoThouandsData(data) {
  const allStorms = data.filter(d => d.Season >= 2000);
  // console.log(allStorms); // 8515
  // const allCats = getCategories(allStorms);
  // console.log(allCats);
  return {
    allStorms,
    ...getCategories(allStorms),
  };
}

function getCategories(data) {
  const cat1 = data.filter(d => d["Wind(WMO)"] > 75 && d["Wind(WMO)"] < 95);
  const cat2 = data.filter(d => d["Wind(WMO)"] > 96 && d["Wind(WMO)"] < 110);
  const cat3 = data.filter(d => d["Wind(WMO)"] > 111 && d["Wind(WMO)"] < 129);
  const cat4 = data.filter(d => d["Wind(WMO)"] > 130 && d["Wind(WMO)"] < 157);
  const cat5 = data.filter(d => d["Wind(WMO)"] > 157);

  return { cat1, cat2, cat3, cat4, cat5 };
}
