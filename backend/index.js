const express = require('express');
const cors = require('cors');
const app = express();

// const { sequelize } = require('./db/db_test');

app.use(express.json());
app.use(cors());

app.listen(8080, () => {
    console.log("server listening on port 8080");
})

app.get('/', (req, res) => {
    res.json({ status: 'ok', timestamp: Date.now() })
});

// user router
const { User } = require('./db/db_test');
const UserRepository = require('./repositories/UserRepository');
const UserService = require('./services/UserService');
const userRouter = require('./controllers/UserController');
const userRepo = new UserRepository(User);
const userService = new UserService(userRepo);
app.use('/users', userRouter(userService));  


  
// // using 'force: true' if you want to drop the tables and recreate them
// sequelize.sync({ force: true }).then(() => {
//   console.log('Database & tables created!');
// }).catch(err => {
//   console.error('Error creating database tables:', err);
// });
