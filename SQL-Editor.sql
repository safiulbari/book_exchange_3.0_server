---- EXCHANGE LOGIC ----
/*
Suppose, the book 'Crime & Punishment' is in (user_id=3)'s "want_to_read".

Now let's say user_id=2 sees a book 'Da Vinci' in browse section of the site and user_id=2 wants to exchange. By the way 'Da Vinci' is in the collection of user_id=3.

For exchange to happen user_id=2 needs to have 'Crime & Punishment' in his/her's collection. If it doesn't exist exchange window will show a message saying 'exchange not possible'

if possible then it will show the book.

*/
-- STARTER DATA ---

-- users --
INSERT INTO users(
	name,
	email,
	password,
	phone,
	address
) VALUES(
	'Zero',
	'zero@gmail.com',
	'123',
	'098765',
	'Badda, Dhaka - 101'
),(
	'One',
	'one@gmail.com',
	'123',
	'098765',
	'Mirpur, Dhaka - 101'
),
(
	'Two',
	'two@gmail.com',
	'123',
	'098765',
	'Dhanmondi, Dhaka - 101'
),
(
	'Three',
	'three@gmail.com',
	'123',
	'098765',
	'Farmgate, Dhaka - 101'
);

-- Books ---
INSERT INTO books(
	title,
	author,
	price,
	user_id
)VALUES(
	'1984',
	'George Orwell',
	 240,
	 1
),
(
	'Island',
	'Aldous Huxley',
	 265,
	 1
),
(
	'Ulysses',
	'James Joyce',
	 390,
	 2
),
(
	'Dracula',
	'Bram Stoker',
	 460,
	 2
),
(
	'Startdust',
	'Neil Gaiman',
	 370,
	 3
),
(
	'Wolf',
	'Mo Hayder',
	 140,
	 3
),
(
	'Out',
	'Natsuo Kirino',
	 220,
	 4
),
(
	'Tattered',
	'Devney Perry',
	 230,
	 4
);

-- collection ---
INSERT INTO collection(
	title,
	author,
	price,
	user_id,
	book_id
)VALUES(
	'1984',
	'George Orwell',
	 240,
	 1,
	 1
),
(
	'Island',
	'Aldous Huxley',
	 265,
	 1,
	 2
),
(
	'Ulysses',
	'James Joyce',
	 390,
	 2,
	 3
),
(
	'Dracula',
	'Bram Stoker',
	 460,
	 2,
	 4
),(
	'Startdust',
	'Neil Gaiman',
	 370,
	 3,
	 5
),
(
	'Wolf',
	'Mo Hayder',
	 140,
	 3,
	 6
),
(
	'Out',
	'Natsuo Kirino',
	 220,
	 4,
	 7
),
(
	'Tattered',
	'Devney Perry',
	 230,
	 4,
	 8
);


--- want to read ---
INSERT INTO want_to_read(
	title,
	author,
	price,
	user_id,
	book_id
)VALUES(
	'1984',
	'George Orwell',
	 240,
	 2,
	 1
),
(
	'Island',
	'Aldous Huxley',
	 265,
	 2,
	 2
),
(
	'Ulysses',
	'James Joyce',
	 390,
	 1,
	 3
),
(
	'Dracula',
	'Bram Stoker',
	 460,
	 1,
	 4
),(
	'Startdust',
	'Neil Gaiman',
	 370,
	 4,
	 5
),
(
	'Wolf',
	'Mo Hayder',
	 140,
	 4,
	 6
),
(
	'Out',
	'Natsuo Kirino',
	 220,
	 3,
	 7
),
(
	'Tattered',
	'Devney Perry',
	 230,
	 3,
	 8
);


-- // users table
 CREATE TABLE users(
 	id INT AUTO_INCREMENT PRIMARY KEY,
 	name VARCHAR(100) UNIQUE NOT NULL,
 	email VARCHAR(100) UNIQUE NOT NULL,
 	password VARCHAR(100),
	phone VARCHAR(100),
	address VARCHAR(255)
 );

--  // books table

 CREATE TABLE books(
 	id INT AUTO_INCREMENT PRIMARY KEY,
 	title VARCHAR(100),
 	author VARCHAR(100),
 	price INT,
 	user_id INT NOT NULL,
 	FOREIGN KEY(user_id) REFERENCES users(id)
	 ON DELETE CASCADE
 );

--  // collection table

 CREATE TABLE collection(
 	id INT AUTO_INCREMENT PRIMARY KEY,
 	title VARCHAR(100),
 	author VARCHAR(100),
 	price INT,
 	user_id INT NOT NULL,
 	FOREIGN KEY(user_id) REFERENCES users(id) 
	 ON DELETE CASCADE,
	 book_id INT NOT NULL,
	FOREIGN KEY(book_id) REFERENCES books(id)
	 ON DELETE CASCADE
 );

--  // want to read table

 CREATE TABLE want_to_read(
 	id INT AUTO_INCREMENT PRIMARY KEY,
 	title VARCHAR(100),
 	author VARCHAR(100),
 	price INT,
 	user_id INT NOT NULL,
 	FOREIGN KEY(user_id) REFERENCES users(id) 
	 ON DELETE CASCADE,
	 book_id INT NOT NULL,
	FOREIGN KEY(book_id) REFERENCES books(id)
	 ON DELETE CASCADE
 );

--  // order table

 CREATE TABLE sell(
		id INT AUTO_INCREMENT PRIMARY KEY,
		buyer_name VARCHAR(100),
		buyer_phone VARCHAR(100),
		buyer_address VARCHAR(255),
		title VARCHAR(100),
		author VARCHAR(100),
		price INT,
		delivery_fee INT,
		seller_name VARCHAR(100),
		seller_phone VARCHAR(100),
		seller_address VARCHAR(255)
 );

--  // exchange table

 CREATE TABLE exchange(
 	id INT AUTO_INCREMENT PRIMARY KEY,
 	title_1 VARCHAR(100),
 	author_1 VARCHAR(100),
	price_1 INT,
	user_1 VARCHAR(100),
	title_2 VARCHAR(100),
 	author_2 VARCHAR(100),
	price_2 INT,
	user_2 VARCHAR(100)
 );

--  // rent table

 CREATE TABLE rent(
 	id INT AUTO_INCREMENT PRIMARY KEY,
 	renter_name VARCHAR(100),
 	renter_phone VARCHAR(100),
	renter_address VARCHAR(100),
	title VARCHAR(100),
	author VARCHAR(100),
	price INT(100),
	rent_fee INT(100),
	receive_date TIMESTAMP NOT NULL,
	return_date TIMESTAMP NOT NULL,
	owner_name VARCHAR(100),
 	owner_phone VARCHAR(100),
	owner_address VARCHAR(100)
 );

--  // review table

 CREATE TABLE reviews(
 	id INT AUTO_INCREMENT PRIMARY KEY,
 	user_id INT,
	reviewer VARCHAR(100),
	book_id INT,
	review VARCHAR(500),
 	FOREIGN KEY(user_id) REFERENCES users(id) 
	 ON DELETE CASCADE,
 	FOREIGN KEY(book_id) REFERENCES books(id)
	 ON DELETE CASCADE
 );


 ----- SO FAR COMPLETED ---------

--  // user ratings table

 CREATE TABLE userRatings(
 	id INT AUTO_INCREMENT PRIMARY KEY,
 	ratings DECIMAL(2,1),
 	user_id INT,
 	FOREIGN KEY(user_id) REFERENCES users(id)
	 ON DELETE CASCADE
 );

--  // book ratings table

 CREATE TABLE bookRatings(
 	id INT AUTO_INCREMENT PRIMARY KEY,
 	ratings DECIMAL(2,1),
 	book_id INT,
 	FOREIGN KEY(book_id) REFERENCES books(id)
	 ON DELETE CASCADE
 );