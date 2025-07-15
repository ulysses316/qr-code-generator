import type { CornerSquareType, DotType, GradientType, Options } from "qr-code-styling";
import type React from "react";
import { useEffect, useReducer } from "react";
import { colorOptionsReducer, initialColorOptions } from "~/components/forms/ColorReducer";
import type { QRAction } from "~/components/qr/qrReducer";
import { CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { Label } from "~/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";
import { Separator } from "~/components/ui/separator";
import ColorsPicker from "../ColorsPicker";
import { Slider } from "~/components/ui/slider";

type FormCustomAwesomeProps = {
	QROptions: Partial<Options>;
	dispatch: React.ActionDispatch<[action: QRAction]>;
};

export default function SquareConfig({ QROptions, dispatch }: FormCustomAwesomeProps) {
	const [cornerSquareColors, dispatchCornerSquareColors] = useReducer(colorOptionsReducer, initialColorOptions);
	const [cornerDotsColors, dispatchCornerDotsColors] = useReducer(colorOptionsReducer, initialColorOptions);

	// biome-ignore lint : Only want to execute this code when data change
	useEffect(() => {
		const newSquareStops = Object.values(cornerSquareColors).map(({ id, ...rest }) => rest);
		const prevGradient = QROptions.dotsOptions?.gradient;

		if (!prevGradient?.type) {
			console.error("Gradient type is missing!");
			return;
		}
		dispatch({
			type: "SET_CORNERSSQUAREOPTIONS",
			payload: {
				...QROptions.cornersSquareOptions,
				gradient: {
					...QROptions.cornersSquareOptions?.gradient,
					type: prevGradient.type,
					colorStops: [...newSquareStops],
				},
			},
		});
	}, [cornerSquareColors]);

	// biome-ignore lint : Only want to execute this code when data change
	useEffect(() => {
		const newSquareDotsStops = Object.values(cornerDotsColors).map(({ id, ...rest }) => rest);
		const prevGradient = QROptions.dotsOptions?.gradient;

		if (!prevGradient?.type) {
			console.error("Gradient type is missing!");
			return;
		}
		dispatch({
			type: "SET_CORNERSDOTOPTIONS",
			payload: {
				...QROptions.cornersDotOptions,
				gradient: {
					...QROptions.cornersDotOptions?.gradient,
					type: prevGradient.type,
					colorStops: [...newSquareDotsStops],
				},
			},
		});
	}, [cornerDotsColors]);

	return (
		<form className="grid grid-cols-1 gap-4 overflow-y-scroll">
			<CardHeader>
				<CardTitle>Configuración de Esquinas</CardTitle>
				<CardDescription>Personaliza las esquinas y puntos de esquina del código QR</CardDescription>
			</CardHeader>
			<CardContent className="grid grid-cols-2 gap-4">
				<div className="col-span-2 rounded-lg border border-amber-200 bg-amber-50 p-3">
					<h4 className="mb-1 font-medium text-amber-900 text-sm">💡 Consejo</h4>
					<p className="text-amber-700 text-xs">
						Las esquinas son elementos importantes para el reconocimiento del QR. Mantén un buen contraste.
					</p>
				</div>

				<div className="col-span-2 my-4 flex items-center gap-2">
					<div className="h-3 w-3 rounded bg-blue-500"></div>
					<h4 className="font-medium">Esquinas Cuadradas</h4>
				</div>

				<div className="col-span-2">
					<Label className="mb-1">Forma de los puntos</Label>
					<Select
						value={QROptions.dotsOptions?.type}
						onValueChange={(value) => {
							dispatch({
								type: "SET_CORNERSSQUAREOPTIONS",
								payload: { ...QROptions.dotsOptions, type: value as CornerSquareType },
							});
						}}
					>
						<SelectTrigger className="w-full">
							<SelectValue placeholder="Tipo" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="dot">Dot</SelectItem>
							<SelectItem value="square">Square</SelectItem>
							<SelectItem value="extra-rounded">Extra Rounded</SelectItem>
							<SelectItem value="dots">Dots</SelectItem>
							<SelectItem value="rounded">Rounded</SelectItem>
							<SelectItem value="classy">Classy</SelectItem>
							<SelectItem value="classy-rounded">Classy Rounded</SelectItem>
						</SelectContent>
					</Select>
				</div>

				<div className="col-span-2">
					<Label className="font-medium text-sm">Color de los puntos</Label>
					<ColorsPicker colors={cornerSquareColors} dispatch={dispatchCornerSquareColors} />
				</div>

				<div className="col-span-2 space-y-3">
					<Label htmlFor="backgroundRound">Rotacion del background</Label>
					<div className="space-y-3">
						<Slider
							value={[QROptions.cornersSquareOptions?.gradient?.rotation || 0]}
							onValueChange={(value) => {
								if (!QROptions?.cornersSquareOptions?.gradient) return;
								const { colorStops, type } = QROptions.cornersSquareOptions.gradient
								dispatch({
									type: "SET_CORNERSSQUAREOPTIONS",
									payload: { ...QROptions.cornersSquareOptions, gradient: { colorStops: colorStops, type: type, rotation: Number(value) } },
								})
							}
							}
							max={180}
							min={0}
							step={1}
							className="w-full"
						/>
						<div className="flex justify-between text-muted-foreground text-xs">
							<span>0°</span>
							<span className="font-medium">{QROptions.cornersSquareOptions?.gradient?.rotation || 0}</span>
							<span>180°</span>
						</div>
					</div>
				</div>

				<Separator className="col-span-2" />

				<div className="my-4 flex items-center gap-2">
					<div className="h-3 w-3 rounded-full bg-green-500"></div>
					<h4 className="font-medium">Puntos de Esquinas</h4>
				</div>

				<div className="col-span-2">
					<Label className="mb-1">Forma de los puntos</Label>
					<Select
						value={QROptions.dotsOptions?.type}
						onValueChange={(value) => {
							dispatch({
								type: "SET_CORNERSDOTOPTIONS",
								payload: { ...QROptions.dotsOptions, type: value as DotType },
							});
						}}
					>
						<SelectTrigger className="w-full">
							<SelectValue placeholder="Tipo" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="dot">Dot</SelectItem>
							<SelectItem value="dots">Dots</SelectItem>
							<SelectItem value="rounded">Rounded</SelectItem>
							<SelectItem value="classy">Classy</SelectItem>
							<SelectItem value="classy-rounded">Classy Rounded</SelectItem>
							<SelectItem value="square">Square</SelectItem>
							<SelectItem value="extra-rounded">Extra Rounded</SelectItem>
						</SelectContent>
					</Select>
				</div>

				<div className="col-span-2">
					<Label className="font-medium text-sm">Color de los puntos</Label>
					<ColorsPicker colors={cornerDotsColors} dispatch={dispatchCornerDotsColors} />
				</div>


				<Select
					value={QROptions.cornersDotOptions?.gradient?.type}
					onValueChange={(value) => {
						const colorStops = QROptions.cornersDotOptions?.gradient?.colorStops
						if (!colorStops) return;
						dispatch({
							type: "SET_CORNERSDOTOPTIONS",
							payload: { ...QROptions.cornersDotOptions, gradient: { colorStops, type: value as GradientType } },
						});
					}}
				>
					<SelectTrigger className="w-full col-span-2">
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
							value={[QROptions.cornersDotOptions?.gradient?.rotation || 0]}
							onValueChange={(value) => {
								if (!QROptions?.cornersDotOptions?.gradient) return;
								const { colorStops, type } = QROptions.cornersDotOptions.gradient
								dispatch({
									type: "SET_CORNERSDOTOPTIONS",
									payload: { ...QROptions.cornersDotOptions, gradient: { colorStops: colorStops, type: type, rotation: Number(value) } },
								})
							}
							}
							max={180}
							min={0}
							step={1}
							className="w-full"
						/>
						<div className="flex justify-between text-muted-foreground text-xs">
							<span>0°</span>
							<span className="font-medium">{QROptions.cornersDotOptions?.gradient?.rotation || 0}</span>
							<span>180°</span>
						</div>
					</div>
				</div>
			</CardContent>
		</form>
	);
}
