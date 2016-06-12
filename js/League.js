var Match = require('football-score-sim').Match;


/*
 * Creates a league. Can simulate all the games.
 */
function League(teams) {
    this.teams = teams || [];
    this.matches = [];

    this._generateFixtureList();
}

(function (static_, proto_) {

    /*
     * Method which simualtes all the games in
     * the league.
     */
    proto_.simulate = function () {
        this.matches.forEach(function (match) {
            var result = match.result();

            console.log(result);
        }.bind(this));
    };


    /*
     * Generates a fixture list.
     */
    proto_._generateFixtureList = function () {
        this.teams.forEach(function (team, index) {
            var i = index + 1;
            var max = this.teams.length;
            var opponent;

            for (; i < max; i += 1) {
                opponent = this.teams[i];

                this.matches.push(new Match(team, opponent));
            }
        }.bind(this));
    };

}(League, League.prototype));

module.exports = League;
