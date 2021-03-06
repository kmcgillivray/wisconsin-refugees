# [Refugee Resettlement in Wisconsin, 2019](http://kevinmcgillivray.net/wisconsin-refugees)

This is an interactive data visualization of refugee resettlements in Wisconsin from 2002-2019.

[![Preview screenshot](http://kevinmcgillivray.net/wisconsin-refugees/images/preview.png)](http://kevinmcgillivray.net/wisconsin-refugees)

## Sources

* [Refugee Processing Center](http://www.wrapsnet.org) – [Database](http://ireports.wrapsnet.org)
* [Wiscontext](http://www.wiscontext.org/refugee-resettlement-wisconsin-numbers)

## Development details

This project uses...

* [D3](https://d3js.org) for the main data visualization.
* [noUiSlider](https://refreshless.com/nouislider/) for the fancy year slider.
* And otherwise vanilla JavaScript, HTML, and CSS.

See [this post](https://www.kevinmcgillivray.net/wisconsin-refugees-development-notes/) for more development notes.

## Contributing

Open an issue with suggestions or fork the project and make a pull request! [Get in touch](http://twitter.com/kev_mcg) if you're not sure how to do that.

Some ideas for improvements:

* Expand beyond Wisconsin data. Data is available for all states, and could be expanded to switch between them.
* Look up cities through a longitude/latitude API. I did a sad amount of hardcoding to make GeoJSON data for the cities.
* Expand to data before 2002.
