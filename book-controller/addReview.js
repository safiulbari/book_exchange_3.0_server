const review = (req, res, db) => {
    const { book_id, review, user_id, reviewer, book } = req.body;
    const reviewInfo = {
        book_id: book_id,
        user_id: user_id,
        review: review,
        reviewer: reviewer
    }
    // const q = 'INSERT INTO reviews SET ?'
    // db.raw(q, reviewInfo)
    // .then(result => {
    //     if(result) {
    //         const q2 = 'SELECT * FROM reviews WHERE book_id=' + book_id;
    //         db.raw(q2)
    //         .then(result => {
    //             res.json(result)
    //         })
    //     }
    // })
    db('reviews')
    .returning('*')
    .where('book_id', book_id)
    .insert(reviewInfo)
    .then(result => {
        res.json(result)
    })
}

module.exports = {
    review : review
}