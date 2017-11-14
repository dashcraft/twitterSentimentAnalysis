// Get dependencies
const express = require('express');
const path = require('path');

const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const bodyParser = require('body-parser');
const compression = require('compression');
const winston = require('winston');
const expressWinston = require('express-winston');
const sentiment = require('sentiment');

// try {
//     const config = require('./config.json');
// } catch (err) {
//     console.log(err);
// }
const angularTweets = [];
const reactTweets = [];

function getSentiment(text) {
    return sentiment(text).score;
}

startTweetStream();

function startTweetStream() {
    const Twitter = require('node-tweet-stream')
    const angular = new Twitter({
        consumer_key: process.env.CONSUMER_KEY || config.consumer_key,
        consumer_secret: process.env.CONSUMER_SECRET || config.consumer_secret,
        token: process.env.TOKEN || config.token,
        token_secret: process.env.TOKEN_SECRET || config.token_secret
    });

    angular.track('AngularJS')

    angular.track('reactjs')
    angular.on('tweet', function(tweet) {
        const id = tweet.id;
        const created_at = tweet.created_at;
        const text = tweet.text;
        const user = tweet.user.screen_name;
        const sentiment = getSentiment(text);
        if (text.indexOf('RT') == -1 && user.indexOf('bot') == -1 && sentiment != 0) {
            if (text.indexOf('react') == -1) {
                let newTweetSent = {
                    id,
                    created_at,
                    text,
                    user,
                    sentiment
                }
                angularAdd(newTweetSent);
                io.sockets.emit('angular_sent', newTweetSent);
            }
            if (text.indexOf('react') != -1 && text.indexOf('AngularJS') == -1 && sentiment != 0) {
                let newTweetSent = {
                    id,
                    created_at,
                    text,
                    user,
                    sentiment
                }
                reactAdd(newTweetSent);
                io.sockets.emit('react_sent', newTweetSent);
            }
        }
    })
    angular.on('disconnect', function(err) {
        t.untrackAll();
    })

    angular.on('error', function(err) {
        console.log('Oh no')
    })

}

function reactAdd(tweet) {
    var length = reactTweets.length;
    if (length >= 99) {
        reactTweets.shift();
        reactTweets.push(tweet);
    } else {
        reactTweets.push(tweet);
    }

}

function angularAdd(tweet) {
    var length = angularTweets.length;
    if (length >= 99) {
        angularTweets.shift();
        angularTweets.push(tweet);
    } else {
        angularTweets.push(tweet);
    }
}


// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(compression());
// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));

//setup winston error logger
app.use(expressWinston.errorLogger({
    transports: [
        new winston.transports.Console({
            json: true,
            colorize: true
        })
    ]
}));


io.on('connection', (socket) => {
    console.log("This is a server side message, there was a connection!");
    socket.emit('msg', { msg: 'Welcome bro!' });
    socket.on('msg', function(msg) {
        socket.emit('msg', { msg: "you sent : " + msg });
    })

    socket.on('get_angular', function() {
        console.log('get_angular was called');
        io.sockets.emit('angular_total', { data: angularTweets });
    });


    socket.on('get_react', function() {
        console.log('get react was called');
        io.sockets.emit('react_total', { data: reactTweets });
    });
    io.emit('new', { 'message': 'This is a message!' });
})



// Set our api routes
// app.use('/api', api);

// Catch all other routes and return the index file
app.use('/resources', express.static(__dirname + '/node_modules'));



app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});

function handleError(err) {
    console.error(err);
    return false;
}


/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '4200';
app.set('port', port);


/**
 * Listen on provided port, on all network interfaces.
 */
http.listen(port, () => console.log(`API running on port:${port}`));