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
  this.visContainer = document.getElementById("vis-container")
  this.width = this.visContainer.offsetWidth;
  this.height = this.visContainer.offsetWidth;
}

View.prototype.drawMaps = function() {
  var data = d3.dispatch("load");

  d3.json("data/wisconsin.json", function(error, wi) {
    if (error) throw error;
    data.call("load", this, wi);
  });

  var self = this;
  console.log(self.width);

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

View.prototype.prepareCanvases = function() {
  d3.selectAll("svg")
    .attr("width", this.width)
    .attr("height", this.height)
    .attr("viewBox", "0 0 " + this.width + " " + this.height);
}
