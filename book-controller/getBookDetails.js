const getDetails = (req, res, db) => {
    // const q = "SELECT books.id AS book_ID,books.title,books.author,books.price,books.user_id,users.id AS user_ID,users.name,users.phone,users.address,users.email FROM books JOIN users ON books.user_id = users.id WHERE books.id =" + req.params.book_id;
    
    // db.raw(q)
    // .then(result => {
    //     res.json(result)
    // })

    db.select('books.id AS book_ID', 'books.title', 'books.author', 'books.price', 'books.user_id', 'users.id AS user_ID', 'users.name', 'users.phone', 'users.address', 'users.email').from('books')
    .join('users', 'books.user_id', '=', 'users.id')
    .where('books.id', req.params.book_id)
    .then(result => {
        res.json(result[0])
    })

}

module.exports = {
    getDetails : getDetails
}