import express from 'express';
import Cart from '../models/cart';
import Product from '../models/product';

const router = express.Router();

function success(res, payload) {
  return res.status(200).json(payload);
}

/**
 * @swagger
 * /cart/{id}:
 *   get:
 *     tags:
 *       - Cart
 *     summary: Get user cart
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A successful response
 */

router.get('/:id', async (req, res) => {
  try {
    const userCart = await Cart.findOne({ userId: req.params.id });
    if (userCart) {
      return success(res, userCart);
    } else {
      res.send({});
    }
  } catch (err) {
    res.status(400).send({ msg: 'failed to get userCart' });
  }
});

/**
 * @swagger
 * /cart/{userId}/{productId}:
 *   delete:
 *     tags: 
 *       - Cart
 *     summary: Delete product by id from cart
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A successful response
 */

router.delete('/:userId/:productId', async (req, res) => {
  const {
    params: { userId, productId },
  } = req;
  // const stock = await Product.findOne({ _id: productId })
  // const changeAmount = stock.amount + +quantity

  await Cart.updateOne({ userId }, { $pull: { products: { productId } } });
  // await Product.updateOne({ _id: productId }, { amount: changeAmount })
  const updateCart = await Cart.findOne({ userId: userId });
  res.status(200).send(updateCart);
});

/**
 * @swagger
 * /cart/:
 *   patch:
 *     summary: Add product to cart
 *     tags: 
 *       - Cart
 *     parameters:
 *       - in: body
 *         name: data
 *         required: true
 *         schema:
 *           type: object
 *           required: true
 *           properties:
 *             userId:
 *               type: string
 *             productId:
 *               type: string
 *             quantity:
 *               type: integer
 *             price:
 *               type: integer
 *     responses:
 *       200:
 *         description: A successful response
 */


router.patch('/', async (req, res) => {
  try {
    const {
      body: { userId, productId, quantity, price },
    } = req;

    const stockProduct = await Product.findOne({ _id: productId });
    const findUser = await Cart.findOne({ userId });

    if (stockProduct.amount - quantity >= 0) {
      // const newAmount = stockProduct.amount - quantity

      if (findUser) {
        const findUserProducts = await Cart.findOne({ userId, 'products.productId': productId });

        if (findUserProducts) {
          const findProduct = findUserProducts.products.find(
            (item) => item.productId === productId
          );

          if (findProduct && findProduct.quantity + quantity <= 3) {
            try {
              // await Product.updateOne({ _id: productId }, { amount: newAmount })
              await Cart.updateOne(
                { userId, 'products.productId': productId },
                { $inc: { 'products.$.quantity': quantity } }
              );
              const findUpdateUserId = await Cart.findOne({ userId });
              res.status(200).send(findUpdateUserId);
            } catch (err) {
              res.status(400).send({ err: 'failed to add new count' });
            }
          } else {
            res
              .status(400)
              .send({ msg: 'Больше 3-х экземпляров одной лампы нельзя иметь в корзине' });
          }
        } else {
          try {
            // await Product.updateOne({ _id: productId }, { amount: newAmount })
            const newProduct = { productId: productId, quantity: quantity, price: price };
            await Cart.updateOne({ userId }, { $push: { products: newProduct } });
            const updateProducts = await Cart.findOne({ userId });
            res.status(200).send(updateProducts);
          } catch (err) {
            console.log(err);
            res.status(400).send({ err: 'failed to add more product' });
          }
        }
      } else {
        // await Product.updateOne({ _id: productId }, { amount: newAmount })
        const userCart = new Cart({
          userId: userId,
          products: {
            productId: productId,
            quantity: quantity,
            price: price,
          },
        });
        userCart.save().then((newUser) => {
          res.status(201).send({
            userId: newUser.userId,
            products: newUser.products,
          });
        });
      }
    }
  } catch (err) {
    res.status(400).send({ err: 'failed to add to cart' });
  }
});

/**
 * @swagger
 * /cart/:
 *   post:
 *     summary: Add cart from LocalStorage to user when you login
 *     tags:
 *       - Cart
 *     parameters:
 *       - in: body
 *         name: data
 *         required: true
 *         schema:
 *           type: object
 *           required: true
 *           properties:
 *             userId:
 *               type: string
 *             localCart:
 *               type: object
 *               properties:
 *                 productId:
 *                   type: string
 *                 price:
 *                   type: integer
 *                 quantity:
 *                   type: integer
 *     responses:
 *       200:
 *         description: A successful response
 */

router.post('/', async (req, res) => {
  const {
    body: { userId, localCart },
  } = req;

  const newLocalCart = localCart.map((item) => {
    return { productId: item.productId, price: +item.price, quantity: +item.quantity };
  });

  const userCart = await Cart.findOne({ userId });
  if (userCart) {
    const editCart = localCart.concat(userCart.products);

    const newEditCart = editCart.map((item) => {
      return { productId: item.productId, price: +item.price, quantity: +item.quantity };
    });

    const cart = [
      ...new Map(newEditCart.map((obj) => [JSON.stringify(obj.productId), obj])).values(),
    ];

    await Cart.updateOne({ userId }, { products: cart });
    const newCart = await Cart.find({ userId });
    res.status(200).send(newCart);
  } else {
    if (localCart.length) {
      const userCart = new Cart({
        userId: userId,
        products: newLocalCart,
      });
      userCart.save().then(res.status(201).send(newLocalCart));
    } else {
      res.send();
    }
  }
});

export default router;
