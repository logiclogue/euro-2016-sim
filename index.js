var League = require('./js/League');
var Match = require('./js/MatchKnockOut');
var getTeam = require('./js/getTeam');
var table = require('table').default;


var groups = [];
var thirdPlaceGroup;
var thirdPlaceTeams = [];
var last16 = [];


groups[0] = new League([getTeam('France'), getTeam('Romania'), getTeam('Albania'), getTeam('Switzerland')]);
groups[1] = new League([getTeam('Wales'), getTeam('Slovakia'), getTeam('England'), getTeam('Russia')]);
groups[2] = new League([getTeam('Poland'), getTeam('Northern Ireland'), getTeam('Germany'), getTeam('Ukraine')]);
groups[3] = new League([getTeam('Turkey'), getTeam('Croatia'), getTeam('Spain'), getTeam('Czech Republic')]);
groups[4] = new League([getTeam('Republic of Ireland'), getTeam('Sweden'), getTeam('Belgium'), getTeam('Italy')]);
groups[5] = new League([getTeam('Austria'), getTeam('Hungary'), getTeam('Portugal'), getTeam('Iceland')]);

groups.forEach(function (group) {
    group.simulate();
    group.sort();
    console.log(group.print());

    thirdPlaceTeams.push(group.teams[2]);
});

thirdPlaceGroup = new League(thirdPlaceTeams, {
    resetPoints: false
});
thirdPlaceGroup.sort();
console.log(thirdPlaceGroup.print());

last16[0] = new Match(groups[0].teams[0], groups[2].teams[1]);

last16.forEach(function (match) {
    console.log(match.result().text);
});
