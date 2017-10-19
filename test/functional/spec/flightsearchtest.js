var Nemo = require('nemo');
var util = require('../util');
var FlightSearchHomePage = require('../flow/homepageflightsearchflow');


var nemo, flightsearch;

describe('@flightsearch@', function () {
    before(function (done) {

        nemo = Nemo(function (error) {

            done = util.checkError(error, done);
            flightsearch = new FlightSearchHomePage(nemo);
            done();

        });


    });
    after(function (done) {
        nemo.driver.quit().then(done());
    });
    it('exceution started',function (done) {

        flightsearch.searchFlight().then(function () {
            done();
        });


    });


});
