const express = require('express');
const knex = require('knex');

const app = express();

app.get('/genres', function(req, res) {
  let connection = knex({
    client: 'sqlite3',
    connection: {
      filename: './database.sqlite'
    }
  });

  // SELECT * FROM genres
  let promise = connection.select().from('genres');
  promise.then(function(genres) {
    // success
    res.send(genres);
  }, function() {
    // failed
    res.json({
      error: 'Something went wrong'
    })
  })
})

app.get('/genres/:id', function(req, res) {
  let connection = knex({
    client: 'sqlite3',
    connection: {
      filename: './database.sqlite'
    }
  });

  let id = req.params.id;
  let promise = connection
                  .select()
                  .from('genres')
                  .where('GenreId', id)
                  .first();
  promise.then(function(genre) {
    res.json(genre);
  }, function() {
    res.json('Error');
  })
})

const port = process.env.PORT || 8000;
app.listen(port, function() {
  console.log('listening on ' + port);
})