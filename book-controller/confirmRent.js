const confirm = (req, res, db) => {
    const {renter_name, renter_phone, renter_address, title, author, price, rent_fee, owner_name, owner_phone, owner_address} = req.body;
    
    function addDays(date, days) {
        var result = new Date();
        result.setDate(result.getDate() + days);
        return result;
    }
    const rentInfo = {
        renter_name: renter_name,
        renter_phone: renter_phone,
        renter_address: renter_address,
        title: title,
        author: author,
        price: price,
        rent_fee: rent_fee,
        receive_date: new Date(),
        return_date: addDays(new Date(), 7),
        owner_name: owner_name,
        owner_phone: owner_phone,
        owner_address: owner_address,
    }

    db('rent')
    .insert(rentInfo)
    .then(result => {
        res.json('Rent Placed')
    })
}

module.exports = {
    confirm : confirm
}