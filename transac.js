const bodyParser= require('body-parser')
var fs = require('fs');
var express = require("express")
var app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.post("/transactions", function(req, res) {
  const transactions_exemple = {
    action: req.body.action,
    name: req.body.name
  }
  console.log("test")
  console.log(transactions_exemple)
  if( req.body.action=="Ajout"){
    var read_string=fs.readFile('test.txt','utf-8',function(err,data){
      if(err){
        return console.error(err);
      }
      console.log(data);
    fs.writeFile('test.txt',data+"\n [AJOUT] "+req.body.name,function(err,data){
      if(err){
        return console.error(err);
      }
      console.log('file is written asynchronously');
    })
  })
  res.send("Sucess")
  }
  else if (req.body.action=="Delete"){
    var read_string=fs.readFile('test.txt','utf-8',function(err,data){
      if(err){
        return console.error(err);
      }
      console.log(data);
    fs.writeFile('test.txt',data+"\n [DELETE] "+req.body.name,function(err,data){
      if(err){
        return console.error(err);
      }
      console.log('file is written asynchronously');
    })
  })
  res.send("Sucess")
  }
  else{
    res.send("erreur")
  }
  })


  app.listen(3000, () => {
    console.log("En attente de requêtes...")
  })


