import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import clientPromise from "../lib/mongodb";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//
const CreateWord = ({ days, words }) => {
	/* Destructuring the useForm hook for form validation. */
	const {
		register,
		reset,
		formState: { errors },
		handleSubmit,
	} = useForm();

	/* Setting the state of the component. */
	const [wordsState, setWordsState] = useState([]);
	const [korean, setKorean] = useState("");
	const [loading, setLoading] = useState(false);
	const [english, setEnglish] = useState("");
	const [dayState, setDayState] = useState("");

	useEffect(() => {
		setWordsState(words);
	}, [words]);

	/* Toastify function - a Toast that shows up when the form is submitted succesfully. */
	const promise = () => {
		const resolveAfter3Sec = new Promise((resolve) => setTimeout(resolve, 1000));
		toast.promise(resolveAfter3Sec, {
			theme: "dark",
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: false,
			draggable: false,
			progress: undefined,
			pending: "Adding your word 🧐",
			success: "Word added 👌",
			error: "Promise rejected 🤯",
		});
	};

	/**
	 * When the form is submitted, the data is sent to the server, and the form is reset.
	 */
	const submitForm = async (data, e) => {
		e.target.reset();
		setLoading(true);
		/* Sending the data to the server. */
		let res = await fetch("http://localhost:3005/api/words", {
			method: "POST",
			body: JSON.stringify({
				day: dayState,
				eng: english,
				kor: korean,
				isDone: false,
				isMemorized: false,
			}),
		});
		/* Checking if the response is ok, if it is, it will reset the form, and set the state to empty. */
		if (res.ok) {
			promise();
			setLoading(false);
			setDayState("");
			setEnglish("");
			setKorean("");
			reset();
		}
	};

	return (
		<div className="flex flex-col justify-center items-center w-full pt-4">
			<div className="block p-6 rounded-lg shadow-lg bg-white max-w-sm">
				<form onSubmit={handleSubmit(submitForm)}>
					<div className="form-group mb-6">
						<label
							htmlFor="exampleInputEmail1"
							className="form-label inline-block mb-2 text-gray-700">
							Korean
						</label>
						{/* A form input that is using the react-hook-form library. */}
						<input
							/* A spread operator that is used to pass the props to the input element and check if the Korean word was added if not show required message.*/
							{...register("kore", {
								required: "Korean word required.",
								onChange: (e) => setKorean(e.target.value),
							})}
							type="text"
							value={korean}
							className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
							placeholder="컴퓨터"
						/>
						{/* required message */}
						<p>{errors.kore?.message}</p>
					</div>
					<div className="form-group mb-6">
						<label
							htmlFor="exampleInputWord"
							className="form-label inline-block mb-2 text-gray-700">
							English
						</label>
						<input
							/* A spread operator that is used to pass the props to the input element and check if the English word was added if not show required message.*/
							{...register("engl", {
								required: "English word required.",
								onChange: (e) => setEnglish(e.target.value),
							})}
							value={english}
							type="text"
							className="form-control block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
							placeholder="Computer"
						/>
						{/* required message */}
						<p>{errors.engl?.message}</p>
					</div>
					<div className="form-group mb-6 flex flex-col items-center justify-center">
						<label>Day</label>
						<select
							onChange={(e) => setDayState(e.target.value)}
							className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding  rounded border-none drop-shadow-sm  transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
							value={dayState}>
							{/* Mapping through the days array and returning the day number. */}
							{days.map((dayz, dayzIdx) => {
								return (
									<option
										className="bg-white rounded-0 border-none"
										key={dayz.id}
										value={dayz.day}>
										Day {dayz.day}
									</option>
								);
							})}
						</select>
					</div>
					<div className="flex w-full justify-center items-center">
						<button
							disabled={loading ? true : false}
							type="submit"
							className="
      px-6
      py-2.5
      bg-blue-600
      text-white
      font-medium
      text-xs
      leading-tight
      uppercase
      rounded
      shadow-md
      hover:bg-blue-700 hover:shadow-lg
      focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
      active:bg-blue-800 active:shadow-lg
      transition
      duration-150
      ease-in-out">
							{loading ? "Add" : "Add"}
						</button>
						<ToastContainer
							autoClose={1000}
							closeOnClick
							draggable={false}
							className="fancybar"
							pauseOnFocusLoss={false}
							position="bottom-center"
							theme="dark"
						/>
					</div>
				</form>
			</div>
		</div>
	);
};

export default CreateWord;
export async function getServerSideProps(context) {
	// `await clientPromise` will use the default database passed in the MONGODB_URI
	// However you can use another database (e.g. myDatabase) by replacing the `await clientPromise` with the following code:
	//
	// `const client = await clientPromise`
	// `const db = client.db("myDatabase")`
	//
	// Then you can execute queries against your database like so:
	// db.find({}) or any of the MongoDB Node Driver commands
	let res = await fetch("http://localhost:3005/api/words", {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	});
	/* Getting the data from the server and setting it to the words variable. */
	let words = await res.json();
	/* Connecting to the MongoDB database. */
	const client = await clientPromise;
	/* Connecting to the dictionary database. */
	const db = client.db("dictionary");
	/* Getting the data from the days collection and setting it to the days variable. */
	const days = await db.collection("days").find({}).toArray();
	/* Converting the data from the database to a JSON object. */
	const daysdata = JSON.parse(JSON.stringify(days));
	/* Returning the data from the database to the component. */
	return {
		props: { days: daysdata, words },
	};
}
