const userDB = {
    users:  require('../model/users.json'),
    setusers: function(data) { this.users = data }
}

const fsPromise = require('fs').promises;
const path = require('path');
const bcrypt = require('bcrypt');


const handleNewUser = async (req, res) => {
    const { user, pwd } = req.body;
    if (!user || pwd) return res.status(400).json({ 'message': 'Username and password are required.'});

    // check for duplicate
    const duplicate = userDB.users.find(person => person.username === user);

    if (duplicate) return res.sendStatus(409);
    try {
        const hashedPwd = await bcrypt.hash(pwd, 10);
        const newUser = {'username': user, 'password': hashedPwd}
        userDB.setusers([...userDB.users, newUser]);
        await fsPromise.writeFile(
            path.join(__dirname, '..', 'model', 'users.json'),
            JSON.stringify(userDB.users)
        );
        console.log(userDB.users);
        res.status(201).json({'success': `${user} created!`});
    } catch (err) {
        res.status(500).json({'message': err,massage });
    }
}

module.exports = { handleNewUser }