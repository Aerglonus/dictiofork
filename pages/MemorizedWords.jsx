import React, { useState } from "react";
import { Table, Button } from "@nextui-org/react";
import clientPromise from "../lib/mongodb";

const DoneWords = ({ words }) => {
	const [isMemorized, setIsMemorized] = useState(false);
	/**
	 * Restoring a word that has been set Memorized as true from the database.
	 */
	async function restoreWord(id) {
		/* Fetching the data from the database. */
		let res = await fetch(process.env.NEXT_PUBLIC_API_WORD_ID + `${id}`, {
			/* Updating the database. */
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				isMemorized: !isMemorized,
			}),
		});
		console.log(res);
		/* Checking if the response is ok. If it is ok, then it will set the isMemorized state to the
		opposite of what it is and hide the component. */
		if (res.ok) {
			setIsMemorized(!isMemorized);
		}
	}
	return (
		<div className=" flex justify-center items-center flex-col">
			<div className="py-4">
				<p className=" text-3xl font-bold">Memorized Words</p>
			</div>
			<Table
				aria-label="collection table"
				css={{
					height: "auto",
					minWidth: "100%",
				}}
				sticked
				color="primary">
				<Table.Header>
					<Table.Column css={{ paddingLeft: "10px" }}>EN</Table.Column>
					<Table.Column css={{ paddingLeft: "20px" }}>KOR</Table.Column>
					<Table.Column
						css={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
						Restore
					</Table.Column>
				</Table.Header>
				<Table.Body>
					{/* Mapping the data from the database and displaying it on the page. */}
					{words.map((wor, index, _id) => {
						return (
							<Table.Row key={wor._id}>
								{/* Checking if the isMemorized state is true or false. If it is true, then it will show the
							component. If it is false, then it will hide the component. */}
								{isMemorized ? null : (
									<Table.Cell css={{ paddingLeft: "10px" }}>{wor.eng}</Table.Cell>
								)}
								{isMemorized ? null : (
									<Table.Cell css={{ paddingLeft: "20px" }}>{wor.kor}</Table.Cell>
								)}
								{isMemorized ? null : (
									<Table.Cell css={{ paddingLeft: "20px" }}>
										<Button
											onClick={() => restoreWord(wor._id)}
											auto
											className="bg-red-500">
											Restore?
										</Button>
									</Table.Cell>
								)}
							</Table.Row>
						);
					})}
				</Table.Body>
				<Table.Pagination
					color="primary"
					shadow
					noMargin
					align="center"
					rowsPerPage={4}
					onPageChange={(page) => console.log({ page })}
				/>
			</Table>
		</div>
	);
};

export default DoneWords;

/** The getServerSideProps function is called on the server-side and it returns an object with a props property that contains the data that will be passed to the page component. @returns The props object is being returned. */

export async function getServerSideProps(context) {
	// `await clientPromise` will use the default database passed in the MONGODB_URI
	// However you can use another database (e.g. myDatabase) by replacing the `await clientPromise` with the following code:
	//
	// `const client = await clientPromise`
	// `const db = client.db("myDatabase")`
	//
	// Then you can execute queries against your database like so:
	// db.find({}) or any of the MongoDB Node Driver commands

	/* Fetching the data from the database. */
	const client = await clientPromise;
	const db = client.db("dictionary");
	const words = await db
		.collection("words")
		.find({ isMemorized: true })
		.toArray();
	const wordsdata = JSON.parse(JSON.stringify(words));
	return {
		props: { words: wordsdata },
	};
}
