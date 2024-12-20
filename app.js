const express = require('express')
const app = express();
const userRouter = require('./routes/user.routes.js')
const dotenv = require('dotenv')
dotenv.config();
const connectTodb = require('./config/db.js')
connectTodb();
const cookieParser = require('cookie-parser')
const indexRouter = require('./routes/index.routes.js')


app.set('view engine', 'ejs')

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/user',userRouter)
app.use('/',indexRouter)

app.listen(3000,()=>{
  console.log('Server is listening on https://localhost:3000')
})