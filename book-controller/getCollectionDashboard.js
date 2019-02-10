const getCollection = (req, res, db) => {
    const { id } = req.body;

    db('collection')
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
    getCollection: getCollection
}