var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.json());


console.log('whatever');

app.get('/', function(req, res, next) {
  res.send('Hello!');
})

// CRUD create read update destroy
var movies = [];
var nextId = 0;

// 1. Merge an Object in a put request to update a movie
// 2. Make sure that a new movie is properly formatted
//3. Make sure that every value in a new movie is the right data type
 //4. Look for a movie by name.
app.post('/api/movies', function(req, res) {
  // take new movie add it to collection
  // with a post and a put you can send a body
  req.body.id = ++nextId;
  movies.push(req.body);
  res.status(200).send('Ok');
})

app.get('/api/movies', function(req, res) {
  res.status(200).json(movies);
})

app.get('/api/movies/:id', function(req, res){
  var target = req.params.id;

  for (var i = 0; i < movies.length; i++) {
    if (movies[i].id == target) {
  var movie = movies[i];
      break;
    }
  }

  if (movie) {
    return res.status(200).json(movie);
  }else {
    return res.status(404).send('Movie not found!');
  }
})

app.put('/api/movies/:id', function (req, res){
  // find the movie that matches req.params.id
  //

  for(var i = 0; i < movies.length; i++){
    if (movies[i].id == req.params.id) {
      movies[i].rating = req.body.newRating
      break;
    }
  }
  res.status(200).send('ok');
})

app.delete('/api/movies/:id', function (req, res){
  for(var i = 0;i < movies.length; i++){
    if (movies[i].id == req.params.id){
      movies.splice(i, 1)
    }
  }
})

app.listen(3000, function(){
  console.log('Listening on 3000')
})
