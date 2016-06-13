var Match = require('football-score-sim').Match;


function MatchKnockOut(teamA, teamB) {
    Match.call(this, teamA, teamB, {
        penalties: true,
        extraTime: true
    })
}

MatchKnockOut.prototype = Match.prototype;

module.exports = MatchKnockOut;
