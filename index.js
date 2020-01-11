const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const db = require('./queries')
//
//express validator package
//const { check, validationResult } = require('express-validator');
//--exprss basicauth
var basicAuth = require('basic-auth')
//input validation
const { check, validationResult } = require('express-validator');
const port =9000

//--basic auth fun
var auth = function (req, res, next) {
  var user = basicAuth(req);
  if (!user || !user.name || !user.pass) {
    res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
    res.sendStatus(401);
    return;
  }
  if (user.name === 'raj' && user.pass === '123') {
    next();
  } else {
    res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
    res.sendStatus(401);
    return;
  }
}//

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/',(request,response)=>{response.json({info:'node.js,exprss,and postgres api'})})
app.get('/ss',(request,response)=>{response.json({info:'node.js,exprss,and postgres api'})})
app.get('/a',(request,response)=>{response.json({info:'hey its a'})})
//
app.get('/users',auth, db.getUsers);
app.get('/users/:id',auth, db.getUserById);



app.get('/RESTful',auth, db.RESTful);



//
app.post('/create/user', [check('name').isAlpha().withMessage('Must be only alphabetical chars')
  .isLength({ min:6})
  .withMessage('Must be at least 6 chars long'),
  check('email').isEmail() 
],auth, db.createUser)
//
app.post('/users',auth,  db.postview);
app.post('/users/:id',auth,  db.postviewid);
//
app.put('/users/:id',auth,  db.updateUser)
app.delete('/users/:id',auth,  db.deleteUser)
//
app.listen(port,()=>{	console.log(`app running on port${port}.`)
})
