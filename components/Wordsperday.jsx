import React, { useCallback, useState } from "react";
import { Button, Col, Table } from "@nextui-org/react";

export default function WordsDay({ eng, kor, id }) {
	/* A hook that is used to toggle the state of the component. */
	const [isShow, setIsShow] = useState(false);
	const [isMemorized, setIsMemorized] = useState(false);

	/* A hook that is used to toggle the state of the word in english */
	const toggleShow = useCallback(() => {
		setIsShow(!isShow);
	}, [isShow]);

	async function memorizeWord(id) {
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
		<>
			{/* A conditional rendering. If the isMemorized state is true, then it won't render the component. */}
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
									{/* A conditional rendering. If the isShow state is true, then it will render the eng word. */}
									{isShow && eng}
								</Table.Cell>
								<Table.Cell css={{ paddingLeft: "20px" }}>
									<Col css={{ display: "flex", flexDirection: "column", gap: "10px" }}>
										{/* A button that is used to toggle the state of the component to hide and show the word in english. */}
										<Button auto className="bg-blue-500" onPress={toggleShow}>
											{isShow ? "Hide" : "Show"} Definition
										</Button>
										{/* Calling the memorizeWord function and passing the id of the word. */}
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
