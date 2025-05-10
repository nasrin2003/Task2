const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

const employeeRoutes = require('./routes/employeeRoutes');

app.use(cors());
app.use(bodyParser.json());

app.use(employeeRoutes);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
