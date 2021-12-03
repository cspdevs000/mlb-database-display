const { 
    Player, 
    Team
} = require("./models");

const express = require('express');
const app = express();
const PORT = process.env.PORT || 8000;
const layouts = require('express-ejs-layouts');

app.set('view engine', 'ejs');
app.use(layouts);

app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) { 
    res.json({ message: 'Views for MLB database' });
});

app.get('/teams', function(req, res) {
    Team.findAll()
    .then(function(teamList) {
        console.log('found all teams', teamList);
        res.render('teams', { teams: teamList });
    })
    .catch(function(err) {
        console.log('error', err);
        res.json({ message: 'Error occurrd, try again' });
    })
})


app.get('/players', function(req, res) {
    Player.findAll()
    .then(function(playerList) {
        console.log('found all players', playerList);
        res.render('players', { players: playerList });
    })
    .catch(function(err) {
        console.log('error', err);
        res.json({ message: 'Error occurrd, try again' });
    })
})

app.listen(PORT, () => {
    console.log('server is running on PORT', PORT);
});

module.exports = app;