var express = require('express');
var router = express.Router();


var org = require('../../controller/org/orgcontroller.js');

router
    .route('/org_ads')
    .get(org.getallAds);


router
      .route('/org_ads/:id')
      .get(org.getoneAd)
      .put(org.getadupdated)


router
     .route('/specific_ads/:status')
     .get(org.specificAd)

//delete

   router
       .route('/org_ads/delete/:id')
       .get(org.getonedeleted)

      
module.exports=router;