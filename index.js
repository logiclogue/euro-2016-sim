var Euro = require('./js/Euro');


var winners = {};
var table = [];
var max = 1000;

for (var i = 0; i < max; i += 1) {
    var euro = new Euro();
    var winnerName = euro.winner.stringName;

    winners[winnerName] = winners[winnerName] + 1 || 1;
}

for (var winner in winners) {
    var titles = winners[winner];

    table.push({
        stringName: winner,
        titles: titles,
        percentage: (titles / max) * 100
    });
}

table.sort(function (a, b) {
    if (a.percentage > b.percentage) {
        return -1;
    }

    return 1;
});

table.forEach(function (team) {
    console.log(team.stringName, team.titles, team.percentage);
});
