var League = require('./js/League');
var getTeam = require('./js/getTeam');


var groupA = new League([getTeam('France'), getTeam('Romania'), getTeam('Albania'), getTeam('Switzerland')]);
var groupb = new League([getTeam('wales'), getTeam('Slovakia'), getTeam('England'), getTeam('Russia')]);
var groupC = new League([getTeam('Poland'), getTeam('Northern Ireland'), getTeam('Germany'), getTeam('Ukraine')]);
var groupD = new League([getTeam('Turkey'), getTeam('Croatia'), getTeam('Spain'), getTeam('Czech Republic')]);
var groupE = new League([getTeam('Republic Of Ireland'), getTeam('Sweden'), getTeam('Belgium'), getTeam('Italy')]);
var groupF = new League([getTeam('Austria'), getTeam('Hungary'), getTeam('Portugal'), getTeam('Iceland')]);

groupA.simulate();
