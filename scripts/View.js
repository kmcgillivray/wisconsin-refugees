function View() {
  this.projection = null;
  this.canvas = d3.select("body").insert("svg:svg")
        .attr("width", window.innerWidth - 60)
        .attr("height", window.innerHeight - 60);
}

View.prototype.drawResults = function(dataset) {
  var dataObj = dataUtils.generateDataObject(dataset);
  var dataArr = dataUtils.convertToArray(dataObj);
  console.log(dataObj);
  // d3.select("svg")
  // .selectAll("text")
  // .data(dataArr)
  // .enter().append("text")
  //   .text(function(d) {
  //     return "t";
  //   })
  //   .style("width", function(d) {
  //     return d.count + "px";
  //   });

  d3.json("data/wisconsin-cities.json", function(error, cities) {
   if (error) throw error;

   var citiesObj = {};
   for (var i = 0; i < cities.features.length; i++) {
     var name = cities.features[i].properties.name;
     var coordinates = projection(cities.features[i].geometry.coordinates);
     citiesObj[name] = coordinates;
   }
   console.log(dataArr);
   var maxWidth = 100;
   var highestValue = 0;
   for (var i = 0; i < dataArr.length; i++) {
     if (dataArr[i].count > highestValue && dataArr[i].name != "Milwaukee") {
       highestValue = dataArr[i].count;
     }
   }

   view.canvas.selectAll("circle")
      .data(dataArr)
      .enter().append("circle")
      .attr("cy", function(d) {
       //  distance += 100 / dataArr.length;
       var coordinates = citiesObj[d.name];
       if (coordinates) {
         return coordinates[1] + "px";
       }
      })
      .attr("cx", function(d) {
        var coordinates = citiesObj[d.name];
        if (coordinates) {
          return coordinates[0] + "px";
        }
      })
      .attr("r", function(d) {
        var coordinates = citiesObj[d.name];
        if (coordinates && d.name != "Milwaukee") {
          return "10px";
          var percent = d.count / highestValue;
          percent = percent * maxWidth;
          console.log(percent);
          return percent + "px";
        } else {
          return 0;
        }
      })
      .style("fill", "#9ed5f6")
      .style("opacity", 0.5);

  //  view.canvas.selectAll("circle")
  //     .data(cities.features)
  //     .enter().append("circle")
  //     .attr("r", function(d) {
  //       return "10px";
  //     })
  //     .attr("cx", function(d) {
  //       var coordinates = projection(d.geometry.coordinates);
  //       return coordinates[0];
  //     })
  //     .attr("cy", function(d) {
  //       var coordinates = projection(d.geometry.coordinates);
  //       return coordinates[1];
  //     })
  //     .style("fill", "#9ed5f6")
  //     .style("opacity", 0.5);
  });
}

View.prototype.drawMap = function() {
  var data = d3.dispatch("load");

  d3.json("data/wisconsin.json", function(error, wi) {
    if (error) throw error;
    data.call("load", this, wi);
  });

  data.on("load", function(wi) {
    this.projection = d3.geoConicConformal()
                        .parallels([45 + 34 / 60, 46 + 46 / 60])
                        .rotate([90, -45 - 10 / 60])
                        .fitSize([window.innerWidth - 60, window.innerHeight - 60], wi);
    view.canvas.append("path")
       .datum(wi)
       .attr("d", d3.geoPath(this.projection))
       .style("fill", "#E7E7E7");
  });
}
