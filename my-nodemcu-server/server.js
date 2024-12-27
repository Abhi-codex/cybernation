const express = require('express');
const bodyParser = require('body-parser');
const Rpm = require('./model/rpmmodel');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

mongoose.connect("mongodb+srv://Registration:2111087@cluster0.wexksa1.mongodb.net/update?retryWrites=true&w=majority")
  .then(() => console.log('connected....'))
  .catch((err) => console.log(err));

app.post('/endpoint', async (req, res) => {
  try {

    const newRpm = new Rpm({
      moisture1: req.body.moisture1,
      moisture2: req.body.moisture2,
      moisture3: req.body.moisture3,
      moisture4: req.body.moisture4,
      waterVolume: req.body.waterVolume,
      temperature: req.body.temperature,
      humidity: req.body.humidity,
      pressure: req.body.pressure,
      airFlow: req.body.airFlow,
      waterLevel: req.body.waterLevel
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

app.post('/relaySwitch', async (req, res) => {
  try {
    const { relaySwitch } = req.body;
    if (typeof relaySwitch !== 'number' || ![0, 1].includes(relaySwitch)) {
      return res.status(400).json({ error: 'Invalid input for relaySwitch. Must be 0 or 1.' });
    }
    const relayData = {
      relaySwitch,
      timestamp: new Date()
    };
    res.status(200).json(relayData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/solenoidValve', async (req, res) => {
  try {
    const { solenoidValve } = req.body;
    if (typeof solenoidValve !== 'number' || ![0, 1].includes(solenoidValve)) {
      return res.status(400).json({ error: 'Invalid input for solenoidValve. Must be 0 or 1.' });
    }
    const solenoidData = {
      solenoidValve,
      timestamp: new Date()
    };
    res.status(200).json(solenoidData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});