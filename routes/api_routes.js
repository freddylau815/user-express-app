const router = require('express').Router()
const db = require('../db/connection')

// Automatically looking for INDEX.js because of 'index'
// const {getUserData, saveUserData} = require('../db')

// Route to retreive/ .GET all users from the json database
router.get('/users', async (requestObj, responseObj) => {
    // Make a query to the db and get all rows from the users table 
    db.query('SELECT * FROM users', (err, users) => {
      if (err) return console.log(err);

      responseObj.json(users)
    })
  
  
  
  
  
  
  
  
  
  
  // Read the json file data
    // const users = await getUserData();
  
    // responseObj.send(users);
  });
  
  // POST
  // Route to add/ .POST a user to the json database
  router.post('/users', async (requestObj, responseObj) => {
    // Get the old users array
    const userData = requestObj.body;
  
    // Run a query to INSERT a new user into the user's table, with our requestObj.body data (username, email, password)
    db.query('INSERT INTO users (username, email, password) VALUES (?,?,?)', 
    [userData.username, userData.email, userData.password],
    
    (err, results) => {
      if (err) return console.log(err);
      

      responseObj.json({
        message: 'User added successfully',
        insertID: results.insertId
      })
    })

  
    // responseObj.send({
    //   error: 402,
    //   message: 'User already exists'
    // });
  
  });
  
  
  // Route to return user by ID
  // Searching by id with :id parameter
  // 
  router.get('/users/:id', async (requestObj, responseObj) => {
      // Params makes an object with key value pair so id: (whatever user puts)
      const user_id = requestObj.params.id;
  
      db.query('SELECT * FROM users WHERE id = ?'[user_id], (err, results) => {
        if (err) return console.log(err);

        if (results.length) {
          return responseObj.json(results[0])
        }
      })






      // If user ID is not found sends back error message 
      // if (user) {
      //     return responseObj.send(user)
      // }
  
      // responseObj.send({
      //     error: 404,
      //     message: 'User not found'
      // })
  })
  
// DELETE Route to remove user from database
router.delete('/user/:id', async (requestObj, responseObj) => {
    // Get user data
    const users = await getUserData()
    const user_id = requestObj.params.id

    // Filter out the user object matching our parm id from the user array
    // As long as userObj.id is NOT the id entered in PARAM give it back to me 
    const filtered = users.filter(userObj => userObj.id !== user_id)

    // Overwrite the old array with updated array ( miss one user )
    await saveUserData(filtered)

    responseObj.send({
        message: 'User deleted!'
    })

});

    
module.exports = router;