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
  // console.log(data.length);
  const childhood = {
    ...getCategories(data.filter(d => d.Season >= 1980 && d.Season <= 1999)),
  };

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
  const tropical = data.filter(d => d[wind] < 75).reduce(nameStormAtStrongestPoint, {});
  const named = data.filter(d => d.Name != "UNNAMED").reduce(nameStormAtStrongestPoint, {});
  const unnamed = data.reduce(unnamedStormAtStrongestPoint, {});
  const cat1 = data.filter(d => d[wind] > 75 && d[wind] < 95).reduce(nameStormAtStrongestPoint, {});
  const cat2 = data.filter(d => d[wind] > 96 && d[wind] < 110).reduce(nameStormAtStrongestPoint, {});
  const cat3 = data.filter(d => d[wind] > 111 && d[wind] < 129).reduce(nameStormAtStrongestPoint, {});
  const cat4 = data.filter(d => d[wind] > 130 && d[wind] < 157).reduce(nameStormAtStrongestPoint, {});
  const cat5 = data.filter(d => d[wind] > 157).reduce(nameStormAtStrongestPoint, {});

  return { allStorms, total, tropical, named, unnamed, cat1, cat2, cat3, cat4, cat5 };
}

function nameStormAtStrongestPoint(acc, d) {
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
