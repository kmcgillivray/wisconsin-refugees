function Query(data, years, nationalities) {
  this.dataset = data;
  this.years = years || {
    startYear: 2002,
    endYear: 2016
  };
  this.nationalities = nationalities;
  this.cityArr = null;
  this.highestCity = null;
  this.totalRefugees = 0;
  this.nationalityArr = null;
  this.highestNationality = null;
}

Query.prototype.getNationalityData = function(dataset) {
  var nationalityData = [];
  for (var i = 0; i < dataset.length; i++) {
    if (this.nationalities.includes(dataset[i].nationality)) {
      nationalityData.push(dataset[i]);
    }
  }
  return nationalityData;
}

Query.prototype.getYearData = function(dataset) {
  var yearData = [];
  for (var i = 0; i < dataset.length; i++) {
    var dataPoint = dataset[i];
    var dataPointYear = parseInt(dataPoint.calendarYear);
    var isInRange = dataPointYear >= this.years.startYear && dataPointYear <= this.years.endYear;
    if (isInRange) {
      yearData.push(dataset[i]);
    }
  }
  return yearData;
}

Query.prototype.query = function(callback) {
  var dataset = this.dataset;
  callback = callback || locationsVis.drawResults;
  if (this.nationalities) {
    dataset = this.getNationalityData(dataset);
  }
  if (this.years) {
    dataset = this.getYearData(dataset);
  }
  var cityObj = dataUtils.generateCityObject(dataset);
  this.cityArr = dataUtils.convertToCityArray(cityObj);
  this.highestCity = dataUtils.findHighestValue(this.cityArr);
  this.totalRefugees = dataUtils.countAll(this.cityArr);
  var nationalityObj = dataUtils.generateNationalityObject(dataset);
  this.nationalityArr = dataUtils.convertToNationalityArray(nationalityObj);
  this.highestNationality = dataUtils.findHighestValue(this.nationalityArr);
  console.log(dataset);
  callback(dataset);
  // writeData(dataset);
}
