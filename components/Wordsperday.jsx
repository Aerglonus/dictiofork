import React, { useCallback, useEffect, useState, forceUpdate } from "react";

import { Button, Col, Row, Table } from "@nextui-org/react";
import { resetWarningCache } from "prop-types";
export default function WordsDay({ words, eng, kor, instanceId }) {
	/* A hook that is used to toggle the state of the component. */
	const [isShow, setIsShow] = useState(false);
	const [isMemorized, setIsMemorized] = useState([]);
	const toggleShow = useCallback(() => {
		setIsShow(!isShow);
	}, [isShow]);

	const memorizeWord = async (e) => {
		let res = await fetch(`http://localhost:3005/api/words`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				...words,
				isMemorized: !isMemorized,
			}),
		});
		console.log(res);
		if (res.ok) {
			setIsMemorized(!isMemorized);
		}
	};

	return (
		<>
			{isMemorized ? (
				<div key={instanceId} className="flex justify-center items-center flex-col">
					<Table
						key={instanceId}
						aria-label="Example static collection table"
						borderWeight="0px">
						<Table.Header key={instanceId}>
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
						<Table.Body key={instanceId}>
							<Table.Row key={instanceId}>
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
										<Button auto className="bg-red-500" onPress={memorizeWord}>
											Memorize
										</Button>
									</Col>
								</Table.Cell>
							</Table.Row>
						</Table.Body>
					</Table>
				</div>
			) : null}
		</>
	);
}
