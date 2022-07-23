import { ObjectId } from "mongodb";
import clientPromise from "../../lib/mongodb";

export default async function handler(req, res) {
	/* This is a function that is called when the user clicks on a day. It takes the day that the user
clicked on and finds all the words that are associated with that day. */
	const { method } = req;
	const query = req.query.words_day;
	const client = await clientPromise;
	const db = client.db("dictionary");
	switch (req.method) {
		case "GET":
			const data = await db
				.collection("words")
				.find({ day: query, isMemorized: false })
				.toArray();
			res.json({ status: 200, data: data });
			break;
		case "POST":
			let bodyObject = JSON.parse(req.body);
			let newWord = await db.collection("words").insertOne(bodyObject);
			res.json({ status: 200 });
		case "PUT":
			await db
				.collection("words")
				.updateOne(
					{ _id: ObjectId("62caa34849e3d70aa618d9f2") },
					{ $set: { isMemorized: true } },
				);
			res.json({ status: 200 });
	}
}
