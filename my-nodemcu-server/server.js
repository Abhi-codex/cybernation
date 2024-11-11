const express = require('express');
const bodyParser = require('body-parser');
const Rpm = require('./model/rpmmodel');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

mongoose.connect("mongodb+srv://Registration:2111087@cluster0.wexksa1.mongodb.net/icn?retryWrites=true&w=majority")
  .then(() => console.log('connected....'))
  .catch((err) => console.log(err));

app.post('/endpoint', async (req, res) => {
  try {
    const previousData = await Rpm.find();
    const totalRpm = previousData.reduce((sum, entry) => sum + entry.rpm, 0) + req.body.rpm;

    let ideltime = req.body.ideltime || 0;
    if (req.body.rpm === 0) {
      ideltime += req.body.runtime;
    }

    const totaltime = req.body.runtime - ideltime;

    const newRpm = new Rpm({
      date: req.body.date,
      time: req.body.time,
      rpm: req.body.rpm,
      runtime: req.body.runtime,
      rpms: totalRpm,
      totaltime: totaltime,
      ideltime: ideltime
    });

    const result = await newRpm.save();
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get('/data', async (req, res) => {
  try {
    const data = await Rpm.find(); 
    res.status(200).json(data);    
  } catch (error) {
    res.status(500).json({ error: error.message }); 
  }
});


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});