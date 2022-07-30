import React, { useCallback, useEffect, useState, forceUpdate } from "react";
import { Button, Col, Row, Table } from "@nextui-org/react";

export default function WordsDone({ words: w, eng, kor, instanceId, id }) {
	/* A hook that is used to toggle the state of the component. */
	const [isShow, setIsShow] = useState(false);
	const [word, setWord] = useState([w]);
	const [isMemorized, setIsMemorized] = useState(false);
	const toggleShow = useCallback(() => {
		setIsShow(!isShow);
	}, [isShow]);
	async function restoreWord(id) {
		let res = await fetch(`http://localhost:3005/api/words?id=${id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				isMemorized: !isMemorized,
			}),
		});
		console.log(res);
		if (res.ok) {
			setIsMemorized(!isMemorized);
		}
	}
	return (
		<div className="flex justify-center items-center flex-col">
			<div>
				<p>{kor}</p>
			</div>
			<div>
				<p>{eng}</p>
			</div>
			<div>
				<Button auto className="bg-red-500" onPress={() => restoreWord(id)}>
					Memorize
				</Button>
			</div>
		</div>
	);
}
