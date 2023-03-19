import { ObjectId } from "mongodb";
import clientPromise from "../../lib/mongodb";


export default async function handler(req, res) {
  switch (req.method) {
    case "GET": {
      if (req.query.word_id) {
        return getWordPerId(req, res);
      } else {
        return getWords(req, res);
      }
    }
  }
}

async function getWords(req, res) {
  const client = await clientPromise;
  const db = client.db("dictionary");
  const collection = db.collection("words");
  const data = await collection.find().toArray();
  res.json({ status: 200, data: data });
}

async function getWordPerId(req, res) {
  const query = req.query.word_id;
  const client = await clientPromise;
  const db = client.db("dictionary");
  const data = await db
    .collection("words")
    .findOne({ _id: ObjectId(query) })
  res.json({ status: 200, data: data });
}


