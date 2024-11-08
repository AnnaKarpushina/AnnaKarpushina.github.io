import express from 'express';
import Product from '../models/product';

const router = express.Router();

/**
 * @swagger
 * /upload/:
 *   post:
 *     summary: Create Lamp
 *     tags: 
 *       - Upload
 *     parameters:
 *       - in: body
 *         name: data
 *         required: true
 *         schema:
 *           type: object
 *           required: true
 *           properties:
 *             name:
 *               type: string
 *             price:
 *               type: integer
 *             amount:
 *               type: integer
 *             info:
 *               type: string
 *             productImage:
 *               type: string
 *     responses:
 *       200:
 *         description: A successful response
 */

router.post('/', async (req, res) => {
  try {
    const {
      body: { name, price, amount, info, productImage },
    } = req;

    const item = new Product({
      name: name,
      price: price,
      amount: amount,
      info: info,
      productImage: productImage,
    });
    
    item.save().then(() => {
      res.status(201).send({
        _id: item._id,
        name: item.name,
        price: item.price,
        amount: item.amount,
        info: item.info,
        productImage: item.productImage,
      });
    });
  } catch (err) {
    res.status(400).send({ err: 'failed to create product' });
  }
});

/**
 * @swagger
 * /upload/:
 *   patch:
 *     summary: Update Lamp
 *     tags: 
 *       - Upload
 *     parameters:
 *       - in: body
 *         name: data
 *         required: true
 *         schema:
 *           type: object
 *           required: true
 *           properties:
 *             id:
 *               type: string
 *             name:
 *               type: string
 *             price:
 *               type: integer
 *             amount:
 *               type: integer
 *             info:
 *               type: string
 *             productImage:
 *               type: string
 *     responses:
 *       200:
 *         description: A successful response
 */

router.patch('/', async (req, res) => {
  try {
    const {
      body: { id, name, price, amount, info, productImage },
    } = req;

    const editProduct = {
      name: name,
      price: price,
      amount: amount,
      info: info,
      productImage: productImage,
    };

    await Product.updateOne({ _id: id }, editProduct);
    res.status(200).send();
  } catch (err) {
    res.status(400).send({ err: 'failed to update product' });
  }
});

export default router;
