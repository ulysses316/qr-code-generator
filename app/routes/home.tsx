export function meta() {
	return [{ title: "QR Code Generator" }, { name: "description", content: "Aplicacion para crear QRs" }];
}

export default function Home() {
	return (
		<main className="flex h-screen w-full items-center justify-center">
			<div className="h-screen w-full flex justify-center items-center">
				<img className="w-full sm:w-96 aspect-square" src="/qr-code.png" alt="" />				
			</div>
		</main>
	);
}
