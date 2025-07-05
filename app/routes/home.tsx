import { AwesomeQRCode } from "@awesomeqr/react";

export function meta() {
	return [{ title: "New React Router App" }, { name: "description", content: "Welcome to React Router!" }];
}

export default function Home() {
	return (
		<main className="flex h-screen w-full items-center justify-center">
			<div className="h-63 w-63">
				<AwesomeQRCode
					options={{
						text: "https://www.google.com",
						size: 250,
						version: 2,
					}}
				/>
			</div>
		</main>
	);
}
