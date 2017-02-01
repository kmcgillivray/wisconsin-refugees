// Style hovers better
// add executive order filter
// Fix circle cutoff

// Don't filter countries out of results arrays so that we can draw one circle/keep all countries in dropdown?
// Animate circle changes
// Toggle between range and single year slider
// bar charts for boxes?

var query = null;
var dataUtils = new DataUtils();
var view = new View();
var data = d3.dispatch("load");
var locationsVis = null;

function loadData() {
  var dataFile = 'data/2002-2017-wisconsin-refugees-arrivals-by-destination-and-nationality.csv';

  d3.csv(dataFile, function(error, d) {
    if (error) { throw error; }
    data.call("load", this, d);
  });

  data.on("load", function(data) {
    view.prepareCanvases();
    view.drawMaps();
    query = new Query(data);
    locationsVis = new Vis('.locations', true);
    query.query();
  });
}

function setupMenu() {

  function toggleSelection(value) {
    for (var i = 0; i < view.nationalitySelect.length; i++) {
      view.nationalitySelect[i].checked = value;
    }
    updateNationalities();
  }

  function toggleMenu(menu) {
    menu.classList.toggle('dn');
  }

  function updateYears(values) {
    var startYear = parseFloat(values[0]);
    var endYear = parseFloat(values[1]);
    var years = {
      startYear: Math.round(startYear),
      endYear: Math.round(endYear)
    }
    query.setYears(years);
    query.query();
  }

  function updateNationalities() {
    var checkedBoxes = document.querySelectorAll('input:checked');
    query.nationalities = [];
    for (var j = 0; j < checkedBoxes.length; j++) {
      var country = checkedBoxes[j].value;
      query.nationalities.push(country);
    }
    query.query();
  }

  view.selectAll.addEventListener("click", function() {
    toggleSelection(true);
  });
  view.selectNone.addEventListener("click", function() {
    toggleSelection(false);
  });

  view.nationalitiesToggle.addEventListener("click", function() {
    toggleMenu(view.nationalitiesMenu);
  });
  view.nationalitiesClose.addEventListener("click", function() {
    toggleMenu(view.nationalitiesMenu);
  });
  view.yearsToggle.addEventListener("click", function() {
    toggleMenu(view.yearsMenu);
  });

  view.nationalityCountDisplay.addEventListener("click", function() {
    if (!view.citiesList.classList.contains("dn")) {
      toggleMenu(view.citiesList);
    }
    toggleMenu(view.countriesList);
  });

  view.locationCountDisplay.addEventListener("click", function() {
    if (!view.countriesList.classList.contains("dn")) {
      toggleMenu(view.countriesList);
    }
    toggleMenu(view.citiesList);
  });

  if (view.yearSlider) {
    view.createSlider(view.yearSlider);
    view.yearSlider.noUiSlider.on("slide", updateYears);
  }

  if (view.nationalitySelect) {
    for (var i = 0; i < view.nationalitySelect.length; i++) {
      view.nationalitySelect[i].addEventListener("change", updateNationalities);
    }
  }
}

function init() {
  loadData();
  setupMenu();
}

init();
