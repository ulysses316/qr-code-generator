export function meta() {
	return [{ title: "QR Code Generator" }, { name: "description", content: "Aplicacion para crear QRs" }];
}

export default function Home() {
	return (
		<main className="flex h-screen w-full items-center justify-center">
			<div className="flex h-screen w-full items-center justify-center">
				<img className="aspect-square w-full sm:w-96" src="/qr-code.png" alt="" />
			</div>
		</main>
	);
}
