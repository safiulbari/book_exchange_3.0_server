const handleDelete = (req, res, db) => {
    const q = 'DELETE FROM users WHERE id=' + req.body.id;
    db.raw(q)
    .then(result => {
        res.json('Account removed')
    })
}

module.exports = {
    handleDelete: handleDelete
}