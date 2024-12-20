const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username : {
    type : String,
    required: true,
    trim : true,
    lowercase : true,
    unique : true,
    minlenght : [3,'Username must be at least of 3 characters']
  },
  email : {
    type : String,
    required : true,
    trim : true,
    lowercase : true,
    unique : true,
    minlenght : [13, 'Email must be of at least of 13 characters']
  },
  password : {
    type : String,
    required : true,
    trim : true,
    minlenght : [5, 'Password must be of at least of 13 characters']
  }
});


const user = mongoose.model('user',userSchema)

module.exports = user;

