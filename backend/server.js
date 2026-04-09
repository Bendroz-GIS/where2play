
const express = require('express');
const path = require("path");
const dotenv = require("dotenv");
const coockieParser = require("cookie-parser");

dotenv.config();
const api = require("./routes/api/index");

const app = express();

// Dev only
if (process.env.NODE_ENV === 'development') {
  const cors = require('cors');
  const corsOption = {credentials: true, origin: 'http://localhost:5173'};
  app.use(cors(corsOption));
}

app.use(express.json());
app.use(coockieParser());

app.use("/api", api);

if (process.env.NODE_ENV === 'production') {
  const distPath = path.join(__dirname, '../frontend/dist'); 
  app.use(express.static(distPath))
}

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Serveur : http://localhost:${port}`);
});