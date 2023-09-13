const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const dotenv = require('dotenv')


const app = express();
require('dotenv').config()
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const port = process.env.PORT
const url = process.env.URL


mongoose.connect(url)
    .then(console.log("Connected"))
    .catch((err) => {
        console.log(err);
    })

const patientSchema = mongoose.Schema({

    name: String,
    from: String,
    to: String
});

const patientName = mongoose.model("patientTable", patientSchema)

app.get('/patients', async (req, res) => {
    const patients = await (patientName.find({}))
    res.send(patients)
});


// Find a task by name
app.get('/find/:day', async (req, res) => {
    const from = req.params.day;
  
    try {
      const result = await patientName.find({ from: from });
      res.json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred.' });
    }
  });
  



app.post('/savePatient', async (req, res) => {
    const { name, from, to } = req.body;
    const saveData = await (patientName.create({ name, from, to }))
    res.send(saveData)
});

app.put('/updatePatient/:id', async (req, res) => {
    const { id } = req.params
    const { name, from, to } = req.body;
    const saveData = await (patientName.findByIdAndUpdate(id, { name, from, to }))
    res.send(saveData)
});
// app.get('/updatePatient/:id', async (req, res) => {
//     const { id } = req.params
//     const { name, from, to } = req.body;
//     const saveData = await (patientName.find(id))
//     res.send(saveData)
// });

app.delete('/deletePatient/:id', async (req, res) => {
    const { id } = req.params
    const { name, from, to } = req.body;
    const saveData = await (patientName.findOneAndDelete(id))
    res.send("Delete")
});







app.listen(port, () => {
    console.log(`${port}`);
})