var mongoose = require('mongoose');
var sales = mongoose.model('Sales');
var newSite = mongoose.model('Sites');

module.exports.insertSale = function(req,res)
{
    console.log('Inserting a sale');


    sales 
        .create(
            {
                brandname:req.body.brandname,
                brandsite:req.body.brandsite,
                image:req.body.image,
                Date:req.body.date,
                text:req.body.text,
                city:req.body.text

            },function(err,sale)
            {
                if(err)
                {
                    res.status(500).send('There is an errr');
                    console.log(err);
                }
                else{
                    res.status(200).send('Done');
                    console.log(sale);
                }
            }
        )
}

module.exports.showSale = function(req,res)
{
    sales.find({},function(err,sales)
{
    if(err)
    {
        console.log(err);
    }

    else{
        res.status(200).send(sales);
    }
})
}

module.exports.addSite = function(req,res)
{
    console.log("Adding a new site");

    newSite.
          create({
            Name:req.body.name,
            Category:req.body.category,
            SubCategory:req.body.sub_category,
            URL:req.body.url
            
          },function(err,site)
        {

            if(err)
            {
                res.status(500).send("There is an error" + err);
            }

            else{
                res.status(200).send(site);
            }
               
        });

}

module.exports.getUrl = function(req,res)
{
      newSite
            .find()
            .exec(function(err,sites)
        {
            if(err)
            {
                res.status(500).send("There is error");
            }

            else if(!sites)
            {
                res.status(404).send("No Site Found");
            }

            else if(sites)
            {
                console.log("Sites Found" + sites.length)
                res.status(200).json(sites);
            }
        })



}

module.exports.getCat = function(req,res)
{
  var id=req.params.id;
  console.log(id+"id");
     newSite
           .findOne({'_id':id})
           .exec(function(err,Site)
        {
            if(err)
            {
                res.status(500).send("There is an error");
            }
            else if(!Site)
            {
                 res.status(404).send("Nothing Found");
            }

            else{
                res.status(200).json(Site);
            }
        })
}
