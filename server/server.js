const express = require("express");
const cors = require("cors");
const { ObjectId } = require("mongodb");
const { connectToDb, getDb } = require("./db");

const PORT = process.env.PORT || 5005;
const COLLECTION_NAME = process.env.MONGODB_COLLECTION_NAME || "quiz";
const ANSWER_COLLECTION_NAME = process.env.MONGODB_ANSWER_COLLECTION_NAME || "answers";

let db;

const app = express();

app.use(cors());
app.use(cors({ origin: ["http://localhost:3000"], credentials: true }));
app.use(express.json());

connectToDb((err) => {
  if (!err) {
    app.listen(PORT, () => {
      console.log(`Connection established on port ${PORT}`);
    });
    db = getDb();
  } else {
    console.error(err);
  }
});

app.get("/", (req, res) => {
  const pipeline = [{ $sample: { size: 3 } }];

  db.collection(COLLECTION_NAME)
    .aggregate(pipeline)
    .toArray()
    .then((data) => {
      res.status(200).json(data);
    });
});

app.post("/results", (req, res) => {
  const clientResults = req.body;

  db.collection(ANSWER_COLLECTION_NAME)
    .findOne()
    .then((doc) => {
      const correctAnswers = doc.correctAnswers;
      let rightAnswers = 0;

      clientResults.forEach((item) => {
        if (correctAnswers[item.id] === item.answer) {
          rightAnswers += 1;
        }
      });
      res.status(200).json(rightAnswers);
    });
});

app.get("/quiz/:questionId", (req, res) => {
  const questionId = req.params.questionId;

  console.log(questionId);

  db.collection(COLLECTION_NAME)
    .findOne({ id: +questionId })
    .then((result) => res.status(200).json(result))
    .catch((err) => res.status(500).json({ error: `Could get one. Error: ${err}` }));
});

// app.post("/add-todo", (req, res) => {
//   db.collection(COLLECTION_NAME)
//     .insertOne(req.body)
//     .then((result) => res.status(201).json(result))
//     .catch((err) => res.status(500).json({ error: `Could not create. Error: ${err}` }));
// });

// app.post("/remove-todo", (req, res) => {
//   const id = req.body.id;

//   if (ObjectId.isValid(id)) {
//     db.collection(COLLECTION_NAME)
//       .deleteOne({ _id: new ObjectId(id) })
//       .then((result) => {
//         res.status(200).json(result);
//       })
//       .catch((err) => {
//         res.status(500).json({ error: `Could not delete document` });
//       });
//   }
// });

// app.post("/edit-todo", (req, res) => {
//   const id = req.body.id;
//   const payload = req.body.payload;

//   if (ObjectId.isValid(id)) {
//     db.collection(COLLECTION_NAME)
//       .updateOne({ _id: new ObjectId(id) }, { $set: payload })
//       .then((result) => {
//         res.status(200).json(result);
//       })
//       .catch((err) => {
//         res.status(500).json({ error: `Could not update document` });
//       });
//   }
// });
