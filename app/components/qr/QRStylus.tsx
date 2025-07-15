import { Moon, Sun } from "lucide-react";
import type QRCodeStyling from "qr-code-styling";
import type { Options } from "qr-code-styling";
import { useEffect, useRef, useState } from "react";
import { ToggleGroup, ToggleGroupItem } from "~/components/ui/toggle-group";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";

export default function QRStylus({ options }: { options: Partial<Options> }) {
	const qrRef = useRef<HTMLDivElement | null>(null);
	const qrInstance = useRef<QRCodeStyling | null>(null);
	const [theme, setTheme] = useState<boolean>(true);
	const [isReady, setIsReady] = useState(false);

	useEffect(() => {
		const loadQRCode = async () => {
			const { default: QRCodeStyling } = await import("qr-code-styling");

			if (!qrInstance.current) {
				if (!options.data || options.data === "") {
					setIsReady(false);
					return;
				}

				qrInstance.current = new QRCodeStyling(options);

				if (qrRef.current) {
					qrRef.current.innerHTML = "";
					qrInstance.current.append(qrRef.current);
					setIsReady(true);
				}
			} else {
				if (!options.data || options.data === "") {
					setIsReady(false);
					return;
				}

				qrInstance.current.update(options);
				setIsReady(true);
			}
		};

		loadQRCode();
	}, [options]);

	const handleDownload = async () => {
		if (!isReady || !qrRef.current) return;

		const svgElement = qrRef.current.querySelector("svg");
		if (!svgElement) return;

		// Serializar SVG
		const svgString = new XMLSerializer().serializeToString(svgElement);
		const svgBlob = new Blob([svgString], { type: "image/svg+xml" });
		const url = URL.createObjectURL(svgBlob);

		// Crear imagen temporal
		const img = new Image();
		img.onload = () => {
			// Dibujar en canvas y exportar a PNG
			const canvas = document.createElement("canvas");
			canvas.width = 900;
			canvas.height = 900;
			const ctx = canvas.getContext("2d");
			if (ctx) {
				ctx.fillStyle = "#fff";
				ctx.fillRect(0, 0, canvas.width, canvas.height);
				ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
				canvas.toBlob((blob) => {
					if (blob) {
						const pngUrl = URL.createObjectURL(blob);
						const a = document.createElement("a");
						a.href = pngUrl;
						a.download = "qr-code.png";
						a.click();
						URL.revokeObjectURL(pngUrl);
					}
				}, "image/png");
			}
			URL.revokeObjectURL(url);
		};
		img.src = url;
	};

	return (
		<div
			className={`relative mb-4 grid w-full grid-cols-1 justify-items-center gap-4 bg-sidebar-foreground py-6 ${!theme && "dark"}`}
		>
			<div ref={qrRef}></div>
			{!isReady && <Skeleton className="h-[300px] w-[300px]" />}
			<Button variant={"secondary"} onClick={handleDownload} type="button" disabled={!isReady}>
				Descargar
			</Button>
			<div>
				<ToggleGroup
					className="top-5 left-5 bg-sidebar-accent text-sidebar-foreground lg:absolute"
					type="multiple"
					variant="outline"
				>
					<ToggleGroupItem onClick={() => setTheme(true)} value="bold" aria-label="Toggle bold">
						<Sun className="h-4 w-4" />
					</ToggleGroupItem>
					<ToggleGroupItem onClick={() => setTheme(false)} value="italic" aria-label="Toggle italic">
						<Moon className="h-4 w-4" />
					</ToggleGroupItem>
				</ToggleGroup>
			</div>
		</div>
	);
}
