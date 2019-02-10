const confirm = (req, res, db) => {
    const { title_1, author_1, price_1, user_1, title_2, author_2, price_2, user_2} = req.body;

    const exchangeInfo = {
        title_1: title_1,
        author_1: author_1,
        price_1: price_1,
        user_1: user_1,
        title_2: title_2,
        author_2: author_2,
        price_2: price_2,
        user_2: user_2,
    }
    db('exchange')
    .insert(exchangeInfo)
    .then(result => {
        res.json('Exchange Request Sent!')
    })
}

module.exports = {
    confirm: confirm
}