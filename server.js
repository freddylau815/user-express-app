const express = require('express');
const cors = require('cors')


const PORT = 3332;

const app = express();

// db.query("INSERT INTO users (username, email, password) VALUES ('freddy', 'freddy@email.com', 'password123')", (err, results) => {
//   if (err) return console.log(err);

//   console.log(results)
// })

// db.query('SELECT * FROM users', (err, results) => {
//   if (err) return console.log(err);

//   console.log(results)
// })

const api_routes = require('./routes/api_routes')


// Opening up the middleware channel to allow json to be sent through from the client
app.use(express.json());

// Share or create a GET route for every file in the public folder 
// .public will be considered the ROOT
// Looking for index.html in the ROOT - specifically INDEX.html
app.use(express.static('./public'))

// Open CORS to all domains
app.use(cors())

// Load Routes 
// Load routes at the root of my port
// prefixed '/api' to our routes
app.use('/api', api_routes)

app.listen(PORT, () => {
  console.log('Server started on port', PORT);
});
