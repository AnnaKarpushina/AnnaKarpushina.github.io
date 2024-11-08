import Cart from '../models/cart';

const ClearCart = async (req, res, next) => {
  let current = new Date();
  // subtracting 60 days
  current.setDate(current.getDate() - 60);
  await Cart.updateMany(
    { 'products.timestamps': { $lte: current } },
    { $pull: { products: { timestamps: { $lte: current } } } }
  );
};

export default ClearCart;
