const express = require('express');
const app = express();
const path = require('path');
const  { logger } = require('./middlewareDir/logEvents');
const errorHandler = require('./middlewareDir/errorHandler');
const verifyJWT = require('./middlewareDir/verify');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const PORT = process.env.PORT || 3500;


app.use(logger);


app.use(cors(corsOptions));


//BUIT-IN MIDDLEWARE FOR FORM SUBMIT
app.use(express.urlencoded({ extended: false }));

// BUIT-IN MIDDLEWARE FOR JSON
app.use(express.json());

// MIDDLEWARE FOR COOKIES
app.use(cookieParser());

//SERVE STATIC FILES
app.use('/', express.static(path.join(__dirname, './public')));

//ROUTES
app.use('/', require('./routes/root'));
app.use('/register', require('./routes/register'));
app.use('/auth', require('./routes/auth'));
app.use('/refresh', require('./routes/refresh'));
app.use('/logout', require('./routes/logout'));

app.use(verifyJWT);
app.use('/employees', require('./routes/api/employees'));


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