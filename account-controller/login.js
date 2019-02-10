const handleLogin = (req, res, db) => {
    const { email, password } = req.body;

    db.select('*').from('users').where({
        email: email,
        password: password
    })
    .then(response => {
        res.json(response[0])
    })
}

module.exports = {
    handleLogin: handleLogin
}