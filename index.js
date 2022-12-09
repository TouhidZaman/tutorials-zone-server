require("dotenv").config();
const express = require("express");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const app = express();
const port = process.env.PORT || 5000;

const cors = require("cors");

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.h1kalzv.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

const run = async () => {
  try {
    const db = client.db("tutorialsZone");
    const courseCollection = db.collection("courses");

    app.get("/courses", async (req, res) => {
      const cursor = courseCollection.find({});
      const course = await cursor.toArray();

      res.send({ status: true, data: course });
    });

    app.post("/course", async (req, res) => {
      const course = req.body;

      const result = await courseCollection.insertOne(course);

      res.send(result);
    });

    app.delete("/course/:id", async (req, res) => {
      const id = req.params.id;

      const result = await courseCollection.deleteOne({ _id: ObjectId(id) });
      res.send(result);
    });
  } finally {
  }
};

run().catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send({status: true, data: {
    message: "Hello from tutorials zone server",
    author: "Muhammad Touhiduzzaman"
  }});
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});