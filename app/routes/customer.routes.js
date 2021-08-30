module.exports = app => {
    const customers = require("../controllers/customer.controller.js");

    app.post("/customers", customers.create);

    app.get("/customers/:customerId", customers.findOne);
}