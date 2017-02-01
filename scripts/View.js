function View() {
  this.projection = null;
  this.canvas = null;

  this.locationCountDisplay = document.getElementById("number-of-locations");
  this.yearDisplay = document.getElementById("years");
  this.nationalityCountDisplay = document.getElementById("nationalities");
  this.totalCountDisplay = document.getElementById("total-count");
  this.highestCityName = document.getElementById("highest-city");
  this.highestCityCount = document.getElementById("highest-city-count");
  this.highestNationalityName = document.getElementById("highest-nationality");
  this.highestNationalityCount = document.getElementById("highest-nationality-count");

  this.yearSlider = document.getElementById("slider");
  this.nationalitySelect = document.getElementsByClassName("nationality-select");

  this.nationalitiesToggle = document.getElementById("nationalities-toggle");
  this.nationalitiesMenu = document.getElementById("nationalities-menu");
  this.nationalitiesClose = document.getElementById("nationalities-close");
  this.yearsToggle = document.getElementById("years-toggle");
  this.yearsMenu = document.getElementById("years-menu");

  this.selectAll = document.getElementById("select-all");
  this.selectNone = document.getElementById("select-none");
  this.selectBan = document.getElementById("select-ban");

  this.visContainer = document.getElementById("vis-container");
  var width = this.visContainer.offsetWidth;
  var height = this.visContainer.offsetWidth;
  if (window.innerWidth > 680) {
    height += 100;
  }
  this.width = width;
  this.height = height;

  this.countriesList = document.getElementById("countries-list");
  this.citiesList = document.getElementById("cities-list");
  this.highestInfo = document.getElementById("highest-info");
}

View.prototype.drawMaps = function() {
  var data = d3.dispatch("load");

  d3.json("data/wisconsin.json", function(error, wi) {
    if (error) throw error;
    data.call("load", this, wi);
  });

  var self = this;

  data.on("load", function(wi) {
    this.projection = d3.geoConicConformal()
                        .parallels([45 + 34 / 60, 46 + 46 / 60])
                        .rotate([90, -45 - 10 / 60])
                        .fitExtent([[30, -30], [self.width - 70, self.height]], wi);
    d3.selectAll("svg").append("path")
       .datum(wi)
       .attr("d", d3.geoPath(this.projection))
       .style("fill", "#E7E7E7");
  });
}

View.prototype.createSlider = function(element) {
  noUiSlider.create(element, {
    start: [2002, 2016],
    tooltips: [ wNumb({ decimals: 0 }), wNumb({ decimals: 0 }) ],
    connect: true,
    range: {
      'min': 2002,
      'max': 2016
    }
  });
}

View.prototype.prepareCanvases = function() {
  d3.selectAll("svg")
    .attr("width", this.width)
    .attr("height", this.height)
    .attr("viewBox", "0 0 " + this.width + " " + this.height);
}
