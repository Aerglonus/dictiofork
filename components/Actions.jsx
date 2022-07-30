import React from "react";
import { Button, Container } from "@nextui-org/react";
import Link from "next/link";

/**
 * It returns a div with a title that redirects to home page and a container the container wraps 3 buttons first button redirects to the add words, second one that redirects to the add days page and the third one that redirects to the memorized words page.
 */
const Actions = () => {
	return (
		<div className="mx-auto flex flex-col items-center justify-center mt-[70px]">
			<Link href="/">
				<h1 className="font-bold text-2xl xl:text-4xl  tracking-wide	py-1 cursor-pointer">
					Advanced Korean Vocabulary
				</h1>
			</Link>
			<Container className="flex flex-wrap items-center justify-center gap-x-5 py-4">
				<Link href="/CreateWord">
					<Button className=" tracking-wide bg-black rounded-md text-white p-[10px]">
						Add Words
					</Button>
				</Link>
				<Button className=" rounded-md bg-black text-white p-[10px] tracking-wide">
					Add Days
				</Button>
				<Link href="/MemorizedWords">
					<Button className=" my-2 bg-black rounded-md text-white p-[10px] tracking-wide">
						Memorized Words
					</Button>
				</Link>
			</Container>
		</div>
	);
};

export default Actions;
