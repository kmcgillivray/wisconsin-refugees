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
}

View.prototype.drawMaps = function() {
  var data = d3.dispatch("load");

  d3.json("data/wisconsin.json", function(error, wi) {
    if (error) throw error;
    data.call("load", this, wi);
  });

  data.on("load", function(wi) {
    this.projection = d3.geoConicConformal()
                        .parallels([45 + 34 / 60, 46 + 46 / 60])
                        .rotate([90, -45 - 10 / 60])
                        .fitSize([(window.innerWidth * 0.6) - 100, window.innerHeight], wi);
    d3.selectAll("svg").append("path")
       .datum(wi)
       .attr("d", d3.geoPath(this.projection))
       .style("fill", "#E7E7E7");
  });
}

View.prototype.prepareCanvases = function() {
  d3.selectAll("svg")
    .attr("width", window.innerWidth * .6)
    .attr("height", window.innerHeight + 100);
}
