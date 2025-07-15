import type { ErrorCorrectionLevel, GradientType, Options } from "qr-code-styling";
import type React from "react";
import { useEffect, useReducer } from "react";
import { colorOptionsReducer } from "~/components/forms/ColorReducer";
import type { QRAction } from "~/components/qr/qrReducer";
import { CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { Label } from "~/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";
import { Slider } from "~/components/ui/slider";
import ColorsPicker from "../ColorsPicker";

type FormCustomAwesomeProps = {
	QROptions: Partial<Options>;
	dispatch: React.ActionDispatch<[action: QRAction]>;
};

export default function BgConfig({ QROptions, dispatch }: FormCustomAwesomeProps) {
	const [bgColors, dispatchBgColors] = useReducer(colorOptionsReducer, [
		{ id: "color-0", color: "#ffffff", offset: 0.5 },
	]);

	// biome-ignore lint : Only want to execute this code when data change
	useEffect(() => {
		const newBgStops = Object.values(bgColors).map(({ id, ...rest }) => rest);
		const prevGradient = QROptions.backgroundOptions?.gradient;

		if (!prevGradient?.type) {
			console.error("Gradient type is missing!");
			return;
		}
		console.log(prevGradient.type);

		dispatch({
			type: "SET_BACKGROUNDOPTIONS",
			payload: {
				...QROptions.backgroundOptions,
				gradient: {
					...QROptions.backgroundOptions?.gradient,
					type: prevGradient.type,
					colorStops: [...newBgStops],
				},
			},
		});
	}, [bgColors]);

	return (
		<form className="grid grid-cols-1 gap-4 overflow-y-scroll">
			<CardHeader>
				<CardTitle>Configuración de Fondo</CardTitle>
				<CardDescription>Personaliza el color y estilo del fondo de tu código QR</CardDescription>
			</CardHeader>
			<CardContent className="grid grid-cols-2 gap-4">
				<div className="col-span-2 rounded-lg border border-green-200 bg-green-50 p-3">
					<h4 className="mb-1 font-medium text-green-900 text-sm">✅ Recomendación</h4>
					<p className="text-green-700 text-xs">Usa fondos claros para mejor legibilidad del código QR</p>
				</div>

				<div className="col-span-2 space-y-3">
					<Label htmlFor="backgroundRound">Redondeo de Esquinas</Label>
					<div className="space-y-3">
						<Slider
							value={[QROptions.backgroundOptions?.round || 0]}
							onValueChange={(value) =>
								dispatch({
									type: "SET_BACKGROUNDOPTIONS",
									payload: { ...QROptions.backgroundOptions, round: Number(value) },
								})
							}
							max={1}
							min={0}
							step={0.1}
							className="w-full"
						/>
						<div className="flex justify-between text-muted-foreground text-xs">
							<span>0px (Sin redondeo)</span>
							<span className="font-medium">{QROptions.backgroundOptions?.round || 0}px</span>
							<span>100% (Muy redondeado)</span>
						</div>
					</div>
				</div>

				<Select
					value={QROptions.qrOptions?.errorCorrectionLevel}
					onValueChange={(value) => {
						dispatch({
							type: "SET_QROPTIONS",
							payload: { ...QROptions.qrOptions, errorCorrectionLevel: value as ErrorCorrectionLevel },
						});
					}}
				>
					<SelectTrigger className="col-span-2 w-full">
						<SelectValue placeholder="Nivel de corrección" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="L">Bajo (L) - 7%</SelectItem>
						<SelectItem value="M">Medio (M) - 15%</SelectItem>
						<SelectItem value="Q">Alto (Q) - 25%</SelectItem>
						<SelectItem value="H">Muy Alto (H) - 30%</SelectItem>
					</SelectContent>
				</Select>

				<div className="col-span-2">
					<Label className="font-medium text-sm">Color de los puntos</Label>
					<ColorsPicker colors={bgColors} dispatch={dispatchBgColors} />
				</div>

				<Select
					value={QROptions.backgroundOptions?.gradient?.type}
					onValueChange={(value) => {
						const colorStops = QROptions.backgroundOptions?.gradient?.colorStops;
						if (!colorStops) return;
						dispatch({
							type: "SET_BACKGROUNDOPTIONS",
							payload: { ...QROptions.backgroundOptions, gradient: { colorStops, type: value as GradientType } },
						});
					}}
				>
					<SelectTrigger className="col-span-2 w-full">
						<SelectValue placeholder="Nivel de corrección" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="linear">Lineal</SelectItem>
						<SelectItem value="radial">Radial</SelectItem>
					</SelectContent>
				</Select>

				<div className="col-span-2 space-y-3">
					<Label htmlFor="backgroundRound">Rotacion del background</Label>
					<div className="space-y-3">
						<Slider
							value={[QROptions.backgroundOptions?.gradient?.rotation || 0]}
							onValueChange={(value) => {
								if (!QROptions?.backgroundOptions?.gradient) return;
								const { colorStops, type } = QROptions.backgroundOptions.gradient;
								dispatch({
									type: "SET_BACKGROUNDOPTIONS",
									payload: {
										...QROptions.backgroundOptions,
										gradient: { colorStops: colorStops, type: type, rotation: Number(value) },
									},
								});
							}}
							max={180}
							min={0}
							step={1}
							className="w-full"
						/>
						<div className="flex justify-between text-muted-foreground text-xs">
							<span>0°</span>
							<span className="font-medium">{QROptions.backgroundOptions?.gradient?.rotation || 0}</span>
							<span>180°</span>
						</div>
					</div>
				</div>
			</CardContent>
		</form>
	);
}
