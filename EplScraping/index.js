const puppeteer = require("puppeteer");
const fs = require("fs");

var games = [];
var players = [];
var matches = ["46975", "46976", "46977", "46978", "46979", "46980", "46981", "46982", "46983", "46984"];
/* var matches = ["46975"]; */

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    for (var match of matches) {
        var game = {};
        var link = "https://www.premierleague.com/match/" + match;
        await page.goto(link);
        let data = await page.evaluate(() => {
            let temp = document
                .querySelector('div[class="mcTabsContainer"]')
                .getAttribute("data-fixture");
            return temp;
        });
        var jsonData = JSON.parse(data);

        game.homeTeam = {};
        game.awayTeam = {};
        for (i in jsonData.teams) {
            if (i == 0) {
                game.homeTeam.name = jsonData.teams[i].team.name;
                game.homeTeam.id = jsonData.teams[i].team.club.id;
                game.homeTeam.score = jsonData.teams[i].score;
                game.homeTeam.lineup = {};
                game.homeTeam.lineup.players = [];
                game.homeTeam.lineup.formation =
                    jsonData.teamLists[0].formation.label;
                game.homeTeam.lineup.players =
                    jsonData.teamLists[0].formation.players;
            } else if (i == 1) {
                game.awayTeam.name = jsonData.teams[i].team.name;
                game.awayTeam.id = jsonData.teams[i].team.club.id;
                game.awayTeam.score = jsonData.teams[i].score;
                game.awayTeam.lineup = {};
                game.awayTeam.lineup.players = [];
                game.awayTeam.lineup.formation =
                    jsonData.teamLists[1].formation.label;
                game.awayTeam.lineup.players =
                    jsonData.teamLists[1].formation.players;
            }
        }

        game.ground = {};
        game.ground = jsonData.ground;

        game.matchInfo = {};
        game.matchInfo.attendance = jsonData.attendance;

        game.matchInfo.kickoffTime = jsonData.kickoff.millis;

        game.matchInfo.halfTimeScore = jsonData.halfTimeScore;

        game.matchOfiicials = [];

        for (matchOfficial of jsonData.matchOfficials) {
            var official = {};
            official.id = matchOfficial.id;
            official.role = matchOfficial.role;
            if (!official.role) official.role = "RESERVE";
            game.matchOfiicials.push(official);
        }

        game.goals = [];
        game.cards = [];

        for (event of jsonData.events) {
            if (event.type === "P") {
                goal = {};
                goal.type = "P";
                goal.playerId = event.personId;
                goal.teamId = event.teamId;
                goal.time = event.clock.secs;
                goal.score = event.score;
                game.goals.push(goal);
            }
            if (event.type === "G") {

                goal = {};
                goal.type = "G"
                goal.playerId = event.personId;
                goal.teamId = event.teamId;
                goal.assistId = event.assistId;
                goal.time = event.clock.secs;
                goal.score = event.score;
                game.goals.push(goal);
            } else if (event.type === "B") {
                card = {};
                card.type = event.description;
                card.teamId = event.teamId;
                card.playerId = event.personId;
                card.time = event.clock.secs;
                goal.score = event.score;
                game.cards.push(card);
            }
        }

        var team1 = jsonData.teamLists[0];
        var lineup1 = team1.lineup;
        var subs1 = team1.substitutes;
        for (player of lineup1) {
            temp = {};
            temp.name = player.name;
            temp.position = player.info.position;
            temp.matchShirtNumber = player.matchShirtNumber;
            temp.birthDateMillis = player.birth.date.millis;
            temp.countryName = player.nationalTeam.country;
            temp.countryCode = player.nationalTeam.isoCode;
            players.push(temp);
        }
        for (player of subs1) {
            temp = {};
            temp.name = player.name;
            temp.position = player.info.position;
            temp.matchShirtNumber = player.matchShirtNumber;
            temp.birthDateMillis = player.birth.date.millis;
            temp.countryName = player.nationalTeam.country;
            temp.countryCode = player.nationalTeam.isoCode;
            players.push(temp);
        }


        var team2 = jsonData.teamLists[1];
        var lineup2 = team2.lineup;
        var subs2 = team2.substitutes;

        for (player of lineup2) {
            temp = {};
            temp.name = player.name;
            temp.position = player.info.position;
            temp.matchShirtNumber = player.matchShirtNumber;
            temp.birthDateMillis = player.birth.date.millis;
            temp.countryName = player.nationalTeam.country;
            temp.countryCode = player.nationalTeam.isoCode;
            players.push(temp);
        }
        for (player of subs2) {
            temp = {};
            temp.name = player.name;
            temp.position = player.info.position;
            temp.matchShirtNumber = player.matchShirtNumber;
            temp.birthDateMillis = player.birth.date.millis;
            temp.countryCode = player.nationalTeam.isoCode;
            temp.countryName = player.nationalTeam.country;
            players.push(temp);
        }

        //console.log(players);
        games.push(game);
    }
    await browser.close();


    //console.log(game);
    //console.log(JSON.stringify(game), null, 2);

    /* fs.writeFile(
        "output.json",
        JSON.stringify(games, null, 2),
        "utf8",
        (err) => {
            if (err) console.log(err);
        }
    ); */
    fs.writeFile(
        "players.json",
        JSON.stringify(players, null, 2),
        "utf8",
        (err) => {
            if (err) console.log(err);
        }
    );
})();
