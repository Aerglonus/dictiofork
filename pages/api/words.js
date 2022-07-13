import { ObjectId } from "mongodb";
import clientPromise from "../../lib/mongodb";

export default async function handler(req, res) {
	const query = req.query.words_day;

	const client = await clientPromise;
	const db = client.db("dictionary");
	const data = await db.collection("words").find({ day: query }).toArray();
	res.json({ status: 200, data: data });
}
