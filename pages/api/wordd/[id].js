import { ObjectId } from "mongodb";
import clientPromise from "../../../lib/mongodb";


export default async function handler(req, res) {
  const query = req.query.id;
  const client = await clientPromise;
  const db = client.db("dictionary");
  const data = await db
    .collection("words")
    .findOne({ _id: ObjectId(query) })
  res.json({ status: 200, data: data });
}