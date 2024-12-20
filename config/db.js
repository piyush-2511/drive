const mongoose = require('mongoose')

function connectTodb(){
  mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log('Connected To Database')
  })
}

module.exports = connectTodb;