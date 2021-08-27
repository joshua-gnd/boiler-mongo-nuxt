const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

// middleware
app.use(bodyParser.json());
app.use(cors());

// const posts = require('./routes/api/posts')
// const todos = require('./routes/api/todos')
const tasks = require('./routes/api/tasks')
const dates = require('./routes/api/dates')
const ratings = require('./routes/api/ratings')

// app.use('/api/posts', posts)
// app.use('/api/todos', todos)
app.use('/api/tasks', tasks)
app.use('/api/dates', dates)
app.use('/api/ratings', ratings)

const port = process.env.PORT || 3001;

app.listen(port, () => console.log(`server started on ${port}`))

// connect db
const URI =
'mongodb+srv://admin:password100@cluster0.ssyro.mongodb.net/Test?retryWrites=true&w=majority';

const connectDB = async () => {
  const client = await mongoose.connect(URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true
  });
//   console.log(client.db('Test').collection('posts'));
//   console.log(client);
};

connectDB()