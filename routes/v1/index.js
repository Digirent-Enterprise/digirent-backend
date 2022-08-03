const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const categoryRoute = require('./category.route');
const productRoute = require('./product.route');
const transactionRoute = require('./transaction.route')
const router = express.Router();

const defaultRoutes = [
    {
        path: '/api/auth',
        route: authRoute,
    },
    {
        path: '/api/user',
        route: userRoute,
    },
    {
        path: '/api/category',
        route: categoryRoute
    },
    {
        path: '/api/product',
        route: productRoute
    },
    {
        path: '/api/transactions',
        route: transactionRoute
    }
];

defaultRoutes.forEach((route) => {
    router.use(route.path, route.route);
});

module.exports = router;
