import { ObjectId } from "mongodb";
import clientPromise from "../../lib/mongodb";

export default async function handler(req, res) {
	switch (req.method) {
		case "GET": {
			return getWordsPerDays(req, res);
		}
		case "GET": {
			return getWordsIds(req, res);
		}
		case "POST": {
			return addWords(req, res);
		}
		case "PUT": {
			return updateWord(req, res);
		}
		case "DELETE": {
			return deleteWord(req, res);
		}
	}
}

async function getWordsPerDays(req, res) {
	const query = req.query.words_day;
	const client = await clientPromise;
	const db = client.db("dictionary");
	const data = await db
		.collection("words")
		.find({ day: query, isMemorized: false })
		.toArray();
	res.json({ status: 200, data: data });
}

async function addWords(req, res) {
	const client = await clientPromise;
	const db = client.db("dictionary");
	let bodyObject = JSON.parse(req.body);
	await db.collection("words").insertOne(bodyObject);
	res.json({ status: 200 });
}

async function updateWord(req, res) {
	const client = await clientPromise;
	const db = client.db("dictionary");
	const id = req.query.id;
	await db
		.collection("words")
		.updateOne({ _id: id }, { $set: { isMemorized: true } });
	res.json({ status: 200 });
}
