var mongoose = require('mongoose');

var org_ads = mongoose.model('org_ads');


module.exports.getallAds = function(req,res)
{
    console.log("welcome back");
    org_ads 
         .find()
         .exec(function(err,org_ads)
        {
            if(err)
            {
                res.status(500).send("there is an error : " + err);
            }
            else if(!org_ads)
            {
                res.status(404).send('No add found');
            }

            else{
                
                res.status(200).json(org_ads);
            }



        });
}

module.exports.getoneAd = function(req,res)
{
    console.log("I am in");
    var ad_id=req.params.id;
    
    org_ads
          .findOne({"_id":ad_id})
          .exec(function(err,ad)
        {
            if(err)
            {
                res.status(500).send({'state':'error','message':"There is an error"});
            }

            else if(!ad)
            {
                res.status(404).send({'state':'Nothing Found','message':"No ad found please check your ID"});
            }

            else{
                res.status(200).json(ad);
            }

        });

}

module.exports.getadupdated = function(req,res)
{
    console.log("I am in");
    var ad_id=req.params.id;
    org_ads.findById(ad_id,function(err,ad)
{     if(err)
    {
        res.status(500).send({'state':'error','message':'Ad not found'});
    }
    else
    {
        ad.Status=req.body.Status;
        ad.save(function(err,updatead)
    {
        if(err)
         {
             res.status(500).send("There is an error" + err);
         }
         else{
             res.status(200).json(updatead);
         }

    });
    }

});
}

module.exports.specificAd = function(req,res)
{
    var status=req.params.status;
    
    console.log("welcome back");
    org_ads 
         .find({'Status':status})
         .exec(function(err,org_ads)
        {
            if(err)
            {
                res.status(500).send("there is an error : " + err);
            }
            else if(!org_ads)
            {
                res.status(404).send('No add found');
            }

            else{
                
                res.status(200).json(org_ads);
            }



        });
    }

    module.exports.getonedeleted = function(req,res)
    {
        var id = req.params.id;
        console.log(id);
    
        org_ads.
           findByIdAndRemove(id)
           .exec(function(err,user)
        {
            if(err){
                res
                  .status(404)
                  .json(err);
            }
            else{
                console.log("Add  deleted, id:",id)
                res
                   .status(204)
                   .json();
            }
        });
    }
