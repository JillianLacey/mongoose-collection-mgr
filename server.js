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


///VIEW ENGINE
app.engine("mustache", mustacheExpress());
app.set("views", "./views");
app.set("view engine", "mustache");



// let tpath = {
//     name: "Tom Petty and the Heartbreakers",
//     albumName: "Damn the Torpedos",
//     condition: "good",
//     signed: false,
//     albumDetails: {
//         tracks: 9,
//         releaseYear: 1979,
//         rpm: 78,
//     },
//     genre: ["rock", "classic rock"],
//     value: 20,
//     forSale: false,
//   };

//   let newVinylCollection = new VinylCollection(tpath);
  
//   newVinylCollection
//     .save()
//     .then(function(savedVinyl) {
//       console.log("savedVinyl: ", savedVinyl);
//     })
//     .catch(function(err) {
//       console.log(err);
//     });


// we need to do a res.render in a get request for the mustache page for the home page


app.post("/vinylcollection", function(req, res) {
    // console.log(req.body);
    let newVinylCollection = new VinylCollection(req.body);
  
    newVinylCollection
      .save()
      .then(function(savedAlbum) {
        res.send(savedAlbum);
      })
      .catch(function(err) {
        res.status(500).send(err);
      });
  });
  
  app.get("/vinylcollection", function(req, res) {
    VinylCollection.find()
      .then(function(foundAlbum) {
        if (!foundAlbum) {
          return res.send({ msg: "No albums found" });
        }
  
        res.send(foundAlbum);
      })
      .catch(function(err) {
        res.status(500).send(err);
      });
  });
  
  app.get("/vinylcollection/:id", function(req, res) {
    VinylCollection.findById(req.params.id)
      .then(function(foundAlbum) {
        if (!foundBook) {
          return res.send({ msg: "No albums found" });
        }
        res.send(foundAlbum);
      })
      .catch(function(err) {
        res.status(500).send(err);
      });
  });
  
  app.put("/vinylcollection/:id", function(req, res) {
    VinylCollection.findByIdAndUpdate(req.params.id, req.body)
      .then(function(updatedAlbum) {
        if (!updatedAlbum) {
          return res.send({ msg: "Could not update collection" });
        }
        res.send(updatedAlbum);
      })
      .catch(function(err) {
        res.status(500).send(err);
      });
  });
  
  app.delete("/vinylcollection/:id", function(req, res) {
    VinylCollection.findByIdAndRemove(req.params.id)
      .then(function(message) {
        res.send(message);
      })
      .catch(function(err) {
        res.status(500).send(err);
      });
  });
  


app.listen(8000, () => console.log("Server running on port 8000!"));