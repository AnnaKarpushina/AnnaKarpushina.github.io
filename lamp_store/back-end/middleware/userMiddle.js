import jwt from 'jsonwebtoken';

export default function checkUser(req, res, next) {
  const token = req.headers.token;
  jwt.verify(token, '123', (err, verifiedJWT) => {
    if (verifiedJWT) {
      req.decodedUser = {
        _id: verifiedJWT.saveUser._id,
        name: verifiedJWT.saveUser.name,
        email: verifiedJWT.saveUser.email,
        isAdmin: verifiedJWT.saveUser.isAdmin,
      };
    } else {
      next();
    }
  });
  next();
}
