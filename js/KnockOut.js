var Match = require('football-score-sim').Match;


function KnockOut(teams) {
    this.rounds = [];
    this.matches = [];
    this.teams = teams;

    this._generateMatches();
}

(function (static_, proto_) {

    /*
     * Simulates the whole round.
     */
    proto_.simulateRound = function (callback) {
        callback = callback || function () {};

        this.matches.forEach(function (match) {
            match.simulate();
            callback(match);
        });

        this._roundComplete();
        this._generateMatches();
    };

    /*
     * Simulates the next match.
     */
    proto_.simulateNextMatch = function () {
        
    };


    /*
     * Checks to see if all the games in the round
     * have been complete.
     */
    proto_._checkRoundComplete = function () {
        
    };

    /*
     *
     */
    proto_._roundComplete = function () {
        this.teams = [];

        this.matches.forEach(function (match) {
            this.teams.push(match.winner);
        }.bind(this));
    }

    /*
     * Generate matches.
     */
    proto_._generateMatches = function () {
        var i;
        var max = this.teams.length;
        var teamA;
        var teamB;

        if (max % 2 === 1) {
            return false;
        }

        for (i = 0; i < max; i += 2) {
            teamA = this.teams[i];
            teamB = this.teams[i + 1];

            this.matches.push(new Match(teamA, teamB, {
                penalties: true,
                extraTime: true
            }));
        }

        this.rounds.push(this.matches);
    };

}(KnockOut, KnockOut.prototype));

module.exports = KnockOut;
