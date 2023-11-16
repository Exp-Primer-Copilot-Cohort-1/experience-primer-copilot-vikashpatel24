// create web server
var express = require('express');
var app = express();

// serve static files from public directory
app.use(express.static('public'));

// parse incoming request bodies
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// connect to mongodb
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/comments');

// define schema
var CommentSchema = new mongoose.Schema({
    name: String,
    comment: String
});

// compile schema into model
var Comment = mongoose.model('Comment', CommentSchema);

// create a new comment document
app.post('/comments', function(req, res) {
    var comment = new Comment(req.body);
    comment.save(function(err) {
        if (err) throw err;
        res.send('Comment saved successfully');
    });
});

// retrieve all comments
app.get('/comments', function(req, res) {
    Comment.find(function(err, comments) {
        if (err) throw err;
        res.send(comments);
    });
});

// start server on port 3000
app.listen(3000, function() {
    console.log('Server listening on port 3000');
});