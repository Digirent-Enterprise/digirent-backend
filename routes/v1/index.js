const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const categoryRoute = require('./category.route');
const productRoute = require('./product.route');
const router = express.Router();

const defaultRoutes = [
    {
        path: '/api/auth',
        route: authRoute,
    },
    {
        path: '/api/users',
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
        path: "/api/uploadedImage",
        route: express.static('uploadedImage')
    }
];

defaultRoutes.forEach((route) => {
    router.use(route.path, route.route);
});

module.exports = router;
