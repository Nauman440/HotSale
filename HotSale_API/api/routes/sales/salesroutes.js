var express = require('express');
var router = express.Router();
var sale_controller = require('../../controller/sale/sale_controller.js');


router
    .route('/insert_sale')
    .post(sale_controller.insertSale);

router
     .route('/show_sales')
     .get(sale_controller.showSale);

     router
     .route('/new_site')
     .post(sale_controller.addSite);


     router
      .route('/get_url')
      .get(sale_controller.getUrl)

      router
         .route('/get_cat/:id')
         .get(sale_controller.getCat)

    module.exports = router;