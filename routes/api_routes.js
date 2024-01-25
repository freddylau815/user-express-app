const router = require('express').Router()
const db = require('../db/connection')

// GET
// Route to retreive/ .GET all users from the json database
router.get('/users', async (requestObj, responseObj) => {
  // Make a query to the db and get all rows from the users table 
  try {
    const [users] = await db.query('SELECT * FROM users');

    responseObj.send(users)
  } catch (err) {
    console.log(err)
  }

});

// POST
// Route to add/ .POST a user to the json database
router.post('/users', async (requestObj, responseObj) => {
  // Get the old users array
  const userData = requestObj.body;

  try {
    // Check if the user already exists
    const [results] = await db.query('SELECT * FROM users WHERE username = ?', [userData.username]);

    // Check if a user was found matching that username 
    if (results.length) {
      return responseObj.json({
        error: 402,
        message: 'That user already exists'
      });
    }

    // Run a query to INSERT a new user into the user's table, with our requestObj.body data (username, email, password)
    const [result] = await db.query('INSERT INTO users (username, email, password) VALUES (?,?,?)',
      [userData.username, userData.email, userData.password])

    responseObj.json({
      message: 'User added successfully',
      insertID: result.insertId

    })

  } catch (err) {
    console.log(err)
  }
})


// Route to return user by ID
// Searching by id with :id parameter
router.get('/users/:id', async (requestObj, responseObj) => {

  // Params makes an object with key value pair so id: (whatever user puts)
  const user_id = requestObj.params.id;

  try {
    const [results] = await db.query('SELECT * FROM users WHERE id = ?', [user_id]);

    if (results.length) {
      return responseObj.json(results[0])
    }

    responseObj.json({
      error: 404,
      message: 'User not found with that ID'
    })

  } catch (err) {
    console.log(err)
  }
})

// DELETE Route to remove user from database
router.delete('/user/:id', async (requestObj, responseObj) => {
  // Get user data
  // const users = await getUserData()
  const user_id = requestObj.params.id

  try {
    await db.query('DELETE FROM users WHERE id = ?', [user_id])

    responseObj.send({
      message: 'User deleted!'
    })

  } catch (err) {
    console.log(err)
  }

  // Filter out the user object matching our parm id from the user array
  // As long as userObj.id is NOT the id entered in PARAM give it back to me 
  // const filtered = users.filter(userObj => userObj.id !== user_id)

  // Overwrite the old array with updated array ( miss one user )
  // await saveUserData(filtered)

});


module.exports = router;