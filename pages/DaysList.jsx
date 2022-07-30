import React from "react";
import { Button } from "@nextui-org/react";
import clientPromise from "../lib/mongodb";
import Link from "next/link";
const DaysList = ({ days, words }) => {
	return (
		<>
			<ul className="flex flex-wrap items-center justify-evenly gap-4	">
				{/* A loop that is looping through the days array and returning a the days into the component. */}
				{days.map((dayz, index) => {
					return (
						<li key={index} className="m-0">
							<Link href={`/${encodeURIComponent(dayz.day)}`}>
								<Button
									auto
									className=" bg-blue-600 font-bold text-white  rounded-md  my-1"
									key={index}>
									Day {dayz.day}
								</Button>
							</Link>
						</li>
					);
				})}
			</ul>
		</>
	);
};

export default DaysList;

export async function getServerSideProps(context) {
	/* Connecting to the MongoDB database. */
	const client = await clientPromise;
	/* Connecting to the dictionary database. */
	const db = client.db("dictionary");
	/* Connecting to the database and finding the collection called days and then returning the data into
	an array. */
	const days = await db.collection("days").find({}).toArray();
	/* Connecting to the database and finding the collection called words and then returning the data into
	an array. */
	const words = await db.collection("words").find({}).toArray();
	/* Converting the data from the database into a JSON object. */
	const daysdata = JSON.parse(JSON.stringify(days));
	const wordsdata = JSON.parse(JSON.stringify(words));
	/* Returning the data from the database into the component. */
	return {
		props: { days: daysdata, words: wordsdata },
	};
}
