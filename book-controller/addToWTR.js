const addToWTR = (req, res, db) => {
    const { user_id, book_id, title, author, price } = req.body;
    const bookInfo = {
        title: title,
        author: author,
        price: price,
        user_id: user_id,
        book_id: book_id
    }
    db('want_to_read')
    .insert(bookInfo)
    .then(response => {
        res.json('Book Added To Want To Read')
    })
}

module.exports = {
    addToWTR: addToWTR
}