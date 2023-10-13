const express = require('express');
const app = express();
const path = require('path');
const  { logger } = require('./middlewareDir/logEvents');
const errorHandler = require('./middlewareDir/errorHandler');
const cors = require('cors');
const PORT = process.env.PORT || 3500;


app.use(logger);

const whitelist = ['https://www.gogle.com', 'https://localhost:3500'];
const corsOptions = {
    origin: (origin, callback) => {
        // need to remove the "|| !origin" after development
        if (whitelist.indexOf(origin) !== -1 || !origin)  {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    optionSuccessStatus: 200
}
app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.use(express.static(path.join(__dirname, './public')));

// get home page
app.get('^/$|/index(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

/// get a new page 
app.get('/new-page(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'new-page.html'));
});


// page redirctor
app.get('/old-page(.html)?', (req, res) => {
    res.redirect(301, 'new-page.html');
});

// Route handlers
app.get('/hello(.html)?', (req, res, next) => {
    console.log('tempting to load html');
    next()
}, (req, res) => {
    res.send('Hello World');
});


// chaning route handler
const one = (req, res, next) => {
    console.log('one');
    next();
}
const two = (req, res, next) => {
    console.log('two');
    next();
}
const three = (req, res) => {
    console.log('three');
    res.send('finished!');
}

app.get('./chain(.html)?', [one, two, three]);


//404 page render
app.all('*', (req, res) => {
    res.status(404);
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'));
    }

    if (req.accepts('json')) {
        res.json({ error: '404 Not found'});
    } else {
        res.type('txt').send('404 Not found');
    }
});

app.use(errorHandler);


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));