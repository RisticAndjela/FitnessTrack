const express = require('express');
const cors = require('cors');
const app = express();

// const { sequelize } = require('./db/db_test');
const userController = require('./controllers/UserController')

app.use(express.json());
app.use(cors());

app.use('/users', userController);  

app.listen(8080, () => {
    console.log("server listening on port 8080");
})


// // using 'force: true' if you want to drop the tables and recreate them
// sequelize.sync({ force: true }).then(() => {
//   console.log('Database & tables created!');
// }).catch(err => {
//   console.error('Error creating database tables:', err);
// });
