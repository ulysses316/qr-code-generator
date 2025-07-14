import type { Options } from "qr-code-styling";
import type React from "react";
import { useEffect, useReducer } from "react";
import { colorOptionsReducer } from "~/components/forms/ColorReducer";
import type { QRAction } from "~/components/qr/qrReducer";
import { CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { Label } from "~/components/ui/label";
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
		const prevGradient = QROptions.dotsOptions?.gradient;

		if (!prevGradient?.type) {
			console.error("Gradient type is missing!");
			return;
		}
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

				<div className="col-span-2">
					<Label className="font-medium text-sm">Color de los puntos</Label>
					<ColorsPicker colors={bgColors} dispatch={dispatchBgColors} />
				</div>
			</CardContent>
		</form>
	);
}
