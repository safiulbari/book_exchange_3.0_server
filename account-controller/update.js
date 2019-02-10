const handleUpdate = (req, res, db) => {
    const { id, name, email, password, phone, address } = req.body;
    const userUpdate = {
        name: name,
        email: email,
        password: password,
        phone: phone,
        address: address
    }
    db('users')
    .returning('*')
    .where({id : id})
    .update(userUpdate)
    .then(result => {
        res.json(result[0])
    })

}

module.exports = {
    handleUpdate: handleUpdate
}