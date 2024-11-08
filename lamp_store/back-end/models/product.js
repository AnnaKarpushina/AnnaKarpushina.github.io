import { Schema, model } from 'mongoose';

const Product = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    productImage: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    info: {
      type: String,
      required: true,
    },
  },
  { collection: 'products' }
);

const productModel = model('Product', Product);

export default productModel;
