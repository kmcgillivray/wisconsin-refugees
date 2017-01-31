function Vis(className, isProportional) {
  this.canvas = d3.select(className);
  this.isProportional = isProportional;
  var self = this;

  function generateCitiesObject(dataset) {
    var citiesObj = {};
    for (var i = 0; i < dataset.features.length; i++) {
      var name = dataset.features[i].properties.name;
      var coordinates = projection(dataset.features[i].geometry.coordinates);
      citiesObj[name] = coordinates;
    }
    return citiesObj;
  }

  function findHighestValue(dataArr) {
    var highestValue = 0;

    for (var i = 0; i < dataArr.length; i++) {
      if (dataArr[i].count > highestValue) {
        highestValue = dataArr[i].count;
      }
    }
    console.log(highestValue);
    return highestValue;
  }

  this.drawResults = function(dataset) {

    var format = wNumb({
    	thousand: ','
    });

    view.locationCountDisplay.innerText = (function() {
      var count = query.cityArr.length;
      if (count > 1) {
        return count + " cities and towns ";
      } else {
        return " one city ";
      }
    })();

    view.yearDisplay.innerHTML = (function() {
      var startYear = query.years.startYear;
      var endYear = query.years.endYear;
      if (startYear != endYear) {
        return "From <span class='b light-blue'>" + query.years.startYear + "—" + query.years.endYear + "</span>";
      } else {
        return "In <span class='b light-blue'>" + query.years.startYear + "</span>";
      }
    })();

    view.nationalityCountDisplay.innerText = (function() {
      var nationalityCount = query.nationalityArr.length;
      if (nationalityCount > 1) {
        return nationalityCount + " countries";
      } else {
        return query.nationalityArr[0].name;
      }
    })();

    view.totalCountDisplay.innerText = (function() {
      if (query.totalRefugees > 1) {
        return format.to(query.totalRefugees) + " refugees";
      } else {
        return "one refugee";
      }
    })();

    view.highestCityName.innerText = (function() {
      return query.highestCity.name;
    })();

    view.highestCityCount.innerText = (function() {
      var count = query.highestCity.count;
      var total = query.totalRefugees;
      var percent = Math.round((count / total) * 100);
      return "(" + format.to(count) + " / " + percent + "%)";
    })();

    view.highestNationalityName.innerText = (function() {
      return query.highestNationality.name;
    })();

    view.highestNationalityCount.innerText = (function() {
      var count = query.highestNationality.count;
      var total = query.totalRefugees;
      var percent = Math.round((count / total) * 100);
      return "(" + format.to(count) + " / " + percent + "%)";
    })();

    d3.json("data/wisconsin-cities.json", function(error, cities) {
     if (error) { throw error; }

     var citiesObj = generateCitiesObject(cities);

     var maxWidth = view.width / 5;

     self.canvas.selectAll("g").remove();

     var markers = self.canvas.selectAll("g.marker")
                              .data(query.cityArr);

     var markersEnter = markers.enter().append("g")
                               .attr("class", "marker")
                               .on('mouseover', function(d){
                                 var nodeSelection = d3.select(this);
                                 nodeSelection.select("text").style("opacity", 1.0);
                               })
                               .on('mouseout', function(d){
                                 var nodeSelection = d3.select(this);
                                 nodeSelection.select("text").style("opacity", 0.0);
                               });

    markersEnter.append("text")
                .attr("x", function(d) {
                  var coordinates = citiesObj[d.name];
                  if (coordinates) {
                    return coordinates[0] + "px";
                  }
                })
                .attr("y", function(d) {
                  var coordinates = citiesObj[d.name];
                  if (coordinates) {
                    return coordinates[1] + "px";
                  }
                })
               .text(function(d) {
                 return d.name + " (" + d.count + ")";
               })
               .style("opacity", 0.0);

    markersEnter.append("circle")
          .attr("cy", function(d) {
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
           if (coordinates) {
             if (!self.isProportional) {
               return "6px";
             } else {
               var percent = d.count / query.highestCity.count;
               percent = percent * maxWidth;
               return percent + "px";
             }

           } else {
             return 0;
           }
         })
         .style("fill", "rgba(150, 204, 255, 0.5)")
         .style("stroke", "#317ec6")
         .style("stroke-width", "2px")
         .style("opacity", 0.5);
    });
  }

}
