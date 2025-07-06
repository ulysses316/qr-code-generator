import type {
	CornerDotType,
	CornerSquareType,
	DotType,
	DrawType,
	ErrorCorrectionLevel,
	Options,
	ShapeType,
	TypeNumber,
} from "qr-code-styling";
import type React from "react";
import { useEffect } from "react";
import type { QRAction } from "~/components/qr/qrReducer";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";
import { FileUpload } from "~/components/v0/file-upload";
import { getMinimumQRVersion } from "~/lib/utils";

type FormCustomAwesomeProps = {
	QROptions: Partial<Options>;
	dispatch: React.ActionDispatch<[action: QRAction]>;
};

export default function FormCustom({ QROptions, dispatch }: FormCustomAwesomeProps) {
	// biome-ignore lint : Only want to execute this code on first render.
	useEffect(() => {
		const minQRVersion = getMinimumQRVersion(QROptions.data);
		dispatch({
			type: "SET_QROPTIONS",
			payload: { ...QROptions.qrOptions, typeNumber: Number(minQRVersion) as TypeNumber },
		});
	}, []);

	return (
		<form className="grid grid-cols-1 gap-4 overflow-y-scroll max-h-[calc(100dvh-552px)]">
			<div>
				<Label className="">Configuracion inicial</Label>
			</div>

			<div className="flex flex-col gap-2">
				<Label>Rounded</Label>
				<Input
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
				<Select
					value={QROptions.type}
					onValueChange={(value) => {
						dispatch({ type: "SET_TYPE", payload: value as DrawType });
					}}
				>
					<SelectTrigger>
						<SelectValue placeholder="Type" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="canvas">Canvas</SelectItem>
						<SelectItem value="svg">SVG</SelectItem>
					</SelectContent>
				</Select>

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

			{/* <div className="flex flex-col gap-2">
				<Label>Width</Label>
				<Input
					type="number"
					name={"width"}
					value={QROptions.width} onChange={(e) => dispatch({ type: "SET_WIDTH", payload: Number(e.target.value) })}
				/>
			</div>
			<div className="flex flex-col gap-2">
				<Label>Height</Label>
				<Input
					type="number"
					name={"height"}
					value={QROptions.height} onChange={(e) => dispatch({ type: "SET_HEIGHT", payload: Number(e.target.value) })}
				/>
			</div> */}

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

			<div>
				<Label className="">Configuracion del fondo</Label>
			</div>

			{/* <Select
				value={QROptions.qrOptions?.errorCorrectionLevel}
				onValueChange={(value) => {
					dispatch({
						type: "SET_QROPTIONS",
						payload: { ...QROptions.qrOptions, errorCorrectionLevel: value as ErrorCorrectionLevel },
					});
				}}
			>
				<SelectTrigger>
					<SelectValue placeholder="Tipo" />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value=""></SelectItem>
					<SelectItem value=""></SelectItem>
					<SelectItem value=""></SelectItem>
					<SelectItem value=""></SelectItem>
				</SelectContent>
			</Select> */}

			<Button onClick={() => dispatch({ type: "SET_DEFAULT" })} type="reset" variant={"destructive"}>
				Reset
			</Button>
		</form>
	);
}
