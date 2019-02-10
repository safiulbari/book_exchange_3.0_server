const exchange = (req, res, db) => {
    const { user_id, owner_id } = req.body;
    
    const q = `SELECT collection.title, collection.author, collection.price, users.name, users.phone, users.address FROM want_to_read JOIN collection ON want_to_read.title = collection.title JOIN users ON users.id = collection.user_id WHERE want_to_read.user_id = ${owner_id} AND collection.user_id = ${user_id} LIMIT 1`;

    db.raw(q)
    .then(result => {
        res.json(result.rows[0])
    })
}

module.exports = {
    exchange: exchange
}