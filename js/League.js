var Match = require('football-score-sim').Match;


/*
 * Creates a league. Can simulate all the games.
 */
function League(teams) {
    this.teams = teams || [];
    this.matches = [];

    this.teams.forEach(function (team) {
        team.points = 0;
        team.played = 0;
        team.wins = 0;
        team.draws = 0;
        team.loses = 0;
        team.goalsFor = 0;
        team.goalsAgainst = 0;
    });

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
            var teamA = this.teams[this.teams.indexOf(match.team[0])];
            var teamB = this.teams[this.teams.indexOf(match.team[1])];

            teamA.played += 1;
            teamA.goalsFor += result.score[0];
            teamA.goalsAgainst += result.score[1];

            teamB.played += 1;
            teamB.goalsFor += result.score[1];
            teamB.goalsAgainst += result.score[0];

            // If teamA won.
            if (result.result === 0) {
                teamA.points += 3;
                teamA.wins += 1;
                
                teamB.loses += 1;
            }
            // If teamB won.
            else if (result.result === 1) {
                teamB.points += 3;
                teamB.wins += 1;

                teamA.loses += 1;
            }
            // If the game was a draw.
            else {
                teamA.points += 1;
                teamA.draws += 1;

                teamB.points += 1;
                teamB.draws += 1;
            }
        }.bind(this));
    };

    /*
     * Sorts the teams array based on number of
     * points.
     */
    proto_.sort = function () {
        this.teams.sort(function (teamA, teamB) {
            if (teamA.points === teamB.points) {
                return teamA.goalsFor - teamA.goalsAgainst < teamB.goalsFor - teamB.goalsAgainst;
            }

            return teamA.points < teamB.points;
        });
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
