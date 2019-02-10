const addToBook = (req, res, db) => {
    const {user_id, title, author, price} = req.body;
    const bookInfo = {
        title: title,
        author: author,
        price: price,
        user_id: user_id
    }
    db('books')
    .returning('*')
    .insert(bookInfo)
    .then(response => {
        res.json(response[response.length -1])
    })
}

module.exports = {
    addToBook: addToBook
}