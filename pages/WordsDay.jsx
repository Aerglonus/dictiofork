import React from "react";
import clientPromise from "../lib/mongodb";

export default function WordsDay({ words }) {
	return (
		<div>
			{words &&
				words.map((dayz, dayIdx) => {
					return (
						<>
							<div key={dayIdx}>{dayz.kor}</div>
							<div key={dayIdx}>{dayz.eng}</div>
						</>
					);
				})}
		</div>
	);
}
export async function getServerSideProps(context) {
	const client = await clientPromise;
	const db = client.db("dictionary");
	const words = await db.collection("words").find({}).toArray();
	const wordsdata = JSON.parse(JSON.stringify(words));
	return {
		props: { words: wordsdata },
	};
}
