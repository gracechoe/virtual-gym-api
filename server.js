const express = require("express");
const bodyParser = require("body-parser");

const app = express();

// parse requests of content-type: application/json
app.use(bodyParser.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.json({ message: "Virtual Gym Web App API" });
});

require("./app/routes/customer.routes.js")(app);

app.listen(3000, () => {
    console.log("Server is running on port 3000");
})