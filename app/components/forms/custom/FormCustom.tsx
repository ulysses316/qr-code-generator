import type {
	CornerDotType,
	CornerSquareType,
	DotType,
	ErrorCorrectionLevel,
	Options,
	ShapeType,
	TypeNumber,
} from "qr-code-styling";
import type React from "react";
import { useEffect, useReducer } from "react";
import type { QRAction } from "~/components/qr/qrReducer";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";
import { FileUpload } from "~/components/v0/file-upload";
import { getMinimumQRVersion } from "~/lib/utils";
import { colorOptionsReducer, initialColorOptions } from "~/components/forms/ColorReducer";
import ColorsPicker from "../ColorsPicker";

type FormCustomAwesomeProps = {
	QROptions: Partial<Options>;
	dispatch: React.ActionDispatch<[action: QRAction]>;
};

export default function FormCustom({ QROptions, dispatch }: FormCustomAwesomeProps) {
	const [colorsDots, dispatchDots] = useReducer(colorOptionsReducer, initialColorOptions);
	const [cornerSquareColors, dispatchCornerSquareColors] = useReducer(colorOptionsReducer, initialColorOptions);
	const [cornerDotsColors, dispatchCornerDotsColors] = useReducer(colorOptionsReducer, initialColorOptions);
	const [bgColors, dispatchBgColors] = useReducer(colorOptionsReducer, initialColorOptions);

	// biome-ignore lint : Only want to execute this code when data change
	useEffect(() => {
		const minQRVersion = getMinimumQRVersion(QROptions.data);
		dispatch({
			type: "SET_QROPTIONS",
			payload: { ...QROptions.qrOptions, typeNumber: Number(minQRVersion) as TypeNumber },
		});
	}, [QROptions.data]);

	// biome-ignore lint : Only want to execute this code when data change
	useEffect(() => {
		const newColorStops = Object.values(colorsDots).map(({ id, ...rest }) => rest);
		const prevGradient = QROptions.dotsOptions?.gradient;

		if (!prevGradient?.type) {
			console.error("Gradient type is missing!");
			return;
		}

		dispatch({
			type: "SET_DOTOPTIONS",
			payload: {
				...QROptions.dotsOptions,
				gradient: {
					...QROptions.dotsOptions?.gradient,
					type: prevGradient.type,
					colorStops: [...newColorStops],
				},
			},
		});
	}, [colorsDots])

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
	}, [cornerSquareColors])

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
	}, [cornerDotsColors])

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
	}, [bgColors])




	return (
		<form className="grid max-h-[calc(100dvh-552px)] grid-cols-1 gap-4 overflow-y-scroll">
			<div>
				<Label className="">Configuracion inicial</Label>
			</div>

			<div className="flex flex-col gap-2">
				<Label>Rounded</Label>
				<input
					type="range"
					name={"Margin"}
					min={0}
					max={1}
					step={0.1}
					value={QROptions.backgroundOptions?.round}
					onChange={(e) =>
						dispatch({
							type: "SET_BACKGROUNDOPTIONS",
							payload: { ...QROptions.backgroundOptions, round: Number(e.target.value) },
						})
					}
				/>
			</div>

			<FileUpload accept="image/*" setImage={dispatch} />

			<div className="flex gap-4">
				<div className="flex items-start gap-3">
					<input
						type="checkbox"
						checked={QROptions.imageOptions?.hideBackgroundDots}
						onChange={(e) => {
							console.log(e.target.checked);

							dispatch({
								type: "SET_IMAGEOPTIONS",
								payload: { ...QROptions.imageOptions, hideBackgroundDots: e.target.checked },
							})
						}

						}
					/>
					<div className="grid gap-2">
						<Label htmlFor="terms-2">Ocultar los puntos detras de la imagen</Label>
					</div>
				</div>

				<div className="flex items-start gap-3">
					<input
						type="checkbox"
						checked={QROptions.dotsOptions?.roundSize}
						onChange={(e) =>
							dispatch({
								type: "SET_DOTOPTIONS",
								payload: { ...QROptions.dotsOptions, roundSize: e.target.checked },
							})
						}
					/>
					<div className="grid gap-2">
						<Label htmlFor="terms-2">RoundSize</Label>
					</div>
				</div>

				<div className="flex flex-col gap-2">
					<Label>Tamaño de la imagen</Label>
					<input
						type="range"
						min={0}
						max={1}
						step={0.1}
						name={"Margin"}
						value={QROptions.imageOptions?.imageSize}
						onChange={(e) => dispatch({ type: "SET_IMAGEOPTIONS", payload: { ...QROptions.imageOptions, imageSize: Number(e.target.value) } })}
					/>
				</div>

				<div className="flex flex-col gap-2">
					<Label>Margen de la imagen</Label>
					<input
						type="range"
						min={0}
						max={15}
						step={1}
						name={"Margin"}
						value={QROptions.imageOptions?.margin}
						onChange={(e) => dispatch({ type: "SET_IMAGEOPTIONS", payload: { ...QROptions.imageOptions, margin: Number(e.target.value) } })}
					/>
				</div>

				<Select
					value={QROptions.shape}
					onValueChange={(value) => {
						dispatch({ type: "SET_SHAPE", payload: value as ShapeType });
					}}
				>
					<SelectTrigger>
						<SelectValue placeholder="Shape" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="circle">Circle</SelectItem>
						<SelectItem value="square">Square</SelectItem>
					</SelectContent>
				</Select>

				<Select
					value={QROptions.qrOptions?.errorCorrectionLevel}
					onValueChange={(value) => {
						dispatch({
							type: "SET_QROPTIONS",
							payload: { ...QROptions.qrOptions, errorCorrectionLevel: value as ErrorCorrectionLevel },
						});
					}}
				>
					<SelectTrigger>
						<SelectValue placeholder="Nivel de corrección" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="L">L</SelectItem>
						<SelectItem value="M">M</SelectItem>
						<SelectItem value="Q">Q</SelectItem>
						<SelectItem value="H">H</SelectItem>
					</SelectContent>
				</Select>
			</div>

			<div className="flex flex-col gap-2">
				<Label>Margin</Label>
				<Input
					type="number"
					name={"Margin"}
					value={QROptions.margin}
					onChange={(e) => dispatch({ type: "SET_MARGIN", payload: Number(e.target.value) })}
				/>
			</div>

			<div>
				<Label className="">Configuracion inicial</Label>
			</div>

			<div className="flex flex-col gap-2">
				<Label>Type</Label>
				<Input
					type="number"
					name={"typenumber"}
					value={QROptions.qrOptions?.typeNumber}
					min={getMinimumQRVersion(QROptions.data, QROptions.qrOptions?.errorCorrectionLevel)}
					max={40}
					onChange={(e) =>
						dispatch({
							type: "SET_QROPTIONS",
							payload: { ...QROptions.qrOptions, typeNumber: Number(e.target.value) as TypeNumber },
						})
					}
				/>
			</div>

			<div>
				<Label className="">Configuracion de los puntos</Label>
			</div>

			<Select
				value={QROptions.dotsOptions?.type}
				onValueChange={(value) => {
					dispatch({
						type: "SET_DOTOPTIONS",
						payload: { ...QROptions.dotsOptions, type: value as DotType },
					});
				}}
			>
				<SelectTrigger>
					<SelectValue placeholder="Tipo" />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value="dots">Dots</SelectItem>
					<SelectItem value="rounded">Rounded</SelectItem>
					<SelectItem value="classy">Classy</SelectItem>
					<SelectItem value="classy-rounded">Classy Rounded</SelectItem>
					<SelectItem value="square">Square</SelectItem>
					<SelectItem value="extra-rounded">Extra Rounded</SelectItem>
				</SelectContent>
			</Select>

			<ColorsPicker colors={colorsDots} dispatch={dispatchDots} />

			<div>
				<Label className="">Configuracion de las esquinas</Label>
			</div>

			<Select
				value={QROptions.cornersSquareOptions?.type}
				onValueChange={(value) => {
					dispatch({
						type: "SET_CORNERSSQUAREOPTIONS",
						payload: { ...QROptions.cornersSquareOptions, type: value as CornerSquareType },
					});
				}}
			>
				<SelectTrigger>
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

			<ColorsPicker colors={cornerSquareColors} dispatch={dispatchCornerSquareColors} />

			<div>
				<Label className="">Configuracion de los puntos de las esquinas</Label>
			</div>

			<Select
				value={QROptions.cornersDotOptions?.type}
				onValueChange={(value) => {
					dispatch({
						type: "SET_CORNERSDOTOPTIONS",
						payload: { ...QROptions.cornersDotOptions, type: value as CornerDotType },
					});
				}}
			>
				<SelectTrigger>
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

			<ColorsPicker colors={cornerDotsColors} dispatch={dispatchCornerDotsColors} />

			<div>
				<Label className="">Configuracion del fondo</Label>
			</div>

			<ColorsPicker colors={bgColors} dispatch={dispatchBgColors} />

			<Button onClick={() => dispatch({ type: "SET_DEFAULT" })} type="reset" variant={"destructive"}>
				Reset
			</Button>
		</form>
	);
}
