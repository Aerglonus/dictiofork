import Head from "next/head";
import { useEffect } from "react";
import clientPromise from "../lib/mongodb";
import DaysList from "./DaysList";

export default function Home({ words, days }) {
	return (
		<div className="mx-[20px] flex flex-col items-center justify-center ">
			<div className=" py-[10px]">
				<DaysList days={days}></DaysList>
			</div>
		</div>
	);
}

export async function getServerSideProps(context) {
	// `await clientPromise` will use the default database passed in the MONGODB_URI
	// However you can use another database (e.g. myDatabase) by replacing the `await clientPromise` with the following code:
	//
	// `const client = await clientPromise`
	// `const db = client.db("myDatabase")`
	//
	// Then you can execute queries against your database like so:
	// db.find({}) or any of the MongoDB Node Driver commands
	const client = await clientPromise;
	const db = client.db("dictionary");
	const words = await db.collection("words").find({}).toArray();
	const days = await db.collection("days").find({}).toArray();
	const data = JSON.parse(JSON.stringify(words));
	const daysdata = JSON.parse(JSON.stringify(days));
	return {
		props: { words: data, days: daysdata },
	};
}
