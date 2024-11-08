import { Schema, model } from 'mongoose';

const Cart = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    products: [
      {
        _id: false,
        productId: String,
        quantity: Number,
        price: Number,
        timestamps: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    collection: 'cart',
    // timestamps: true
  }
);

const cartModel = model('Cart', Cart);

export default cartModel;
