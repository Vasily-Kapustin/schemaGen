# schemaGen
A node plugin to allow for fast, streamlined and automated form creation

#Public files
schemaGen .js and .css
These files are not neccessary to the functionality of the formGenerator, they allow for the functionality of the date picker and the form data collector.

#Server plugin files
formGenerator.js

#Tutorial
Note the current build is designed to work with Express, Mongoose and Handlebars.

There are 3 steps:
1. Initialize schemaGen into a handleBars helper
2. Set up Super Schmea and Super Set
3. Add schema to handleBars

Step 1.
var schemaGen = require('./config/formGenerator');
var hbs = require('hbs');

hbs.registerHelper('schemaForm', function (model,set,url) {
  var str = new hbs.SafeString(schemaGen.buildForm(model,set,url));
  return str;
});

Step 2.
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var schemaGen = require('../config/formGenerator');

var superSchema = {
    email: [{type: String, required: true},{inputType:'email',label:'Email Address'}],
    password: [{type: String, required: true},{inputType:'password',label:'Password'}]
}
var superSets = {
    signin:[{data:'settings',buttonLabel:'Sign In'},{data:'email'},{data:'password'}]
}
var schema = new Schema(schemaGen.schemaGen("users",superSchema,superSets));

Step 3.

{{'schemaForm' "users" "signin" "/signin"}}
