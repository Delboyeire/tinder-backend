import Cards from "./dbCards.js";
import Cors from "cors";
import express from "express";
import mongoose from "mongoose";

// App COnfig

const app = express();
const port = process.env.port || 8001;
const connectionString =
  "mongodb+srv://admin:Formula1@cluster0.mzgi2.mongodb.net/<tinderdb>";

// Middlewares

app.use(express.json());
app.use(Cors());
// DB config

mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

// api endpoints

app.get("/", (req, res) => res.status(200).send("Hei Hei!"));

app.post("/tinder/cards", (req, res) => {
  const dbCard = req.body;

  Cards.create(dbCard, (error, data) => {
    if (error) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

app.get("/tinder/cards", (req, res) => {
  Cards.find((error, data) => {
    if (error) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

// listener

app.listen(port, () => console.log("listening on port :", port));
