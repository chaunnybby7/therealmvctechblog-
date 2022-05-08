// import express router object
const router = require('express').Router();
//points to index.js within the api folder
const apiRoutes = require('./api');
// imports home-route
const homeRoutes = require('./home-routes.js');
//imports dashbboard-route
const dashboardRoutes = require('./dashboard-routes.js');

//directs route variable based on what comes from user 
router.use('/', homeRoutes);
router.use('/api', apiRoutes);
router.use('/dashboard', dashboardRoutes);

//display 404 error message if response does not trigger any of the above routes
router.use((req, res) => {
    res.status(404).end();
});
module.exports = router;
