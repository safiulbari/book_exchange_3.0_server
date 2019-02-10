const removeBook = (req, res, db) => {
    const q = 'DELETE FROM books WHERE id='+req.params.book_id;
    db.raw(q)
    .then(result => {
        res.json('Book Removed')
    })
}

module.exports = {
    removeBook: removeBook
}