const router = require('express').Router();
let FlightUser = require('../models/user.model');

router.route('/').get((req, res) => {
  FlightUser.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const password = req.body.password;
  const contact = req.body.contactNo;
  const newUser = new FlightUser({
    firstName,
    lastName,
    email,
    password,
    contact,
  });

  newUser.save()
  .then(() => res.json('user added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/login').post((req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  FlightUser.findOne({email})
    .then(user => {
      if(user.password == password){
        return res.json({ code: 200, message: 'Success' });
      }
      else{
        return res.json({ code: 400, message: 'Wrong email or password' });
      }
      })
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  FlightUser.findByIdAndDelete(req.params.id)
    .then(() => res.json('User deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  FlightUser.findById(req.params.id)
    .then(users => {
      users.firstName = req.body.firstName;
      users.lastName = req.body.lastName;
      users.email = req.body.email;
      users.password = req.body.password;
      users.contact = req.body.contact;

      users.save()
        .then(() => res.json('user updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;