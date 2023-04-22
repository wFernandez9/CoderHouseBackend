const mongoose = require('mongoose');

const cartCollection = 'carts'

const cartSchema = new mongoose.Schema({
    products: [

        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product'
            },
            quantity: {
                type: String,
                default: 1
            }
        },
    ]

})

cartSchema.pre('find', function () {
    this.populate('products.product')

})

const Cart = mongoose.model('Cart', cartSchema, cartCollection);

module.exports = Cart;