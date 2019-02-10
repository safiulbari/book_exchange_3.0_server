const review = (req, res, db) => {
    const {book_id} = req.body;
    
    db.select('*')
    .from('reviews')
    .where('book_id', book_id)
    .then(result => {
        res.json(result)
    })
}

module.exports = {
    review : review
}