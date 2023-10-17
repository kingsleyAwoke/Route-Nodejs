const userDB = {
    users:  require('../model/users.json'),
    setusers: function(data) { this.users = data }
}

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

require('dotenv').config();

const fsPromise = require('fs').promises;
const path = reuire('path');

const handleLogin = async (req, res) => {
    const { user, pwd } = req.body;
    if (!user || pwd) return res.status(400).json({ 'message': 'Username and password are required.'});

    const foundUser = userDB.users.find(person => person.username === user);
    if (!foundUser) return res.sendStatus(401);

    const match = await bcrypt.compare(pwd, foundUser.password);

    if (match) {
        const accessToken = jwt.sign(
            {'userName': foundUser.userName },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '30s' }
        );

        const refreshToken = jwt.sign(
            {'userName': foundUser.userName },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '1d' }
        );
        res.json({'success': `User ${user} is loggedin`});
    } else {
        res.sendStatus(401);

    }
}


module.exports = { handleLogin }