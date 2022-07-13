import { Button } from "@nextui-org/react";
import React, { useState } from "react";
import { useRouter } from "next/router";
export default function WordsDays({ words }) {
	const [isShow, setIsShow] = useState(false);
	function toggleShow() {
		setIsShow(!isShow);
	}
	const router = useRouter();
	const worddays = router.query.worddays
	return (
		<div className="flex flex-col items-center justify-center flex-wrap gap-1" >
			<h1>Words of Day: {worddays}</h1>
			{words.map(({ eng, kor, i }) => (
				<div key={i} style={{ border: "1px solid #ddd", padding: "1rem" }}>

					<div >eng: {isShow && eng}</div>
					<div >kor: {kor}</div>
					<Button onClick={toggleShow} className="bg-gray-500">{isShow ? '  Hide' : 'Show'} Word</Button>
				</div>
			))}
		</div>
	);
}
export async function getServerSideProps(context) {
	const response = await fetch(
		`http://localhost:3005/api/words?words_day=${context.query.worddays}`,
	);
	const { data } = await response.json();


	return {
		props: { words: data },
	};
}
