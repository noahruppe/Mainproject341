// Noah Ruppe created this page

const validator = require('../helpers/validate');
const saveBuyer = async (req, res, next) => {
    const validationRule = {
        "firstName": "required|string",
        "lastName": "required|string",
        "userName": "required|string|min:3"
    };

    await validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(400)
                .send({
                    success: false,
                    message: 'Validation failed',
                    data: err
                });
        } else {
            next();
        }
    }).catch( err => console.log(err))
};



const saveSeller = async (req, res, next) => {
    const validationRule = {
        "firstName": "required|string",
        "lastName": "required|string",
        "userName": "required|string|min:3"
    };

    await validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(400)
                .send({
                    success: false,
                    message: 'Validation failed',
                    data: err
                });
        } else {
            next();
        }
    }).catch(err => {
        console.error(err);
        res.status(500).send({
            success: false,
            message: 'Server error during validation',
            error: err
        });
    });
};


const saveProduct = async (req, res, next) => {
    const validationRule = {
        "productName": "required|string|min:2",
        "description": "required|string|min:5",
        "price": "required|numeric|min:0.01"
    };

    await validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(400)
                .send({
                    success: false,
                    message: 'Validation failed',
                    data: err
                });
        } else {
            next();
        }
    }).catch(err => {
        console.error(err);
        res.status(500).send({
            success: false,
            message: 'Server error during validation',
            error: err
        });
    });
};

const saveOrder = async (req, res, next) => {
    const validationRule = {
        "quantity": "required|integer|min:1"
    };

    await validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(400)
                .send({
                    success: false,
                    message: 'Validation failed',
                    data: err
                });
        } else {
            next();
        }
    }).catch(err => {
        console.error(err);
        res.status(500).send({
            success: false,
            message: 'Server error during validation',
            error: err
        });
    });
};

const savePayment = async (req, res, next) => {
    const validationRule = {
        "cardInfo": "required|regex:^\\d{16}$"
    };

    await validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(400)
                .send({
                    success: false,
                    message: 'Validation failed',
                    data: err
                });
        } else {
            next();
        }
    }).catch(err => {
        console.error(err);
        res.status(500).send({
            success: false,
            message: 'Server error during validation',
            error: err
        });
    });
};


module.exports = {
    saveBuyer,
    saveSeller,
    saveProduct,
    saveOrder,
    savePayment
};