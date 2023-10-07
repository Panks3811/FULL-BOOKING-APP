const express = require('express');
const app = express();

var mysql=require('mysql');
var bodyParser=require("body-parser");

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());


app.set('view engine','ejs');

// create connection with mysql
var conn=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"root123",
    database:"node"
})

conn.connect(function(err){
    if(err) throw err;
    console.log("connection successful")
})
// Define a route
app.get('/', function (req, res) {

  res.render('insert');

});

// to insert the values in the database and also in table 
app.post('/insert', function(req,res){

    var name=req.body.name;
    var email=req.body.email;
    var password=req.body.password;

    var sql=`insert into users(user_name,user_email,user_password) values('${name}','${email}','${password}')`;

    conn.query(sql,function(err,results){
    if(err)  throw err;

    res.send('<h1> Data Sent....</h1>');

    });
})

// to show the data in the table with new route
app.get('/show',function(req,res){

  var sql ="select * from users";

  conn.query(sql,function(err,results){

    if(err)  throw err;

    res.render('show',{users:results});
  })
});


// to delete the data from table

app.get('/delete/:id',function(req,res){

  var id=req.params.id;

  var sql=`delete from users where user_id='${id}'`;

  conn.query(sql,function(err,results){
    if (err)   throw err;

    res.redirect('/show');

  })

})

// to edit the user details in the table and also in databse
app.get('/edit/:id',function(req,res){

  var id=req.params.id;

  var sql=`select * from users where user_id='${id}'`;

  conn.query(sql,function(err,results){
    if (err)   throw err;

    res.render('edit', {users:results});

  })

})

// to update the values of users data 
app.post('/update/:id',function(req,res){

  var id= req.params.id;

  var name=req.body.name;
  var email=req.body.email;
  var password =req.body.password;

  var sql=`update users set user_name='${name}',user_email='${email}',user_password='${password}'  where user_id='${id}' `;

  conn.query(sql,function(err,results){
    if (err)   throw err;

    res.redirect('/show');

  })

})
// Start the server
const server = 3000;
app.listen(server, () => {
  console.log(`Server is running on server ${server}`);
});
