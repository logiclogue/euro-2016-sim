var League = require('./League');
var Match = require('football-score-sim').Match;
var KnockOut = require('./KnockOut');
var getTeam = require('./getTeam');
var table = require('table').default;


function Euro() {
    this._setVariables();
    this._createGroups();
    this._groupStage();
    this._thirdPlaceGroupStage();
    this._knockOutStage();
}

(function (static_, proto_) {

    proto_._setVariables = function () {
        this.groups = [];
        this.thirdPlaceGroup;
        this.thirdPlaceTeams = [];
        this.groupBEF;
        this.groupACD;
        this.groupABF;
        this.groupCDE;
        this.winner;
    };

    proto_._createGroups = function () {
        // Group A
        this.groups[0] = new League([getTeam('France'), getTeam('Romania'), getTeam('Albania'), getTeam('Switzerland')]);
        // Group B
        this.groups[1] = new League([getTeam('Wales'), getTeam('Slovakia'), getTeam('England'), getTeam('Russia')]);
        // Group C
        this.groups[2] = new League([getTeam('Poland'), getTeam('Northern Ireland'), getTeam('Germany'), getTeam('Ukraine')]);
        // Group D
        this.groups[3] = new League([getTeam('Turkey'), getTeam('Croatia'), getTeam('Spain'), getTeam('Czech Republic')]);
        // Group E
        this.groups[4] = new League([getTeam('Republic of Ireland'), getTeam('Sweden'), getTeam('Belgium'), getTeam('Italy')]);
        // Group F
        this.groups[5] = new League([getTeam('Austria'), getTeam('Hungary'), getTeam('Portugal'), getTeam('Iceland')]);
    };


    /*
     * Simulates all of the group stage.
     */
    proto_._groupStage = function () {
        this.groups.forEach(function (group) {
            // Simulate all the matches in the group.
            group.simulate();
            // Sort the group.
            group.sort();
            // Print the group table.
            console.log(group.print());

            // Teams that finish 3rd get put into the 3rd
            // place ranking group.
            this.thirdPlaceTeams.push(group.teams[2]);

            // For every match print the results.
            group.matches.forEach(function (match) {
                console.log(match.text);
            });
        }.bind(this));
    };
   
    /*
     * Generates a table based on all of the third
     * place teams to calculate who goes through.
     */
    proto_._thirdPlaceGroupStage = function () {
        this.thirdPlaceGroup = new League(this.thirdPlaceTeams, {
            resetPoints: false
        });
        this.thirdPlaceGroup.sort();
        console.log(this.thirdPlaceGroup.print());

        this.groupBEF = new League([this.groups[1].teams[2], this.groups[4].teams[2], this.groups[5].teams[2]], {
            resetPoints: false
        });
        this.groupBEF.sort();

        this.groupACD = new League([this.groups[0].teams[2], this.groups[2].teams[2], this.groups[3].teams[2]], {
            resetPoints: false
        });
        this.groupACD.sort();

        this.groupABF = new League([this.groups[0].teams[2], this.groups[1].teams[2], this.groups[5].teams[2]], {
            resetPoints: false
        });
        this.groupABF.sort();

        this.groupCDE = new League([this.groups[2].teams[2], this.groups[3].teams[2], this.groups[4].teams[2]], {
            resetPoints: false
        });
        this.groupCDE.sort();
    };

    /*
     * Creates and simulates the knock out stage.
     */
    proto_._knockOutStage = function () {
        var knockOut = new KnockOut([
            this.groups[0].teams[1], this.groups[2].teams[1],
            this.groups[3].teams[0], this.thirdPlaceGroup.teams[0],
            this.groups[1].teams[0], this.thirdPlaceGroup.teams[1],
            this.groups[5].teams[0], this.groups[4].teams[1],
            this.groups[2].teams[0], this.thirdPlaceGroup.teams[2],
            this.groups[4].teams[0], this.groups[3].teams[1],
            this.groups[0].teams[0], this.thirdPlaceGroup.teams[3],
            this.groups[1].teams[1], this.groups[5].teams[1]
        ]);

        for (var i = 0; i < 4; i += 1) {
            knockOut.simulateRound(function (match) {
                console.log(match.text);
            });

            console.log('\n');
        }

        this.winner = knockOut.teams[0];
    };

}(Euro, Euro.prototype));

module.exports = Euro;
