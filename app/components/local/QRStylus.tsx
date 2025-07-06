import { Moon, Sun } from "lucide-react";
import type QRCodeStyling from "qr-code-styling";
import type { Options } from "qr-code-styling";
import { useEffect, useRef, useState } from "react";
import { ToggleGroup, ToggleGroupItem } from "~/components/ui/toggle-group";
import { Button } from "../ui/button";

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

	const handleDownload = () => {
		if (isReady && qrInstance.current) {
			qrInstance.current.download({
				name: "qr-code.png",
				extension: "png", // puedes cambiar a "png" si lo necesitas
			});
		}
	};

	return (
		<div
			className={`relative mb-4 grid w-full grid-cols-1 justify-items-center gap-4 bg-sidebar-foreground py-6 ${!theme && "dark"}`}
		>
			<div ref={qrRef}></div>
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
