const Joi = require('joi');

// Schema for customer creation
const customerSchema = Joi.object({
    name: Joi.string().required(),
    address: Joi.string().required(),
    gstin: Joi.string().required(),
    stateCode: Joi.string().required(),
    email: Joi.string().email().optional(),
    phone: Joi.string().optional(),
});

// Schema for product creation
const productSchema = Joi.object({
    description: Joi.string().required(),
    sacCode: Joi.string().required(),
    rate: Joi.number().required(),
    gstRate: Joi.number().required(),
});

// Schema for invoice creation
const invoiceSchema = Joi.object({
    customerId: Joi.string().required(),
    invoiceDate: Joi.date().required(),
    dueDate: Joi.date().required(),
    products: Joi.array()
        .items(
            Joi.object({
                productId: Joi.string().required(),
                quantity: Joi.number().required(),
            })
        )
        .required(),
    referencePONumber: Joi.string().optional(),
    modeOfDispatch: Joi.string().valid('Road', 'Rail', 'Air').optional(),
    vehicleNumber: Joi.string().optional(),
});

module.exports = { customerSchema, productSchema, invoiceSchema };
