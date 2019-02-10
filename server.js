const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const knex = require('knex');

const register = require('./account-controller/register');
const login = require('./account-controller/login');
const update = require('./account-controller/update');
const deleteAccount = require('./account-controller/delete');

const addingToBooks = require('./book-controller/addToBooks');
const addingToCollection = require('./book-controller/addToCollection');
const addingToWTR = require('./book-controller/addToWTR');
const getCollectionDashboard = require('./book-controller/getCollectionDashboard');
const getCollectionAll = require('./book-controller/getCollectionAll');
const getWTRDashboard = require('./book-controller/getWTRDashboard');
const getWTRAll = require('./book-controller/getWTRAll');
const getBrowse = require('./book-controller/getBrowse');
const getBookDetails = require('./book-controller/getBookDetails');
const deleteBook = require('./book-controller/deleteBook');
const getExchange = require('./book-controller/getExchange');
const confirmExchange = require('./book-controller/confirmExchange');
const confirmRent = require('./book-controller/confirmRent');
const confirmSell = require('./book-controller/confirmSell');
const addReview = require('./book-controller/addReview');
const getReview = require('./book-controller/getReview');


const app = express();

app.use(cors());
app.use(bodyParser.json())

const db = knex({
    client: 'pg',
    connection: {
        host: 'localhost',
        user: 'postgres',
        password: 'password',
        database: 'book_exchange'
    }
})


app.get('/', (req, res) => {
    res.send('Hello')
})



// Remove Single Book ----
app.delete('/removeBook/:book_id', (req, res) => {
    deleteBook.removeBook(req, res, db)
})
// ------------------->


// Get book details -----
app.get('/getBookDetails/:book_id', (req, res) => {
    getBookDetails.getDetails(req, res, db)
})
// --------------------->


// Related to Browse all books ----
app.get('/getBooks', (req, res) => {
    getBrowse.getAllBrowse(req, res, db)
})
// ---------------->



// Related to users account ---------
app.post('/register', (req, res) => {
    register.handleRegister(req, res, db)
})

app.post('/login', (req, res) => {
    login.handleLogin(req, res, db)
})

app.put('/update', (req, res) => {
    update.handleUpdate(req, res, db)

})

app.delete('/delete', (req, res) => {
    deleteAccount.handleDelete(req, res, db)
})
// ------------- --->


// Add book to books table ----
app.post('/addToBooks', (req, res) => {
    addingToBooks.addToBook(req, res, db)
    
})
// ------------------------>

// Add book to collection table -------
app.post('/addToCollection', (req, res) => {
    addingToCollection.addToCollection(req, res, db)
})
// ----------------------------->

// Add book to Want to read table -------
app.post('/addToWTR', (req, res) => {
    addingToWTR.addToWTR(req, res, db)
    
})
// ----------------------------->

// Get Collection Dashboard
app.post('/getCollection', (req, res) => {
    getCollectionDashboard.getCollection(req, res, db)
})
// ----------------------->

// Get Collection All
app.post('/getCollectionAll', (req, res) => {
    getCollectionAll.getCollection(req, res, db)
})
// ----------------------->

// Get want to read Dashboard
app.post('/getWTR', (req, res) => {
    getWTRDashboard.getWTR(req, res, db)
})
// ----------------------->

// Get want to read All
app.post('/getWtrAll', (req, res) => {
    getWTRAll.getWTR(req, res, db)
})
// ----------------------->



// Related to exchange------
app.post('/getExchange', (req, res) => {
    getExchange.exchange(req, res, db)
})

app.post('/confirmExchange', (req, res) => {
    confirmExchange.confirm(req, res, db)
})
// -------------------------->


// Related to Sell -------
app.post('/confirmBuy', (req, res) => {
    confirmSell.confirm(req, res, db)
})
//----------------------->


// Related to Rent -------
app.post('/confirmRent', (req, res) => {
    confirmRent.confirm(req, res, db)
})
// --------------------->



// will add review to a particular book ------

app.post('/addReview', (req, res) => {
    addReview.review(req, res, db)
})


// will get all the reviews for a particular book
app.post('/getReviews', (req, res) => {
    getReview.review(req, res, db)
})
// --------------------->





// ---- SO FAR IMPLEMENTED WITH FRONT-END -------------



// --------------------------------------------------



// ---- NOT IMPLEMENTED -------



// Related to bookRatings------
app.post('/addBookRatings', (req, res) => {
    const {book_id, ratings} = req.body;
    const ratingInfo = {
        book_id: book_id,
        ratings: ratings
    }
    const q = 'INSERT INTO bookRatings SET ?';
    db.query(q, ratingInfo, (err, result) => {
        if (err) throw err;
        res.json('Ratings added');
    })
})

// will be combined with bookProfile
app.get('/getBookRatings', (req, res) => {
    const {book_id} = req.body;
    const q = 'SELECT AVG(ratings) AS Ratings FROM bookRatings WHERE book_id=' + book_id+' GROUP BY book_id';
    db.query(q, (err, result) => {
        if (err) throw err;
        res.json(result);
    })
})
// -------------------->


// Related to Book Profile ---------
app.get('/bookProfile', (req, res) => {
    const {id} = req.body;
    const q = "SELECT books.title,books.author,books.price,reviews.review, AVG(bookRatings.ratings) AS Rating FROM books INNER JOIN reviews ON reviews.book_id = books.id INNER JOIN bookRatings ON bookRatings.book_id = books.id WHERE books.id = "+id +" GROUP BY books.id";

    db.query(q, (err, result) => {
        if (err) throw err;
        res.json(result);
    })
})
// --------------------->


// Related to User Profile ----------
app.post('/userRatings', (req, res) => {
    const {user_id, ratings} = req.body;
    const userRatingInfo = {
        user_id: user_id,
        ratings: ratings
    }
    const q = 'INSERT INTO userRatings SET ?';
    db.query(q, userRatingInfo, (err, result) => {
        if (err) throw err;
        res.json('User Ratings Added')
    })
})

app.get('/userProfile', (req, res) => {
    const {id} = req.body;
    const q = "SELECT users.name, users.email, AVG(userRatings.ratings) AS Ratings FROM users JOIN userRatings ON userRatings.user_id = users.id WHERE users.id = "+id+" GROUP BY users.id";

    db.query(q, (err, result) => {
        if (err) throw err;
        res.json(result)
    })
})
// ----------------------->



app.listen(5000, () => {
    console.log('Server started at port 5000');
})