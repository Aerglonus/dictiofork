import { ObjectId } from "mongodb";
import clientPromise from "../../../lib/mongodb";

export default async function handler(req, res) {
  const query = req.query;
  const client = await clientPromise;
  const db = client.db("dictionary");
  const collection = db.collection("words");

  let data;
  switch (true) {
    case query.get_all_words !== undefined:
      data = await collection.find().toArray();
      break;
    case Boolean(query.words_day && query.engl):
      data = await collection
        .find({
          day: query.words_day,
          eng: query.engl,
        })
        .toArray();
      break;
    case Boolean(query.words_day && query.isMemorized !== undefined):
      data = await collection
        .find({
          day: query.words_day,
          isMemorized: query.isMemorized === "true",
        })
        .toArray();
      break;
    case Object.keys(query).length === 0:
      return res.status(400).json({ error: "No query provided" });
    default:
      if (query.words_day) {
        data = await collection
          .find({
            day: query.words_day,
          })
          .toArray();
      } else {
        return res.status(400).json({ error: "Invalid query parameter" });
      }
      break;
  }

  res.json({ status: 200, data: data });
}
