import express from 'express';

let app = express();

app.use(express.static('app'));
app.get('/', function(req, res) {
  res.sendFile(__dirname + '/app/index.html');
});

app.listen(8000, function() {
  console.log('Listening on port 8000');
}); //the port you want to use
