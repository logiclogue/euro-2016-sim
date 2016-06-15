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
    proto_.simulateRound = function () {
        
    };

    /*
     * Simulates the next match.
     */
    proto_.simulateMatch = function () {
        
    };


    /*
     * Checks to see if all the games in the round
     * have been complete.
     */
    proto_._checkRoundComplete = function () {
        
    };

    /*
     * Generate matches.
     */
    proto_._generateMatches = function () {

    };

}(KnockOut, KnockOut.prototype));

module.exports = KnockOut;
