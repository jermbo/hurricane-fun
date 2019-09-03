# Hurricane Fun

I wanted to see some data behind hurricanes. Specifically from the North Atlantic and as far back as data would allow.

The data was gathered at the NOAA website specifically on the North Atlantic Ocean Basin. There are a 100 things I want to do with this, but for now, searching by year is good.

## Resources

[NOAA](https://www.ncdc.noaa.gov/ibtracs/index.php?name=wmo-data) I chose the data set "Storms by Basin", specifically from the North Atlantic Ocean, and converted it to JSON so I can manipulate it.

## How to use

If you want to run this locally, follow these steps;
1. Clone or download repo
2. Navigate to directory in terminal or choice and run `npm install`
3. Once all packages are installed, run `npm run serve`

### npm run serve

This task will trigger two tasks. Start API server utilizing JSON-Server. Then it will run the site through my starter build process and gets BrowserSync up and running. This should open your default browser and you are ready to rock. If it does not automatically open, navigate to `http://localhost:3000` to see the site.

## TODO

* Update search functionality
  * Add ability to search by name
  * Add ability to search by category
  * Enhance search by years
* Add some stats. Would like to see a break down based on search results.
  * How many of each category?
  * How many named vs unnamed?
* Plot paths on a map.
* Put online to all to use
