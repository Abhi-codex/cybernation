const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(express.json()); 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

let sensorData = [];

app.post('/endpoint', (req, res) => {
  data = req.body;
  sensorData.push(data)
  console.log(data);
  res.send('Data received');
});

app.get('/data', (req, res) => {
  res.json(sensorData);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
