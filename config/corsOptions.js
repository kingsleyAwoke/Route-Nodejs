const whitelist = [
    'https://www.gogle.com', 
    'https://localhost:3500'
];
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

module.exports = corsOptions;