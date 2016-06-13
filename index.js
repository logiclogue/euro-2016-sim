var League = require('./js/League');
var Match = require('./js/MatchKnockOut');
var getTeam = require('./js/getTeam');
var table = require('table').default;


var groups = [];
var thirdPlaceGroup;
var groupBEF;
var groupACD;
var groupABF;
var groupCDE;
var thirdPlaceTeams = [];
var last16Match = [];
var quarterFinalMatch = [];
var semiFinalMatch = [];
var finalMatch;


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
last16();
quarterFinals();
semiFinals();
finalMatch();




function groupStage() {
    groups.forEach(function (group) {
        group.simulate();
        group.sort();
        console.log(group.print());

        thirdPlaceTeams.push(group.teams[2]);

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

function last16() {
    last16Match[0] = new Match(groups[0].teams[1], groups[2].teams[1]);
    //last16Match[1] = new Match(groups[3].teams[0], groupBEF.teams[0]);
    last16Match[1] = new Match(groups[3].teams[0], thirdPlaceGroup.teams[0]);
    //last16Match[2] = new Match(groups[1].teams[0], groupACD.teams[0]);
    last16Match[2] = new Match(groups[1].teams[0], thirdPlaceGroup.teams[1]);
    last16Match[3] = new Match(groups[5].teams[0], groups[4].teams[1]);
    //last16Match[4] = new Match(groups[2].teams[0], groupABF.teams[0]);
    last16Match[4] = new Match(groups[2].teams[0], thirdPlaceGroup.teams[2]);
    last16Match[5] = new Match(groups[4].teams[0], groups[3].teams[1]);
    //last16Match[6] = new Match(groups[0].teams[0], groupCDE.teams[0]);
    last16Match[6] = new Match(groups[0].teams[0], thirdPlaceGroup.teams[3]);
    last16Match[7] = new Match(groups[1].teams[1], groups[5].teams[1]);

    last16Match.forEach(function (match) {
        match.simulate();
        console.log(match.text);
    });

    console.log('\n');
}

function quarterFinals() {
    for (var i = 0, max = last16Match.length; i < max; i += 2) {
        quarterFinalMatch.push(new Match(findWinner(last16Match[i]), findWinner(last16Match[i + 1])));
    }

    quarterFinalMatch.forEach(function (match) {
        match.simulate();
        console.log(match.text);
    });

    console.log('\n');
}

function semiFinals() {
    for (var i = 0, max = quarterFinalMatch.length; i < max; i += 2) {
        semiFinalMatch.push(new Match(findWinner(quarterFinalMatch[i]), findWinner(quarterFinalMatch[i + 1])));
    }

    semiFinalMatch.forEach(function (match) {
        match.simulate();
        console.log(match.text);
    });

    console.log('\n');
}

function finalMatch() {
    var theFinal = new Match(findWinner(semiFinalMatch[0]), findWinner(semiFinalMatch[1]));

    theFinal.simulate();
    console.log(theFinal.text);
}


function findWinner(match) {
    return match.team[match.result];
}
