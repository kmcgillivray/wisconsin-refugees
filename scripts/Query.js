function Query() {

}

Query.prototype.getNationalityData = function(nationalities, dataset) {
  var nationalityData = [];
  for (var i = 0; i < dataset.length; i++) {
    if (nationalities.includes(dataset[i].nationality)) {
      nationalityData.push(dataset[i]);
    }
  }
  return nationalityData;
}

Query.prototype.getYearData = function(years, dataset) {
  var yearData = [];
  for (var i = 0; i < dataset.length; i++) {
    if (years.includes(dataset[i].calendarYear)) {
      yearData.push(dataset[i]);
    }
  }
  return yearData;
}

Query.prototype.query = function(dataset, years, nationalities, callback) {
  callback = callback || view.drawResults;
  dataset = dataset || data;
  if (nationalities) {
    dataset = this.getNationalityData(nationalities, dataset);
  }
  if (years) {
    dataset = this.getYearData(years, dataset);
  }
  console.log(dataset);
  callback(dataset);
  // writeData(dataset);
}
