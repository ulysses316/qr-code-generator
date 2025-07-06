import QRStylus from "~/components/local/QRStylus";

export function meta() {
	return [{ title: "New React Router App" }, { name: "description", content: "Welcome to React Router!" }];
}

export default function Home() {
	return (
		<main className="flex h-screen w-full items-center justify-center">
			<div className="h-screen w-full">
				<QRStylus options={{ data: "hola como estas" }} />
			</div>
		</main>
	);
}
