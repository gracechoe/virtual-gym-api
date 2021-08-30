const Customer = require("../models/customer.model.js");

// Create and Save a new Customer
exports.create = (req, res) => {
    if (!req.body) { // validate request
        res.status(400).send({
            message: "Content cannot be empty!"
        });
    }

    console.log(req.body);

    const customer = new Customer({
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        subscriptionID: req.body.subscriptionID,
        fitnessLevel: req.body.fitnessLevel
    });

    Customer.create(customer, (err, data) => {
        if (err) {
            res.status(500).send({
                message: 
                    err.message || "Some error occured while creating a customer"
            });
        } else {
            res.send(data);
        }
    })
};

// Retrieve a single Customer by ID
exports.findOne = (req, res) => {
    Customer.findById(req.params.customerId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Could not find Customer with id ${req.params.customerId}.`
                });
            } else {
                res.status(500).send({
                    message: `Error retrieving Customer with id ${req.params.customerId}`
                })
            }
        } else {
            res.send(data);
        }
    });
};