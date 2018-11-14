const express = require('express');
const request = require('request');
const fs = require('fs');

const port = process.env.PORT || 8080;

/// some random update message

const hbs = require('hbs');
var key = '10624132-9decbc4310605f0a746386ac8';
var app = express();
var weather = '';
var image = '';
var d = new Date()

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getFullYear', () => {
    return new Date().getFullYear();
})

hbs.registerHelper('toUpper', (message) => {
    return message.toUpperCase();
})

//middleware
app.use((request, response, next) => {
	var time = new Date().toString();
	//console.log(`${time}: ${request.method} ${request.url}`);
	var log = `${time}: ${request.method} ${request.url}`
	fs.appendFile('server.log', log + '\n', (error) => {
		if (error) {
			console.log('Unable to log message');
		}
	});
	next();
})



hbs.registerHelper('getDate', () => {
    return (d.getFullYear()) + ' - ' + (d.getMonth()+1) + ' - ' + (d.getDate()) 
})

app.get('/', (request, response) => {
    response.send('<h1>Challenge 9</h1>' +
        '<a href="/about">About Me</a>' +
        '<p></p>' +
        '<a href="/weather">Weather</a>' +
        '<p></p>' +
        '<a href="/image">Image</a>');
});

app.get('/about', (request, response) => {
    response.render('about.hbs', {
        title: 'About page',
        year: new Date().getFullYear(),
        welcome: 'Footer!'
    });
})

app.use((request, response, next) => {
	response.render('error.hbs')
	time = new Date().getTime()
})

app.get('/weather', (request, response) => {
    response.send('<h1>Weather</h1>' + '<a href="/">Home</a>' + '<p></p>' + '<a href="/about">About Me</a>' + '<p></p>' + '<a href="/image">Image</a>' + '<p></p>' + weather);
});

app.get('/image', (request, response) => {
    response.render('image.hbs', {
            title: 'Image',
            imgsrc: image,
            welcome: 'Image Footer'
        });
});

app.get('/404', (request, response)=>{
    response.send({
        error: 'Page not found'
    })
})
/*
app.listen(8080, () => {
    console.log('Server is up on the port 8080');
    request({
        url: 'https://pixabay.com/api/?key=' + key,
        json: true
    }, (error, response, body)=>{
        if (error){
           console.log('Cannot connect to pixabay'); 
        } else if (body.status === 'OK') {
            request({
                url: `https://cdn.pixabay.com/photo/2015/01/08/18/25/startup-593327_1280.jpg`,
                json: true
            }, (error, response, body) => {
                if (!error && response.statusCode === 200) {
                    image = 'https://cdn.pixabay.com/photo/2015/01/08/18/25/startup-593327_1280.jpg'
                } else {
                    console.log(body.error);
                }
            })
        }
    })

    request({
        url: 'https://maps.googleapis.com/maps/api/geocode/json' +
            '?address=Leszczynowka',
        json: true
    }, (error, response, body) => {
        if (error) {
            console.log('Cannot connect to Google Maps');
        } else if (body.status === 'ZERO_RESULTS') {
            console.log('Cannot find requested address');
        } else if (body.status === 'OK') {
            var latitude = body.results[0].geometry.location.lat;
            var longitude = body.results[0].geometry.location.lng;
            request({
                url: `https://api.darksky.net/forecast/a05801ddfd47bee6dbc2b05a8877b901/${latitude},${longitude}`,
                json: true
            }, (error, response, body) => {
                if (!error && response.statusCode === 200) {
                    weather = `The temperature in Folwark Leszczynowka is ${body.currently.temperature} and is ${ body.currently.summary}`;
                } else {
                    console.log(body.error);
                };
            });
        }
    });
    image = 'https://cdn.pixabay.com/photo/2015/01/08/18/25/startup-593327_1280.jpg'
});
*/