const getWTR = (req, res, db) => {
    const { id } = req.body;
    db('want_to_read')
    .distinct('title', 'author', 'price')
    .select()
    .join('users', 'user_id', '=', 'users.id')
    .where({user_id: id})
    .limit(5)
    .then(response => {
        res.json(response)
    })
}

module.exports = {
    getWTR: getWTR
}