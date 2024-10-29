const dashboardRoutes = require('./dashboard_route');
const productRoutes = require('./product_route');
const systemConfig = require('../../config/system');


module.exports = (app) => {
    const PATH_ADMIN = systemConfig.prefixAdmin;
    console.log("It is in admin routes");
    app.use(PATH_ADMIN + '/dashboard', dashboardRoutes);
    app.use(PATH_ADMIN + '/products', productRoutes);
} 