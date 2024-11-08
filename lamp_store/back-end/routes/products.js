import express from 'express';
import Product from '../models/product';

const router = express.Router();

function success(res, payload) {
  return res.status(200).json(payload);
}

/**
 * @swagger
 * /products/:
 *   get:
 *     summary: Get all products
 *     tags: 
 *       - Products
 *     responses:
 *       200:
 *         description: A successful response
 */

router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    return success(res, products);
  } catch (err) {
    res.status(400).send({ err: 'failed to get products' });
  }
});

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Get one product
 *     tags: 
 *       - Products
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Numeric ID of the product to get
 *     responses:
 *       200:
 *         description: A successful response
 */

router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    return success(res, product);
  } catch (err) {
    res.status(400).send({ err: 'failed to get products' });
  }
});

/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     tags: 
 *       - Products
 *     summary: Delete one product
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Numeric ID of the product to delete
 *     responses:
 *       200:
 *         description: A successful response
 */

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Product.findByIdAndRemove(id);
    const products = await Product.find();
    return success(res, products);
  } catch (err) {
    res.status(400).send({ err: 'failed to delete products' });
  }
});

export default router;
