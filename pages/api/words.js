import { ObjectId } from "mongodb";
import clientPromise from "../../lib/mongodb";

/**
 * It's a switch statement that calls a function based on the HTTP method.
 * @param req - The request object.
 * @param res - The response object.
 * @returns The function handler is being returned.
 */
export default async function handler(req, res) {
	switch (req.method) {
		case "GET": {
			return getWordsPerDays(req, res);
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

/**
 * It takes a query parameter called words_day, and then it uses that query parameter to find all the
 * words in the database that have the same day value as the query parameter, and then it returns those
 * words in a JSON object.
 * @param req - request
 * @param res - the response object
 */
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

/**
 * It takes a request, parses the body of the request, and inserts the body into the database
 * @param req - The request object.
 * @param res - The response object.
 */
async function addWords(req, res) {
	const client = await clientPromise;
	const db = client.db("dictionary");
	let bodyObject = JSON.parse(req.body);
	await db.collection("words").insertOne(bodyObject);
	res.json({ status: 200 });
}

/**
 * It takes the id of a word from the query string, finds the word in the database, and toggles the
 * value of the isMemorized property.
 *
 * The first line of the function is a call to the clientPromise function. This function returns a
 * promise that resolves to a MongoDB client. The client is then used to connect to the database.
 *
 * The second line of the function uses the client to connect to the database.
 *
 * The third line of the function gets the id of the word from the query string.
 *
 * The fourth line of the function uses the updateOne method to update the word in the database. The
 * first argument of the updateOne method is a filter that selects the word to update. The second
 * argument of the updateOne method is an array of update operators. The first update operator in the
 * array is the  operator. The  operator sets the value of the is
 * @param req - request
 * @param res - the response object
 */
async function updateWord(req, res) {
	const client = await clientPromise;
	const db = client.db("dictionary");
	const id = req.query.id;
	const data = await db
		.collection("words")
		.updateOne({ _id: ObjectId(`${id}`) }, [
			{ $set: { isMemorized: { $not: "$isMemorized" } } },
		]);
	res.json({ status: 200, data: data });
}
