// Pick a year, pick a nationality, or all years, all nationalities, or set of years and nationalities

// Query functions
//   Query
//   getNationalityData
//   getYearData

// Data utilities
//   generateDataObject
//   listCities
//   countTotals
//   convertToArray

// Drawing functions
//   drawMap
//   drawResults / writeData

// Setup steps
//   Load data
//   Draw map
//   Do first query

var query = new Query();
var dataUtils = new DataUtils();
var view = new View();
var data = d3.dispatch("load");

d3.csv('data/2002-2017-wisconsin-refugees-arrivals-by-destination-and-nationality.csv', function(error, d) {
  if (error) {
    throw error;
  }
  data.call("load", this, d);
});

data.on("load", function(data) {
  view.drawMap();
  query.query(data, null, null, view.drawResults);
});
