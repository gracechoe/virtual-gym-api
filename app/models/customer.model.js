const sql = require("./db.js");

const Customer = function(customer) {
    this.email = customer.email;
    this.first_name = customer.firstName;
    this.last_name = customer.lastName;
    this.subscription_id = customer.subscriptionID;
    this.fitness_level = customer.fitnessLevel;
};

// TODO: store query string elsewhere
Customer.create = (newCustomer, result) => {
    sql.query("INSERT INTO customers SET ?", newCustomer, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created customer: ", { id: res.insertId, ...newCustomer });
        result(null, { id: res.insertId, ...newCustomer });
    });
};

Customer.findById = (customerId, result) => {
    sql.query(`SELECT * FROM customers WHERE id = ${customerId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found customer: ", res[0]);
            result(null, res[0]);
            return;
        }

        // customer does not exist
        result({ kind: "not_found"}, null);
    })
}

module.exports = Customer;