import React, { useCallback, useEffect, useState, forceUpdate } from "react";
import { Button, Col, Row, Table } from "@nextui-org/react";

export default function WordsDay({ words: w, eng, kor, instanceId, id }) {
	/* A hook that is used to toggle the state of the component. */
	const [isShow, setIsShow] = useState(false);
	const [word, setWord] = useState([w]);
	const [isMemorized, setIsMemorized] = useState(false);
	const toggleShow = useCallback(() => {
		setIsShow(!isShow);
	}, [isShow]);
	async function memorizeWord() {
		let res = await fetch(`http://localhost:3005/api/words?id=${id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				isMemorized: !isMemorized,
			}),
		});
		if (res.ok) {
			setIsMemorized(!isMemorized);
		}
	}
	return (
		<>
			{isMemorized ? null : (
				<div className="flex justify-center items-center flex-col">
					<Table aria-label="Example static collection table" borderWeight="0px">
						<Table.Header>
							<Table.Column css={{ paddingLeft: "10px" }}>ENG</Table.Column>
							<Table.Column css={{ paddingLeft: "10px" }}>KOR</Table.Column>
							<Table.Column
								css={{
									paddingLeft: "10px",
									display: "flex",
									justifyContent: "center",
									alignItems: "center",
								}}>
								Actions
							</Table.Column>
						</Table.Header>
						<Table.Body>
							<Table.Row>
								<Table.Cell css={{ paddingLeft: "20px", fontWeight: "$medium" }}>
									{kor}
								</Table.Cell>
								<Table.Cell css={{ paddingLeft: "20px", fontWeight: "$medium" }}>
									{isShow && eng}
								</Table.Cell>
								<Table.Cell css={{ paddingLeft: "20px" }}>
									<Col css={{ display: "flex", flexDirection: "column", gap: "10px" }}>
										<Button auto className="bg-blue-500" onPress={toggleShow}>
											{isShow ? "Hide" : "Show"} Definition
										</Button>
										<Button auto className="bg-red-500" onPress={() => memorizeWord(id)}>
											Memorize
										</Button>
									</Col>
								</Table.Cell>
							</Table.Row>
						</Table.Body>
					</Table>
				</div>
			)}
		</>
	);
}
