import User from '../models/user';
import express from 'express';
import jwt from 'jsonwebtoken';
import checkUser from '../middleware/userMiddle';
import bcrypt from 'bcryptjs';

const router = express.Router();

/**
 * @swagger
 * /users/token:
 *   post:
 *     summary: Get user by token
 *     tags: 
 *       - Users
 *     parameters:
 *      - in: header
 *        name: Token
 *        schema:
 *          type: string
 *          format: uuid
 *     responses:
 *       200:
 *         description: A successful response
 */

router.post('/token', checkUser, async (req, res) => {
  if (req.decodedUser) {
    const checkUserData = await User.findOne({ email: req.decodedUser.email });

    if (checkUserData) {
      const user = {
        _id: checkUserData._id,
        name: checkUserData.name,
        email: checkUserData.email,
        isAdmin: checkUserData.isAdmin,
      };
      res.send({ user });
    } else {
      const empty = false;
      res.send({ empty });
    }
  } else {
    res.status(401).send({ msg: 'Invalid Token' });
  }
});

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Login User
 *     tags: 
 *       - Users
 *     parameters:
 *       - in: body
 *         name: data
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             email:
 *               type: string
 *             password:
 *               type: string
 *     responses:
 *       200:
 *         description: A successful response
 */

router.post('/login', async (req, res) => {
  const {
    body: { email, password },
  } = req;

  const saveUser = await User.findOne({
    email: email,
  });

  if (saveUser) {
    const checkPassword = bcrypt.compareSync(password, saveUser?.password);
    if (checkPassword) {
      res.send({
        _id: saveUser.id,
        name: saveUser.name,
        email: saveUser.email,
        isAdmin: saveUser.isAdmin,
        token: jwt.sign({ saveUser }, '123', { expiresIn: '48h' }),
      });
    } else {
      res.status(401).send({ msg: 'Invalid Email or Password' });
    }
  } else {
    res.status(401).send({ msg: 'Invalid Email or Password' });
  }
});

/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: Register User
 *     tags: 
 *       - Users
 *     parameters:
 *       - in: body
 *         name: data
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *             email:
 *               type: string
 *             password:
 *               type: string
 *     responses:
 *       200:
 *         description: A successful response
 */

router.post('/register', async (req, res) => {
  const {
    body: { name, email, password },
  } = req;

  const checkEmail = await User.findOne({
    email: email,
  });
  if (checkEmail) {
    res.status(401).send({ msg: 'Invalid Email' });
  } else {
    const user = new User({
      name: name,
      email: email,
      password: bcrypt.hashSync(password, 10),
    });
    const saveUser = await user.save();
    if (saveUser) {
      res.send({
        _id: saveUser.id,
        name: saveUser.name,
        email: saveUser.email,
        isAdmin: saveUser.isAdmin,
        token: jwt.sign({ saveUser }, '123', { expiresIn: '48h' }),
      });
    }
  }
});

export default router;
