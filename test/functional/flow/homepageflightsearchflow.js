'use strict'

var FlightSearchHomePage = function (nemo) {
    this.nemo = nemo;
}


var _doSearch = function (nemo) {

    //go to site
    nemo.driver.get(nemo.data.baseUrl);

    //go to flights tab
    nemo.view.homepage.flightsLinkWaitVisible().click();

    //select JKJIA airport
    nemo.view.homepage.textFieldFromWaitVisible().sendKeys('Nb');
    nemo.view.homepage.jkAirportLinkWaitVisible().click();


    //select PEK beijing
    nemo.view.homepage.textFieldToWaitVisible().sendKeys('Pe');
    nemo.view.homepage.bjAirportLinkWaitVisible().click();


    //enter the departure date
    nemo.view.homepage.textFieldDepartDateWaitVisible().click();

    //wait till january is selected
    nemo.driver.wait(function () {
        //check if january and then click next
        return nemo.view.homepage.departDateVisible().then(function (isPresent) {
            nemo.view.homepage.departDateWaitVisible().click().then(function () {
            }, function () {
            });
            return isPresent;
        }, function (isNotPresent) {

            return nemo.view.homepage.currentMonth().getText().then(function (currentMonth) {
                if (currentMonth == "Jan") {
                    return nemo.view.homepage.currentYear().getText().then(function (currentYear) {

                        if (currentYear == "2018") {

                            return nemo.view.homepage.departDateWaitVisible().then(function () {
                                console.log("depart date found");
                            }, function () {
                                console.log("depart date not found");
                            });
                        } else {
                            nemo.view.homepage.nextMonthWaitVisible().click();
                        }
                    });

                } else {
                    //if its not january do nothing
                    nemo.view.homepage.nextMonthWaitVisible().click();
                }

            }, function (error) {
                console.log("current month not found")
            });


        });


    }, 30000, "Depart date cant be reached");

    //nemo.view.homepage.departDateWaitVisible().click();


//enter the arrival date
    nemo.view.homepage.textFieldArrDateWaitVisible().click().then(function () {

        nemo.view.homepage.returnDateWaitVisible().click();

    });

}


FlightSearchHomePage.prototype.searchFlight = function () {
    _doSearch(this.nemo);

    //finally search
    return this.nemo.view.homepage.btnSearchFlightsWaitVisible().click();
}


module.exports = FlightSearchHomePage;
