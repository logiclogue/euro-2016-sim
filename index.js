var League = require('./js/League');
var Match = require('./js/MatchKnockOut');
var KnockOut = require('./js/KnockOut');
var getTeam = require('./js/getTeam');
var table = require('table').default;


var groups = [];
var thirdPlaceGroup;
var groupBEF;
var groupACD;
var groupABF;
var groupCDE;
var thirdPlaceTeams = [];


// Group A
groups[0] = new League([getTeam('France'), getTeam('Romania'), getTeam('Albania'), getTeam('Switzerland')]);
// Group B
groups[1] = new League([getTeam('Wales'), getTeam('Slovakia'), getTeam('England'), getTeam('Russia')]);
// Group C
groups[2] = new League([getTeam('Poland'), getTeam('Northern Ireland'), getTeam('Germany'), getTeam('Ukraine')]);
// Group D
groups[3] = new League([getTeam('Turkey'), getTeam('Croatia'), getTeam('Spain'), getTeam('Czech Republic')]);
// Group E
groups[4] = new League([getTeam('Republic of Ireland'), getTeam('Sweden'), getTeam('Belgium'), getTeam('Italy')]);
// Group F
groups[5] = new League([getTeam('Austria'), getTeam('Hungary'), getTeam('Portugal'), getTeam('Iceland')]);

groupStage();
thirdPlaceGroupStage();


var knockOut = new KnockOut([
    groups[0].teams[1], groups[2].teams[1],
    groups[3].teams[0], thirdPlaceGroup.teams[0],
    groups[1].teams[0], thirdPlaceGroup.teams[1],
    groups[5].teams[0], groups[4].teams[1],
    groups[2].teams[0], thirdPlaceGroup.teams[2],
    groups[4].teams[0], groups[3].teams[1],
    groups[0].teams[0], thirdPlaceGroup.teams[3],
    groups[1].teams[1], groups[5].teams[1]
]);

for (var i = 0; i < 4; i += 1) {
    knockOut.simulateRound(function (match) {
        console.log(match.text);
    });

    console.log('\n');
}


function groupStage() {
    groups.forEach(function (group) {
        // Simulate all the matches in the group.
        group.simulate();
        // Sort the group.
        group.sort();
        // Print the group table.
        console.log(group.print());

        // Teams that finish 3rd get put into the 3rd
        // place ranking group.
        thirdPlaceTeams.push(group.teams[2]);

        // For every match print the results.
        group.matches.forEach(function (match) {
            console.log(match.text);
        });
    });
}

function thirdPlaceGroupStage() {
    thirdPlaceGroup = new League(thirdPlaceTeams, {
        resetPoints: false
    });
    thirdPlaceGroup.sort();
    console.log(thirdPlaceGroup.print());

    groupBEF = new League([groups[1].teams[2], groups[4].teams[2], groups[5].teams[2]], {
        resetPoints: false
    });
    groupBEF.sort();

    groupACD = new League([groups[0].teams[2], groups[2].teams[2], groups[3].teams[2]], {
        resetPoints: false
    });
    groupACD.sort();

    groupABF = new League([groups[0].teams[2], groups[1].teams[2], groups[5].teams[2]], {
        resetPoints: false
    });
    groupABF.sort();

    groupCDE = new League([groups[2].teams[2], groups[3].teams[2], groups[4].teams[2]], {
        resetPoints: false
    });
    groupCDE.sort();
}
