var express = require('express');
var router = express.Router();
var mongo = require('mongodb').MongoClient;
var mongoose=require('mongoose');
var fs = require('file-system');
var formidable = require('formidable');

var url="mongodb://localhost:27017/";
var assert=require('assert');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/booking', function(req, res, next) {
  res.render('booking');
});
router.post('/hotel1', function(req, res, next) {
  res.render('hotel1');
});
router.get('/signup', function(req, res, next) {
  res.render('signup');
})

router.get('/aboutus', function(req, res, next) {
  res.render('aboutus');
});
router.get('/contact', function(req, res, next) {
  res.render('contact');
});
router.get('/addSubDes', function(req, res, next) {
  res.render('addSubDes');
});
router.get('/addAdventures', function(req, res, next) {
  res.render('addAdventures');
});
router.get('/adminLogin', function(req, res, next) {
  res.render('adminLogin');
});
router.get('/login', function(req, res, next) {
  var id =req.query.id;
  res.render('login',{id:id});
});
router.get('/travel', function(req, res, next) {
  res.render('travel');
});
router.get('/addHotels', function(req, res, next) {
  res.render('addHotels');
});

//Add Adventures
router.post('/addAdventures1', function(req, res, next) {
  var form= new formidable.IncomingForm();
  form.parse(req,function(err,fields,files){
    if(err){ console.log(err);}
    var items={ name:fields.name,
     imgName : files.file.name,
      des: fields.description,
    };

    var oldpath= files.file.path;
    var newpath= "C:/Users/Administrator/Desktop/node/project/public/images/"+files.file.name;
    console.log(files);
    fs.rename(oldpath,newpath,function(err){
      if(err){console.log(err);}
      console.log("File Uploaded");
    });
mongo.connect(url,function(err,db){
if(err){
console.log(err);
}
var dbo= db.db("Tourism");
dbo.collection("adventure").insertOne(items,function(err,res){
console.log("data inserted");
});
db.close();
res.redirect('/addAdventures');
});
});
});
//Add Sub Destination
router.post('/addSubDes1', function(req, res, next) {
  var form= new formidable.IncomingForm();
  form.parse(req,function(err,fields,files){
    if(err){ console.log(err);}
    var items={ id:fields.id,
      category: fields.location,
      famous: files.file.name,
      info:[{
              Famous_For:fields.famousfor,
              Ticket :fields.ticket,
              Opening_Timing:fields.timings,
              Duration:fields.duration,
              Things_To_Do:fields.things
            }]
    };
    var oldpath= files.file.path;
    var newpath= "C:/Users/Administrator/Desktop/node/project/public/images/"+files.file.name;
    console.log(files);
    fs.rename(oldpath,newpath,function(err){
      if(err){console.log(err);}
      console.log("File Uploaded");
    });
mongo.connect(url,function(err,db){
if(err){
console.log(err);
}
var dbo= db.db("Tourism");
dbo.collection("singleDes").insertOne(items,function(err,res){
console.log("data inserted");
});
db.close();
res.redirect('/addSubDes');
});
});
});
//Add hotels
router.post('/addhotel1', function(req, res, next) {
  var form= new formidable.IncomingForm();
  form.parse(req,function(err,fields,files){
    if(err){ console.log(err);}
    var items={ 
      img: files.file.name,
      name: fields.name, 
      address: fields.address,
      location:fields.location,
      price: fields.price,
      roomtype: fields.roomtype,
      facilities: fields.facilities,
    };
    var oldpath= files.file.path;
    var newpath= "C:/Users/Administrator/Desktop/node/project/public/images/"+files.file.name;
    console.log(files);
    fs.rename(oldpath,newpath,function(err){
      if(err){console.log(err);}
      console.log("File Uploaded");
    });
mongo.connect(url,function(err,db){
if(err){
console.log(err);
}
var dbo= db.db("Tourism");
dbo.collection("subhotels").insertOne(items,function(err,res){
console.log("data inserted");
});
db.close();
res.redirect('/addHotels');
});
});
});
//Admin Profile Update
router.post('/userUpdate', function(req, res, next) {
    var id=mongoose.Types.ObjectId(req.body.id);
    console.log(id);
    var items={$set:{username: req.body.uname,
      email:req.body.email,
      fname:req.body.fname,
      lname:req.body.lname,
      address:req.body.address,
      city:req.body.city,
      country:req.body.country,
      zipcode:req.body.pincode,
      about: req.body.about
    }};
console.log(items);
mongo.connect(url,function(err,db){
if(err){
console.log(err);
}
var dbo= db.db("Tourism");
var condition={"_id":id};
dbo.collection("admin").updateOne(condition,items,function(err,res){
console.log("data updated");
});
db.close();
res.redirect('/user');
});
});
// showing sub destination
router.get('/singleDest', function(req, res, next) {
  var a=req.query.id;
  mongo.connect(url,function(err,db){
    if(err){
      console.log(err);
    }
    var dbo= db.db("Tourism");
      dbo.collection ("singleDes").find({id:a}).toArray(function(err,data){
      console.log(data);
      res.render('singleDest',{images1:data});
    });
    db.close();
});
});

// location based hotels search
router.get('/hotel1', function(req, res, next) {
  var a=req.query.id;
  mongo.connect(url,function(err,db){
    if(err){
      console.log(err);
    }
    var dbo= db.db("Tourism");
      dbo.collection ("subhotels").find({main_id:a}).toArray(function(err,data){
      console.log(data);
      res.render('hotel1',{images2 :data});
    });
    db.close();
});
});
//User Feedback
router.post('/contact',function(req,res,next){
  var fname= req.body.fname;
  var lname= req.body.lname;
  var email= req.body.email;
  var subject= req.body.subject;
  var message =req.body.message;
  mongo.connect(url,function(err,db){
      if(err){
        console.log(err);
      }
      var dbo= db.db("Tourism");
      var data= {'fname':fname, 'lname':lname,'email':email,'subject':subject,'message':message};
      dbo.collection("feedback").insertOne(data,function(err,res){
        console.log("data inserted");
      });
      db.close();
      res.redirect('/contact');
  });
});

// fetching room data with booking form

router.get('/bookingForm',function(req,res,next){
  var id=mongoose.Types.ObjectId(req.query.id);

  console.log(id);
  mongo.connect(url,function(err,db){
    if(err){
      console.log(err);
    }
    var dbo= db.db("Tourism");
      dbo.collection ("subhotels").find({'_id':id}).toArray(function(err,data){
      console.log(data);
      res.render('bookingForm',{sub:data});
    });
    db.close();
});
});

// user signup
router.post('/signup1',function(req,res,next){
  var username= req.body.username;
  var password1= req.body.password1;
  var email1= req.body.email1;
  var confirm_password= req.body.confirm_password;
  var mobile= req.body.mobile;
  var city= req.body.city;
  mongo.connect(url,function(err,db){
      if(err){
        console.log(err);
      }
      var dbo= db.db("Tourism");
      var data= {'username':username,'email1':email1,'password1':password1,'confirm_password':confirm_password,'mobile':mobile,'city':city};
      dbo.collection("signup").insertOne(data,function(err,res){
        console.log(res);
        console.log("data inserted");
      });
      db.close();
      res.redirect('/home');
  });
});

// fetching destinations
router.get('/destination',function(req,res,next)
{ mongo.connect(url,function(err,db){
    if(err){
      console.log(err);
    }
    var dbo= db.db("Tourism");
      dbo.collection ("destination").find({}).toArray(function(err,data){
      console.log(data);
      res.render('destination',{images1:data});
    });
    db.close();
});
});

// home page (hotel)
router.post('/ajax',function(req,res,next)
{ 
  var value1= req.body.r;
  console.log(value1);
  mongo.connect(url,function(err,db){
    if(err){
      console.log(err);
    }
    var dbo= db.db("Tourism");
      dbo.collection ("subhotels").find({location:value1}).toArray(function(err,data){
        assert.equal(null,err);
        console.log(data);
        res.json(data);
       });
  });
});

//Gallery
router.get('/home',function(req,res,next)
{ mongo.connect(url,function(err,db){
    if(err){
      console.log(err);
    }
    var dbo= db.db("Tourism");
      dbo.collection ("gallery").find({}).toArray(function(err,data){
        dbo.collection ("destination").find({}).toArray(function(err,data1){
         res.render('home',{res1:data1,gallery:data});
        db.close();
      });
    }); 
});
});

// admin details
router.get('/user',function(req,res,next)
{ mongo.connect(url,function(err,db){
    if(err){
      console.log(err);
    }
    var dbo= db.db("Tourism");
      dbo.collection ("admin").find({}).toArray(function(err,data){
         res.render('user',{admin:data});
        db.close();
      });
    });
});

// registered user list in admin panel
router.get('/table',function(req,res,next)
{ mongo.connect(url,function(err,db){
    if(err){
      console.log(err);
    }
    var dbo= db.db("Tourism");
      dbo.collection ("signup").find({}).toArray(function(err,data){
         res.render('table',{table:data,});
        db.close();
      });
    });
});

// deleting registered users from admin panel
router.get('/tableDel',function(req,res,next)
{ 
  var id=mongoose.Types.ObjectId(req.query.id);
  mongo.connect(url,function(err,db){
    if(err){
      console.log(err);
    }
    var dbo= db.db("Tourism");
      dbo.collection ("signup").deleteOne({'_id':id},function(err,data){ 
        db.close();
        res.redirect('/table');
      });
    });
});

//hotels list in admin panel
router.get('/hotelList',function(req,res,next)
{ mongo.connect(url,function(err,db){
    if(err){
      console.log(err);
    }
    var dbo= db.db("Tourism");
      dbo.collection ("subhotels").find({}).toArray(function(err,data){
         res.render('hotelList',{hotel:data,});
        db.close();
      });
    });
});

//deleting hotel in admin panel 
router.get('/hotelDel',function(req,res,next)
{ 
  var id=mongoose.Types.ObjectId(req.query.id);
  mongo.connect(url,function(err,db){
    if(err){
      console.log(err);
    }
    var dbo= db.db("Tourism");
      dbo.collection ("subhotels").deleteOne({'_id':id},function(err,data){ 
        db.close();
        res.redirect('/hotelList');
      });
    });
});

// show feedback in admin panel
router.get('/delFeedback',function(req,res,next)
{ mongo.connect(url,function(err,db){
    if(err){
      console.log(err);
    }
    var dbo= db.db("Tourism");
      dbo.collection ("feedback").find({}).toArray(function(err,data){
         res.render('delFeedback',{feedback:data,});
        db.close();
      });
    });
});

//deleting feedback by admin
router.get('/delFeedback1',function(req,res,next)
{ 
  var id=mongoose.Types.ObjectId(req.query.id);
  mongo.connect(url,function(err,db){
    if(err){
      console.log(err);
    }
    var dbo= db.db("Tourism");
      dbo.collection ("feedback").deleteOne({'_id':id},function(err,data){ 
        db.close();
        res.redirect('/delFeedback');
      });
    });
});

// showing adventures
router.get('/adventures',function(req,res,next)
{ mongo.connect(url,function(err,db){
    if(err){
      console.log(err);
    }
    var dbo= db.db("Tourism");
      dbo.collection ("adventure").find({}).toArray(function(err,data){
      console.log(data);
      res.render('adventures',{imagesad:data});
    });
    db.close();
});
});

// signup email validation
router.post('/email',function(req,res,next)
{
  var a=req.body.r;
  mongo.connect(url,function(err,db){
    if(err){
      console.log(err);
    }
    var dbo= db.db("Tourism");
      dbo.collection ("signup").find({'email1':a}).toArray(function(err,data){
      console.log(data);
      if(Object.keys(data).length!=0){
        res.send(false)
      }
      else
      {res.send(true);}
    });
});
});

// matching login data with signup table
router.post('/loginvalid', function(req, res, next) {
  var email=req.body.email;
  var pass=req.body.pass;
  mongo.connect(url,function(err,db){
    if(err){
      console.log(err);
    }
    var dbo= db.db("Tourism");
      dbo.collection ("signup").find({email1:email,password1:pass}).toArray(function(err,data){
      console.log(data);
      if(Object.keys(data).length!=0){
        res.send(true);}
        else{
          res.send(false)
        }
    });
    db.close();
});
});

//checking valid admin
router.post('/adminloginvalid', function(req, res, next) {
  var email1=req.body.email1;
  var pass1=req.body.pass1;
  mongo.connect(url,function(err,db){
    if(err){
      console.log(err);
    }
    var dbo= db.db("Tourism");
      dbo.collection ("admin").find({email:email1,password:pass1}).toArray(function(err,data){
      console.log(data);
      if(Object.keys(data).length!=0){
        res.send(true);}
        else{
          res.send(false)
        }
    });
    db.close();
});
});

// inserting booking form details
router.post('/book1', function(req, res, next) {
  var email=req.body.email;
  var datepicker=req.body.datepicker;
  var datepicker1=req.body.datepicker1;
  var adults=req.body.adults;
  var children=req.body.children;
  var contact=req.body.contact;
  mongo.connect(url,function(err,db){
    if(err){
      console.log(err);
    }
    var dbo= db.db("Tourism");
      dbo.collection ("bookHotel").insertOne({email:email,checkin:datepicker,checkout:datepicker1,adults:adults,children:children,contact:contact},function(err,res1){
      console.log(res1);
      if(Object.keys(res1).length!=0){
        res.send(true);}
        else{
          res.send(false)
        }
    });
    db.close();
});
});

module.exports = router;
