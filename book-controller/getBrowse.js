const getAllBrowse = (req, res, db) => {
    db('collection')
    .distinct('collection.book_id', 'collection.title', 'collection.author', 'collection.price', 'users.address')
    .select()
    .join('users', 'users.id', '=', 'collection.user_id')
    .then(result => {
        res.json(result)
    })
}

module.exports = {
    getAllBrowse: getAllBrowse
}