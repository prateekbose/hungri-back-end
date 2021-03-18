const express = require('express')
const firebase = require('firebase')
const cors = require('cors')
const app = express()

app.use(express.json())
app.use(cors())

var PORT = app.listen(process.env.PORT || 3000)
app.listen(PORT)

const firebaseConfig = YOUR_FIREBASE_CONFIG

firebase.initializeApp(firebaseConfig)

let database = firebase.database()

app.get("/", (req, res) => {
    res.send("New Server running")
})

app.post("/food", (req, res) => {
    console.log(req.body.Phone)
    database.ref(`/food/${req.body.Phone}`).set(req.body, (err) => {
        if(err){
            console.log('Error in writing')
        } else {
            console.log('Data added')
        }
    })
})

app.post("/waste", (req, res) => {
    console.log(req.body.Phone)
    database.ref(`/waste/${req.body.Phone}`).set(req.body, (err) => {
        if(err){
            console.log('Error in writing')
        } else {
            console.log('Data added')
        }
    })
})

app.post("/requests", (req, res) => {
    console.log(`REQUESTS\nPhone: ${req.body.phone}`)
    var data = database.collection('waste').doc(phone).get()
    data += database.collection('food').doc(phone).get()
    console.log(data)
})