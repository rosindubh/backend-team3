//phil welsby - 22 sept 2021 - server.js file

require("./db/connection");
const express = require("express");
const cors = require("cors");
const app = express();
const helloRouter = require("./guitar/guitar.routes")
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.use(helloRouter)

app.listen(port, () => {
    console.log(`Server listening on port ${port}...`);
});

