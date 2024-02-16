const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const formidableMiddleware = require('express-formidable-v2');

const app = express()
app.use(express.json())
app.use(cors())
app.use(formidableMiddleware());


app.use('/auth', require('./Routers/UserRouters'))
app.use('/clinResyroutes' , require ('./Routers/clinResyroutes'))
app.use('/DriversRating' , require ('./Routers/DriversRatingRouters'))
app.use('/Drivers' , require ('./Routers/DriversRouters'))
app.use('/Ratingsrot' , require ('./Routers/RatingsrotRouters'))
app.use('/auth/restau' , require ('./Routers/RestoRouters'))
app.use('/Track' , require ('./Routers/TrackRouters'))
app.use('/Resrevation' , require('./Routers/Resrevationroutes'))


const connectdb = async () => {
    try {
        await mongoose.connect("mongodb+srv://abdell:gomycode@cluster0.viosbka.mongodb.net/restaurants?retryWrites=true&w=majority").then(() => console.log("db connected"))

    } catch (err) {
        console.log(err)
    }
}


connectdb()

app.listen(4000, () => {
    console.log("Server Running")
})
       