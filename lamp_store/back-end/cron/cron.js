import cron from 'node-cron';
import ClearCart from '../utils/clearCart';
// Check every 30th minute
const Cron = () => {
  cron.schedule('*/30 * * * *', async () => {
    await ClearCart();
  });
};

export default Cron;
