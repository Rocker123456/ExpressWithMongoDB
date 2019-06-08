var express = require('express');
var mongoose = require('mongoose');
//var Course = require('../models/courses.js');

var app = express();

app.use(function(req,res,next)
{
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    express.json();
    // Pass to next layer of middleware
    next();
});

var questionsschema = mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    question : String,
    option1 : String,
    option2 : String,
    option3 : String,
    option4 : String,
    answer: String
});

var Question = mongoose.model('Question',questionsschema);

//Begining of GET section
app.get('/', function(req, res){
    mongoose.connect('mongodb://localhost:27017/QuestionBank',function(err,client){
      if(err){
         console.log(err);
         return;
      }
    });

   res.send("Hello world!123");
});

app.get('/api/questions', function(req, res){
    Question.find().then(questions => {        
        res.status(200).json(questions);
    }).catch(err =>{ 
        console.log(err);
        res.status(500).json({error : err});
    });
 });

 app.get('/api/courses/:id', function(req, res){
     var id = req.params.id;
     //var course = courses.filter(course => course.id === id);
     Question.findById(id).exec().then(result => {
        if(result != null){
            console.log(result);
            res.status(200).send(result);
            }else{
                res.status(404).json({message : "Data does not exist with given id"});
            }
    }).catch(
        err => {console.log(err);
        res.status(500).json({error : err});
        });
 });

//POST section
app.post('/api/questions', (req,res) => {

    //Joi package can be used for input validation.
    //Joi want us to create schema wwith meet your reqiorement and then validate it
    //Formore info see video
// if(req.body.name == null || req.body.name.length < 3 ){
//     res.status(400).send("please enter valid name");
//     return;
// }

// var course = {
//     id : courses.length + 1,
//     name: req.body.name
// }

var question = new Question({   
    _id : new mongoose.Types.ObjectId(),    
    question: req.body.question,
    option1: req.body.option1,
    option2: req.body.option2,
    option3: req.body.option3,
    option4: req.body.option4,
    answer: req.body.answer
});

// courses.push(course);
question.save().then(result => {
    res.status(200).send(result);
}).catch(err =>{ 
    console.log(err);
    res.status(500).json({error : err});
});
});

//PUT section
app.put('/api/courses/:id', (req,res) => {

var newName = req.body.name;
var newPrice = req.body.price;
var id = req.params.id;

Course.update({_id:id},{$set:{name:newName,price:newPrice}}).exec().then(result =>{
    console.log(result);
    res.status(200).json(result);
}
).catch(err => {
    console.log();
    res.status(500).json({error : err});
});

// if(req.body.name == null || req.body.name.length < 3 ){
//     res.status(400).send("please enter valid name");
//     return;
// }

// var course = courses.find(course => course.id === parseInt(req.params.id));

// if(!course){
//     res.status(404).send("Course with given id is not exist");
//     return;
// }

// course.name = name;
// res.send(course);

});

//Delete section
app.delete('/api/courses/:id', (req,res) => {
   
    var id = req.params.id;
    //var course = courses.find(course => course.id === parseInt(req.params.id));
    Course.remove({_id : id}).then(result => {
        if(result != null){
        console.log(result);
        res.status(200).send(result);
        }else{
            res.status(404).json({message : "Data does not exist with given id"});
        }
    }).catch(err =>{ 
        console.log(err);
        res.status(500).json({error : err});
    });
    // if(!course){
    //      res.status(404).send("no course exist with this id");       
    //      return;
    // }

    // var index = courses.indexOf(course);
    // courses.splice(index,1);
    // res.send(courses);
    
    });

//to assign port dynamically
//const port = process.env.PORT || 3000;

app.listen(3000,console.log("listning to port no : 3000")); 