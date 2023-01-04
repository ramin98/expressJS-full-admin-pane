let PORT = process.env.PORT || 5000;
const express = require('express');
const app = express();

app.set('views', './views');
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.json());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

let users = []

app.get('/user', function(req, res) {
    res.json(users);
});

let i = 0

app.post('/user', function (req, res) {
  i++
  let obj = {
    id: i,
    username: req.body.username
  }
  users.push(obj);
  res.json(obj);
})

app.delete('/user/:id', function (req, res) {
  const idOfUser = parseInt(req.params.id);
  users = users.filter((user) => user.id !== idOfUser);
  res.json(users);
});

app.put("/user/:id", function (req, res) {
  const idOfUser = parseInt(req.params.id);
  const userIdx = users.findIndex((user) => user.id === idOfUser);

  if (userIdx !== -1) {
    const oldUser = users[userIdx];
    users[userIdx] = { ...oldUser, ...req.body };
    res.json(users[userIdx]);
  } else {
    res.status(404).json();
  }
});

app.listen(PORT, function () {
    console.log("port: " + PORT)
});