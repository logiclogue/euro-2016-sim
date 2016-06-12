var Team = require('football-score-sim').Team;
var teams = require('../res/teams.json');


/*
 * Method which is used to retreive a team from
 * the json file and create a team object.
 */
module.exports = function (teamName) {
    var rating = teams[teamName];

    return new Team(teamName, rating);
}
