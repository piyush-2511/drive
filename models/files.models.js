const mongoose = require('mongoose')

const fileSchema = new mongoose.Schema({
  customPath:{
    type : String,
    required : [true, 'Originalname is required']
  },
  user : {
    type : mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required : [true, 'Originalname is required']
  },
  originalname : {
    type : String,
    required : [true, 'Originalname is required']
  }
})

const fileModel = mongoose.model('file',fileSchema)

module.exports = fileModel;

