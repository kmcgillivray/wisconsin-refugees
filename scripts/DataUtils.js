function DataUtils() {

}

function listCities(dataset) {
  var dataObj = {};
  for (var i = 0; i < dataset.length; i++) {
    var city = dataset[i].destinationCity;
    if (!dataObj[city]) {
      dataObj[city] = 0;
    }
  }
  return dataObj;
}

function listNationalities(dataset) {
  var dataObj = {};
  for (var i = 0; i < dataset.length; i++) {
    var nationality = dataset[i].nationality;
    if (!dataObj[nationality]) {
      dataObj[nationality] = 0;
    }
  }
  return dataObj;
}

function countTotalsByCity(dataObj, dataset) {
  for (var i = 0; i < dataset.length; i++) {
    var datapoint = dataset[i];
    var city = datapoint.destinationCity;
    dataObj[city] += parseInt(datapoint.yearlyNumberByCity);
  }
  return dataObj;
}

function countTotalsByNationality(dataObj, dataset) {
  for (var i = 0; i < dataset.length; i++) {
    var datapoint = dataset[i];
    var nationality = datapoint.nationality;
    dataObj[nationality] += parseInt(datapoint.yearlyNumberByCity);
  }
  return dataObj;
}

DataUtils.prototype.generateCityObject = function(dataset) {
  var dataObj = listCities(dataset);
  dataObj = countTotalsByCity(dataObj, dataset);
  return dataObj;
}

DataUtils.prototype.generateNationalityObject = function(dataset) {
  var dataObj = listNationalities(dataset);
  dataObj = countTotalsByNationality(dataObj, dataset);
  return dataObj;
}

DataUtils.prototype.convertToCityArray = function(dataObj) {
  var data = [];
  for (var city in dataObj) {
    var cityObj = {
      name: city,
      count: dataObj[city]
    };
    if (cityObj.count > 0) {
      data.push(cityObj);
    }
  }
  return data;
}

DataUtils.prototype.convertToNationalityArray = function(dataObj) {
  var data = [];
  for (var nationality in dataObj) {
    var nationalityObj = {
      name: nationality,
      count: dataObj[nationality]
    };
    if (nationalityObj.count > 0) {
      data.push(nationalityObj);
    }
  }
  console.log(data);
  return data;
}

DataUtils.prototype.findHighestValue = function(dataArr) {
  var highestValue = { count: 0 };

  for (var i = 0; i < dataArr.length; i++) {
    if (dataArr[i].count > highestValue.count) {
      highestValue = dataArr[i];
    }
  }
  console.log(highestValue);
  return highestValue;
}

// This is getting confusing with countTotals – refactor
DataUtils.prototype.countAll = function(dataArr) {
    var total = 0;
    for (var i = 0; i < dataArr.length; i++) {
      total += dataArr[i].count;
    }
    return total;
  }
