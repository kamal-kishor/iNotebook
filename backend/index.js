const connectToMongo = require("./db");
const express = require("express");
const cors = require("cors");

// app.use(cors());
connectToMongo();
const app = express();
const port = 3030;

//To Use Request.js
app.use(cors());
app.use(express.json());

//Available Route
app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));
// app.get("/", (req, res) => {
//   res.send("Hello KAMAL !");
// });
app.listen(port, () => {
  console.log(`iNoteBook Backend listening on port http://localhost:${port}`);
});
