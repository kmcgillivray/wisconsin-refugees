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
      var classes = view.highestInfo.classList;

      if (count <= 1) {
        if (!classes.contains("dn")) {
          classes.add("dn");
        }
      }
      if (count > 1) {
        if (classes.contains("dn")) {
          classes.remove("dn");
        }
        return count + " cities and towns ";
      } else if (count == 1) {
        return " one city ";
      } else {
        return "0 locations";
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

    view.countriesList.innerHTML = (function() {
      var nationalityArr = query.nationalityArr;
      nationalityArr.sort(function(a,b) {
        return b.count - a.count;
      });
      var str = "<ul class='gray list pl0 mv0'>";
      for (var i = 0; i < nationalityArr.length; i++) {
        var country = nationalityArr[i];
        if (country.count > 0) {
          str += "<li class='mb2'><span class='b'>" + country.name + ":</span> " + country.count +  "</li>";
        }
      }
      str += "</ul>";
      return str;
    })();

    view.citiesList.innerHTML = (function() {
      var cityArr = query.cityArr;
      cityArr.sort(function(a,b) {
        return b.count - a.count;
      });
      var str = "<ul class='gray list pl0 mv0'>";
      for (var i = 0; i < cityArr.length; i++) {
        var city = cityArr[i];
        str += "<li class='mb2'><span class='b'>" + city.name + ":</span> " + city.count +  "</li>";
      }
      str += "</ul>";
      return str;
    })();

    view.nationalityCountDisplay.innerText = (function() {
      // If the list of countries isn't filtered
      if (!query.nationalities || query.nationalities.length == 37) {
        // count the number of countries with refugees
        var count = 0;
        for (var i = 0; i < query.nationalityArr.length; i++) {
          var country = query.nationalityArr[i];
          if (country.count > 0) {
            count++;
          }
        }
        return count + " countries";
      } else {
        var nationalityCount = query.nationalityArr.length;
        if (nationalityCount == 1) {
          return query.nationalityArr[0].name;
        } else {
          return nationalityCount + " selected countries";
        }
      }
    })();

    view.totalCountDisplay.innerText = (function() {
      if (query.totalRefugees > 1) {
        return format.to(query.totalRefugees) + " refugees";
      } else if (query.totalRefugees == 1){
        return "one refugee";
      } else {
        return "0 refugees";
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
