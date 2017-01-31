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

// Slider for years. How to filter out countries that weren't part of those years?
// Animate circle changes
// Style hovers better
// Mobile/desktop layout
// Footer info
// Don't filter countries out of results arrays so that we can draw one circle/keep all countries in dropdown?
// Fix broken results when 0 refugees from selected countries within date range
// Make text clear for selected countries

var query = null;
var dataUtils = new DataUtils();
var view = new View();
var data = d3.dispatch("load");

var locationsVis = new Vis('.locations', true);

function init() {
  var nationalitiesToggle = document.getElementById("nationalities-toggle");
  var nationalitiesMenu = document.getElementById("nationalities-menu");
  var yearsToggle = document.getElementById("years-toggle");
  var yearsMenu = document.getElementById("years-menu");

  nationalitiesToggle.addEventListener("click", function() {
    nationalitiesMenu.classList.toggle('dn');
  });

  yearsToggle.addEventListener("click", function() {
    yearsMenu.classList.toggle('dn');
  });
  if (view.yearSlider) {
    noUiSlider.create(view.yearSlider, {
    	start: [2002, 2016],
      tooltips: [ wNumb({ decimals: 0 }), wNumb({ decimals: 0 }) ],
    	connect: true,
    	range: {
    		'min': 2002,
    		'max': 2016
    	}
    });

    view.yearSlider.noUiSlider.on("slide", function(values) {
      console.log(values);
      var startYear = parseFloat(values[0]);
      var endYear = parseFloat(values[1]);
      query.years.startYear = Math.round(startYear);
      query.years.endYear = Math.round(endYear);
      query.query();
    });
  }

  var nationalitySelect = document.getElementsByClassName("nationality-select");
  if (nationalitySelect) {
    for (var i = 0; i < nationalitySelect.length; i++) {
      nationalitySelect[i].addEventListener("change", function() {
        var checkedBoxes = document.querySelectorAll('input:checked');
        console.log(checkedBoxes);
        query.nationalities = [];
        for (var j = 0; j < checkedBoxes.length; j++) {
          var country = checkedBoxes[j].value;
          query.nationalities.push(country);
        }
        console.log(query.nationalities);
        query.query();
      });
    }
  }

  var dataFile = 'data/2002-2017-wisconsin-refugees-arrivals-by-destination-and-nationality.csv';

  d3.csv(dataFile, function(error, d) {
    if (error) { throw error; }
    data.call("load", this, d);
  });

  data.on("load", function(data) {
    view.prepareCanvases();
    view.drawMaps();
    query = new Query(data);
    query.query();
  });
}


init();
