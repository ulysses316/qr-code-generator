import type { ErrorCorrectionLevel, Options, ShapeType } from "qr-code-styling";
import type React from "react";
import type { QRAction } from "~/components/qr/qrReducer";
import { CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";

type FormCustomAwesomeProps = {
	QROptions: Partial<Options>;
	dispatch: React.ActionDispatch<[action: QRAction]>;
};

export default function BasicConf({ QROptions, dispatch }: FormCustomAwesomeProps) {
	return (
		<form className="grid grid-cols-1 gap-4 overflow-y-scroll">
			<CardHeader>
				<CardTitle>Configuración Básica</CardTitle>
				<CardDescription>Configura el contenido y las propiedades básicas de tu código QR</CardDescription>
			</CardHeader>
			<CardContent className="grid grid-cols-2 gap-4">
				<div className="col-span-2">
					<Label className="mb-1">Margen</Label>
					<Input
						type="number"
						min={0}
						max={15}
						step={1}
						name={"Margin"}
						value={QROptions.imageOptions?.margin}
						onChange={(e) =>
							dispatch({
								type: "SET_IMAGEOPTIONS",
								payload: { ...QROptions.imageOptions, margin: Number(e.target.value) },
							})
						}
					/>
				</div>
				<div className="col-span-2">
					<Label className="mb-1">Forma</Label>
					<Select
						value={QROptions.shape}
						onValueChange={(value) => {
							dispatch({ type: "SET_SHAPE", payload: value as ShapeType });
						}}
					>
						<SelectTrigger className="w-full">
							<SelectValue placeholder="Shape" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="circle">Circle</SelectItem>
							<SelectItem value="square">Square</SelectItem>
						</SelectContent>
					</Select>
				</div>

				<div className="col-span-2">
					<Label className="mb-1">Forma</Label>
					<Select
						value={QROptions.qrOptions?.errorCorrectionLevel}
						onValueChange={(value) => {
							dispatch({
								type: "SET_QROPTIONS",
								payload: { ...QROptions.qrOptions, errorCorrectionLevel: value as ErrorCorrectionLevel },
							});
						}}
					>
						<SelectTrigger className="w-full">
							<SelectValue placeholder="Nivel de corrección" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="L">Bajo (L) - 7%</SelectItem>
							<SelectItem value="M">Medio (M) - 15%</SelectItem>
							<SelectItem value="Q">Alto (Q) - 25%</SelectItem>
							<SelectItem value="H">Muy Alto (H) - 30%</SelectItem>
						</SelectContent>
					</Select>
				</div>
			</CardContent>
		</form>
	);
}
