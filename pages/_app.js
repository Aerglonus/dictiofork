import "../styles/globals.css";
import { NextUIProvider } from "@nextui-org/react";
import Actions from "../components/Actions";

function MyApp({ Component, pageProps }) {
	return (
		<>
			<NextUIProvider>
				<Actions />
				<Component {...pageProps} />
			</NextUIProvider>
		</>
	);
}

export default MyApp;
