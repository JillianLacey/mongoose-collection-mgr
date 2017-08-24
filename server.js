const express = require("express");
const mongoose = require("mongoose");
const bluebird = require("bluebird");
const bodyparser = require("body-parser");
const mustacheExpress = require("mustache-express");
const path = require("path");
const logger = require("morgan");
const VinylCollection = require("./models/VinylCollection");

const app = express();
mongoose.Promise = bluebird;
mongoose.connect("mongodb://localhost:27017/vinyl");



app.use(bodyparser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "./public")));
app.use(logger("dev"));


//\\\\\\\\\\\\\\\\\ VIEW ENGINE ////////////////////\\
app.engine("mustache", mustacheExpress());
app.set("views", "./views");
app.set("view engine", "mustache");


//\\\\\\\\\\\\\\\\\\\\\ GET ////////////////////////\\
  
app.get("/", function(req, res) {
  VinylCollection.find()
    .then(function(foundAlbum) {
      if (!foundAlbum) {
        return res.send({ msg: "No albums found" });
      }
      // res.send(foundAlbum);
      return res.render("index", {vinyl: foundAlbum});
    })
    .catch(function(err) {
      res.status(500).send(err);
    });
});


//\\\\\\\\\\\\\\\\\\\\\ POST ////////////////////////\\
app.post("/vinylcollection", function(req, res) {
    // console.log(req.body);
    let newVinylCollection = new VinylCollection(req.body);
  
    newVinylCollection
      .save()
      .then(function(savedAlbum) {
        // res.send(savedAlbum);
        res.redirect("/");
      })
      .catch(function(err) {
        res.status(500).send(err);
      });
  });


//\\\\\\\\\\\\\\\\ INDIVIDUAL ENTRY /////////////////////\\

  app.get("/vinylcollection/:id", function(req, res) {
    VinylCollection.findById(req.params.id)
      .then(function(foundAlbum) {
        if (!foundAlbum) {
          return res.send({ msg: "No albums found" });
        }
        res.render("vinylDetails", {vinyl: foundAlbum});
      })
      .catch(function(err) {
        res.status(500).send(err);
      });
      
  });


///////////////// TO UPDATE ENTRY //////////////////////////
  app.post("/vinylcollection/:id", function(req, res) {
    VinylCollection.findByIdAndUpdate(req.params.id, req.body)
      .then(function(updatedAlbum) {
        if (!updatedAlbum) {
          return res.send({ msg: "Could not update collection" });
        }
        // res.send(updatedAlbum);
        let redirectURL = 
          res.redirect(`/vinylcollection/${req.params.id}`);
      })
      .catch(function(err) {
        res.status(500).send(err);
      });
  });

  ///////////////// TO DELETE AN ENTRY ////////////////////////
  app.delete("/vinylcollection/:id", function(req, res) {
    VinylCollection.findByIdAndRemove(req.params.id)
      .then(function(message) {
        // res.send(message);
        return res.render("index", {vinyl: foundAlbum});
      })
      .catch(function(err) {
        res.status(500).send(err);
      });
  });






  
////////////APP.LISTEN/////////
app.listen(8000, () => console.log("Server running on port 8000!"));