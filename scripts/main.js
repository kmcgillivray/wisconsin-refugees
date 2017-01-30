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

// View functions
//   drawMaps
//   drawResults / writeData
//   prepareCanvases

// Vis


// Setup steps
//   Load data
//   Prepare canvases
//   Draw maps
//   Do first query

var query = null;
var dataUtils = new DataUtils();
var view = new View();
var data = d3.dispatch("load");

var locationsVis = new Vis('.locations', true);

function init() {
  var dataFile = 'data/2002-2017-wisconsin-refugees-arrivals-by-destination-and-nationality.csv';

  d3.csv(dataFile, function(error, d) {
    if (error) { throw error; }
    data.call("load", this, d);
  });

  data.on("load", function(data) {
    view.prepareCanvases();
    view.drawMaps();
    query = new Query({
      startYear: 2002,
      endYear: 2007
    }, ["Laos"]);
    query.query(data, locationsVis.drawResults);
  });
}

init();
