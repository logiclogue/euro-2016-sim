var Match = require('football-score-sim').Match;
var table = require('table').default;


/*
 * Creates a league. Can simulate all the games.
 *
 * options {
 *  resetPoints: true
 * }
 */
function League(teams, options) {
    options = options || {};

    this.teams = teams || [];
    this.matches = [];

    if (options.resetPoints !== false) {
        this.resetPoints();
    }
    
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
            var goalDiffA = teamA.goalsFor - teamA.goalsAgainst;
            var goalDiffB = teamB.goalsFor - teamB.goalsAgainst;
            var equalPoints = teamA.points === teamB.points;
            var equalGoalDiff = goalDiffA === goalDiffB;
            var equalWins = teamA.wins === teamB.wins;
            var equalGoalsFor = teamA.goalsFor === teamB.goalsFor;

            if (equalPoints && equalGoalDiff && equalWins) {
                return teamA.goalsFor < teamB.goalsFor;
            }
            else if (equalPoints && equalGoalDiff) {
                return teamA.wins < teamB.wins;
            }
            else if (equalPoints) {
                return goalDiffA < goalDiffB;
            }

            return teamA.points < teamB.points;
        });
    };

    /*
     * Prints the league in a table.
     */
    proto_.print = function () {
        var headings = ['#', 'Team', 'P', 'W', 'D', 'L', 'GF', 'GA', 'GD', 'Pts'];
        var body = [headings];

        this.teams.forEach(function (team, index) {
            var row = [
                index + 1,
                team.stringName,
                team.played,
                team.wins,
                team.draws,
                team.loses,
                team.goalsFor,
                team.goalsAgainst,
                team.goalsFor - team.goalsAgainst,
                team.points
            ];

            body.push(row);
        });

        return table(body);
    };

    /*
     * Resets each team's points.
     */
    proto_.resetPoints = function () {
        this.teams.forEach(function (team) {
            team.points = 0;
            team.played = 0;
            team.wins = 0;
            team.draws = 0;
            team.loses = 0;
            team.goalsFor = 0;
            team.goalsAgainst = 0;
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
