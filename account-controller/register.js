const handleRegister = (req, res, db) => {
    const { name, email, password, phone, address } = req.body;
    const userInfo = {
        name: name,
        email: email,
        password: password,
        phone: phone,
        address: address
    }

    db('users')
    .returning('*')
    .insert(userInfo)
    .then(data => {
        res.json(data[data.length -1])
    })
}

module.exports = {
    handleRegister : handleRegister
}