import { ObjectId } from "mongodb";
import clientPromise from "../lib/mongodb";

export default async function handler(req, res) {
  const query = req.query;
  const client = await clientPromise;
  const db = client.db("dictionary");
  const collection = db.collection("words");

  if (query.words_day && query.isDone) {
    const data = await collection
      .find({
        day: query.words_day,
        isDone: query.isDone === "true",
      })
      .toArray();
    res.json({ status: 200, data: data });
  } else if (query.words_day && query.isMemorized) {
    const data = await collection
      .find({
        day: query.words_day,
        isMemorized: query.isMemorized === "true",
      })
      .toArray();
    res.json({ status: 200, data: data });
  } else {
    const data = await collection.find().toArray();
    res.json({ status: 200, data: data });
  }
}
