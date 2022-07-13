import React from "react";
import { Button } from "@nextui-org/react";
import clientPromise from "../lib/mongodb";
import Link from "next/link";
const DaysList = ({ days, words }) => {
	return (
		<>
			<ul className="flex flex-wrap items-center justify-evenly gap-4	">
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
	const client = await clientPromise;
	const db = client.db("dictionary");
	const days = await db.collection("days").find({}).toArray();
	const words = await db.collection("words").find({}).toArray();
	const daysdata = JSON.parse(JSON.stringify(days));
	const wordsdata = JSON.parse(JSON.stringify(words));
	return {
		props: { days: daysdata, words: wordsdata },
	};
}
