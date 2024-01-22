const router = require('express').Router()
const { v4 } = require('uuid')

// Automatically looking for INDEX.js because of 'index'
const {getUserData, saveUserData} = require('../db')

// Route to retreive/ .GET all users from the json database
router.get('/users', async (requestObj, responseObj) => {
    // Read the json file data
    const users = await getUserData();
  
    responseObj.send(users);
  });
  
  // POST
  // Route to add/ .POST a user to the json database
  router.post('/users', async (requestObj, responseObj) => {
    // Get the old users array
    const users = await getUserData();
    const userData = requestObj.body 
  
    // Overwrite the old array with the newly updated array
    if (!users.find(user => user.username === userData.username) && userData.username) {
      // Push the body object from the client to our old array
      userData.id = v4()
      
      users.push(userData);
  
      await saveUserData(users);
  
      return responseObj.send({
        message: 'User added successfully!'
      });
    }
  
    responseObj.send({
      error: 402,
      message: 'User already exists'
    });
  
  });
  
  
  // Route to return user by ID
  // Searching by id with :id parameter
  // 
  router.get('/users/:id', async (requestObj, responseObj) => {
      // Params makes an object with key value pair so id: (whatever user puts)
      const user_id = requestObj.params.id;
  
      const users = await getUserData();
      // Iterates over the users with property of id to check user_id param from URL if they match user is what they enteretd in url as a VALUE (true) - if they don't matcch it is UNDEFINED
      const user = users.find(user => user.id === user_id)
  
      // If user ID is not found sends back error message 
      if (user) {
          return responseObj.send(user)
      }
  
      responseObj.send({
          error: 404,
          message: 'User not found'
      })
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