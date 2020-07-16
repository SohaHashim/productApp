const express = require('express');
const ProductData = require('./src/model/Productdata');
const User = require('./src/model/user');
const cors = require('cors');
var bodyparser =require('body-parser');
const jwt = require('jsonwebtoken');
var app = new express();
app.use(cors());

app.use(bodyparser.json())

// app.get('/',function(req,res){
//     res.send("backend is up");
// });
app.get('/products',function(req,res){
    res.header("Access-Control-Allow-Origin","*")
    res.header("Access-Control-Allow-Methods:GET, POST, PATCH, PUT, DELETE, OPTION")
    ProductData.find()
                .then(function(product){
                    res.send(product);
                });
});
 app.post('/insert',function(req,res){
    res.header("Access-Control-Allow-Origin","*")
    res.header("Access-Control-Allow-Methods:GET, POST, PATCH, PUT, DELETE, OPTION")
    console.log(req.body);
    var products = {
        productId : req.body.product.productId,
        productName :  req.body.product.productName,
        productCode :  req.body.product.productCode,
        releaseDate : req.body.product.releaseDate, 
        description : req.body.product.description,
        price :  req.body.product.price,
        starRating :  req.body.product.starRating,
        imageUrl :  req.body.product.imageUrl
    }
    var product = new ProductData(products);
    product.save();
 });
 app.get('/edit/:id',function(req,res){
    res.header("Access-Control-Allow-Origin","*")
    res.header("Access-Control-Allow-Methods:GET, POST, PATCH, PUT, DELETE, OPTION")
    const id=req.params.id;
    console.log(id + " id current");
    ProductData.findOne({_id:id})
    .then((products=>{
        console.log(products);
        res.send(products);
    }))
    });
   
app.put('/update/:id',(req,res)=>{
    res.header("Access-Control-Allow-Origin","*")
    res.header("Access-Control-Allow-Methods:GET, POST, PATCH, PUT, DELETE, OPTION")
    const id=req.params.id;
    console.log(req.body);
    item={
        productId : req.body.productId,
        productName :  req.body.productName,
        productCode :  req.body.productCode,
        releaseDate : req.body.releaseDate, 
        description : req.body.description,
        price :  req.body.price,
        starRating :  req.body.starRating,
        imageUrl :  req.body.imageUrl
    }
    //var product = new ProductData(item);

    if(item.productId!=null){
        ProductData.findByIdAndUpdate({_id:id},{"$set":{productId:item.productId}})
        .then((product)=>{
            product.save();
            alert("Updated successfully");
        })
        }
    
    })

    // console.log(req.body);
   
    //  item = {
    //     productId : req.body.productId,
    //     productName :  req.body.productName,
    //     productCode :  req.body.productCode,
    //     releaseDate : req.body.releaseDate, 
    //     description : req.body.description,
    //     price :  req.body.price,
    //     starRating :  req.body.starRating,
    //     imageUrl :  req.body.imageUrl
    // }
    // if(item.productId!=null){
    //     ProductData.findOneAndUpdate({_id:id},{"$set":{productId:item.productId}})
    //     .then(function(product){
    //         product.save();
    //         alert("updated successfully");
    //     })
    // }
    
    // res.send(item);
   
 //});
//  productId : req.body.productId,
//         productName :  req.body.productName,
//         productCode :  req.body.product.productCode,
//         releaseDate : req.body.product.releaseDate, 
//         description : req.body.product.description,
//         price :  req.body.product.price,
//         starRating :  req.body.product.starRating,
//         imageUrl :  req.body.product.imageUrl

 app.post('/register',(req,res)=>{
     let userData = req.body;
     let user = new User(userData);
     user.save((err,registeredUser)=>{
         if(err){
             console.log(err);
         }else {
            let payload = {subject:user._id};
            let token = jwt.sign(payload,'secretKey');
            res.status(200).send({token});
             //res.status(200).send(registeredUser);
         }
     });
 });
 app.post('/login',(req,res)=>{
     let userData = req.body;
     User.findOne({email:userData.email},(err,user)=>{
         if(err){
             console.log(err);
         }else
         if(!user){
             res.status(401).send('Invalid email');
         }else {
             if(user.password !== userData.password){
                 res.status(401).send('Invalid password')
             }else{
                let payload = {subject:user._id};
                let token = jwt.sign(payload,'secretKey');
                res.status(200).send({token});
                 //res.status(200).send(user);
             }
         }
     })
 })
 
//  app.post('/update',(req,res)=>{
//     res.header("Access-Control-Allow-Origin","*")
//     res.header("Access-Control-Allow-Methods:GET, POST, PATCH, PUT, DELETE, OPTION")
//     console.log(req.body);
//     var products = {
//         productId : req.body.product.productId,
//         productName :  req.body.product.productName,
//         productCode :  req.body.product.productCode,
//         releaseDate : req.body.product.releaseDate, 
//         description : req.body.product.description,
//         price :  req.body.product.price,
//         starRating :  req.body.product.starRating,
//         imageUrl :  req.body.product.imageUrl
//     }
//     var product = new ProductData(products);
//     product.save(); 
//  });
// app.get('/edit/:id',function(req,res){
//     res.header("Access-Control-Allow-Origin","*")
//     res.header("Access-Control-Allow-Methods:GET, POST, PATCH, PUT, DELETE, OPTION")
//     console.log(req.body);
//     const id = req.params.id;
//     var edit = ProductData.findById(id);
//     edit.exec(function(err,data){
//         if(err) throw err;
//         res.send(data);
//     })   
// });


// app.put('/:id',(req,res)=>{
//     res.header("Access-Control-Allow-Origin","*")
//     res.header("Access-Control-Allow-Methods:GET, POST, PATCH, PUT, DELETE, OPTION")
//     console.log(req.body);
//     var products = {
//                 productId : req.body.product.productId,
//                 productName :  req.body.product.productName,
//                 productCode :  req.body.product.productCode,
//                 releaseDate : req.body.product.releaseDate, 
//                 description : req.body.product.description,
//                 price :  req.body.product.price,
//                 starRating :  req.body.product.starRating,
//                 imageUrl :  req.body.product.imageUrl
//             }
//     ProductData.findByIdAndUpdate(req.params.id, { $set: products}, (err,doc)=>{
//         if(!err) { res.send(doc); }
//     });        
// });

 
 app.post('/delete',(req,res)=>{
    res.header("Access-Control-Allow-Origin","*")
    res.header("Access-Control-Allow-Methods:GET, POST, PATCH, PUT, DELETE, OPTION")
    console.log(req.body);
    var id = req.body.id;
    console.log(id+ "id get");
    ProductData.deleteOne({_id : id})
    .then(products=>{
        console.log(products);
    })
 })


 app.listen('3000',function(){
     console.log("Listening to port 3000");
 });