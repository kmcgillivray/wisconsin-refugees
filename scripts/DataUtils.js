function DataUtils() {

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

DataUtils.prototype.generateDataObject = function(dataset) {
  var dataObj = listCities(new Object(), dataset);
  dataObj = countTotals(dataObj, dataset);
  return dataObj;
}

DataUtils.prototype.convertToArray = function(dataObj) {
  var data = [];
  for (var city in dataObj) {
    var cityObj = {
      name: city,
      count: dataObj[city]
    };
    data.push(cityObj);
  }
  return data;
}
