import React from "react";
import { useRouter } from "next/router";
import WordsDay from "../components/Wordsperday";

export default function WordsDays({ words }) {
	/* Getting the query from the URL. */
	const router = useRouter();
	const worddays = router.query.worddays;

	return (
		<div className="flex flex-col items-center justify-center flex-wrap gap-1">
			<h1 className="font-bold text-2xl">Words of Day: {worddays}</h1>
			<div className="flex gap-4 pt-4">
				{/* Mapping the data from the API call and passing it to the WordsDay component. */}
				{words.map(({ eng, kor, _id }) => (
					<div key={_id} className="inline-flex">
						<WordsDay eng={eng} kor={kor} id={_id} key={_id}></WordsDay>
					</div>
				))}
			</div>
			<div></div>
		</div>
	);
}

/**
 * GetServerSideProps is a function that runs on the server and returns an object with props that are
 * passed to the page component.
 * @returns The data from the API call.
 */
export async function getServerSideProps(context) {
	/* Making a call to the API and getting the data from the API. */
	const response = await fetch(
		`http://localhost:3005/api/words?words_day=${context.query.worddays}`,
	);
	/* Destructuring the data from the response.json() call. */
	const { data } = await response.json();

	/* Returning the data from the API call. */
	return {
		props: { words: data },
	};
}
