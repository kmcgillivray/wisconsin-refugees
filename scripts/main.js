var cities = [];
var data = null;

d3.csv('/data/2002-2017-wisconsin-refugees-arrivals-by-destination-and-nationality.csv', function(d) {
  data = d;
  console.log(data);
});

function getNationalityData(nationalities, dataset) {
  var dataset = dataset || data;
  var nationalityData = [];
  for (var i = 0; i < dataset.length; i++) {
    if (nationalities.includes(dataset[i].nationality)) {
      nationalityData.push(dataset[i]);
    }
  }
  return nationalityData;
}

function getYearData(years, dataset) {
  var dataset = dataset || data;
  var yearData = [];
  for (var i = 0; i < dataset.length; i++) {
    if (years.includes(dataset[i].calendarYear)) {
      yearData.push(dataset[i]);
    }
  }
  return yearData;
}

// function getCityData(cities, dataset) {
//   var dataset = dataset || data;
//   var cityData = [];
//   for (var i = 0; i < dataset.length; i++) {
//     if (cities.includes(dataset[i].destinationCity)) {
//       cityData.push(dataset[i]);
//     }
//   }
//   return cityData;
// }

function query(years, nationalities) {
  var dataset = data;
  // if (cities) {
  //   dataset = getCityData(cities, dataset);
  // }
  if (nationalities) {
    dataset = getNationalityData(nationalities, dataset);
  }
  if (years) {
    dataset = getYearData(years, dataset);
  }
  writeData(dataset);
}

function listCities(dataObj, dataset) {
  for (var i = 0; i < dataset.length; i++) {
    var city = dataset[i].destinationCity;
    if (!dataObj[city]) {
      dataObj[city] = 0;
    }
  }
  return dataObj;
}

function countTotals(dataObj, dataset) {
  for (var i = 0; i < dataset.length; i++) {
    var datapoint = dataset[i];
    var city = datapoint.destinationCity;
    dataObj[city] += parseInt(datapoint.yearlyNumberByCity);
  }
  return dataObj;
}

function generateDataObject(dataset) {
  var dataObj = listCities(new Object(), dataset);
  dataObj = countTotals(dataObj, dataset);
  return dataObj;
}

function writeData(dataset) {
  var dataObj = generateDataObject(dataset);
  for (var city in dataObj) {
    var numberOfRefugees = dataObj[city];
    document.write(city + ": " + numberOfRefugees + "<br>");
  }
  console.log(dataObj);
}

// Pick a year, pick a nationality, or all years, all nationalities, or set of years and nationalities
