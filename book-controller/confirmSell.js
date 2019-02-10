const confirm = (req, res, db) => {
    const { buyer_name,buyer_phone,buyer_address,title,author,price,delivery_fee,seller_name,seller_phone,seller_address} = req.body;
    const sellInfo = {
        buyer_name: buyer_name,
        buyer_phone: buyer_phone,
        buyer_address: buyer_address,
        title: title,
        author: author,
        price: price,
        delivery_fee: delivery_fee,
        seller_name: seller_name,
        seller_phone: seller_phone,
        seller_address: seller_address,
    }
    db('sell')
    .insert(sellInfo)
    .then(result => {
        res.json('Order Placed')
    })
}

module.exports = {
    confirm : confirm
}