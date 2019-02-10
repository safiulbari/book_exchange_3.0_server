const addToCollection = (req, res, db) => {
    const { user_id, book_id, title, author, price } = req.body;
    const bookInfo = {
        title: title,
        author: author,
        price: price,
        user_id: user_id,
        book_id: book_id
    }
    db('collection')
    .insert(bookInfo)
    .then(response => {
        res.json('Book Added To Collection')
    })
}

module.exports = {
    addToCollection: addToCollection
}