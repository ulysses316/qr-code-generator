import type { DotType, Options } from "qr-code-styling";
import type React from "react";
import { useEffect, useReducer } from "react";
import { colorOptionsReducer, initialColorOptions } from "~/components/forms/ColorReducer";
import type { QRAction } from "~/components/qr/qrReducer";
import { CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { Label } from "~/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";
import { Switch } from "~/components/ui/switch";
import ColorsPicker from "../ColorsPicker";

type FormCustomAwesomeProps = {
	QROptions: Partial<Options>;
	dispatch: React.ActionDispatch<[action: QRAction]>;
};

export default function DotsConfig({ QROptions, dispatch }: FormCustomAwesomeProps) {
	const [colorsDots, dispatchDots] = useReducer(colorOptionsReducer, initialColorOptions);

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
	}, [colorsDots]);

	return (
		<form className="grid grid-cols-1 gap-4 overflow-y-scroll">
			<CardHeader>
				<CardTitle>Estilo de Puntos</CardTitle>
				<CardDescription>Personaliza la apariencia de los puntos del código QR</CardDescription>
			</CardHeader>
			<CardContent className="grid grid-cols-2 gap-4">
				<div className="col-span-2">
					<Label className="mb-1">Forma de los puntos</Label>
					<Select
						value={QROptions.dotsOptions?.type}
						onValueChange={(value) => {
							dispatch({
								type: "SET_DOTOPTIONS",
								payload: { ...QROptions.dotsOptions, type: value as DotType },
							});
						}}
					>
						<SelectTrigger className="w-full">
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
				</div>

				<div className="col-span-2 flex items-center justify-between rounded-lg bg-gray-50 p-3">
					<div className="space-y-1">
						<Label htmlFor="roundSize" className="font-medium text-sm">
							Tamaño Redondeado
						</Label>
						<p className="mr-4 text-muted-foreground text-xs">Ajusta automáticamente el tamaño para mejor apariencia</p>
					</div>
					<Switch
						id="roundSize"
						checked={QROptions.dotsOptions?.roundSize || false}
						onCheckedChange={(checked) =>
							dispatch({ type: "SET_DOTOPTIONS", payload: { ...QROptions.dotsOptions, roundSize: checked } })
						}
					/>
				</div>

				<div className="col-span-2">
					<Label className="font-medium text-sm">Color de los puntos</Label>
					<ColorsPicker colors={colorsDots} dispatch={dispatchDots} />
				</div>
			</CardContent>
		</form>
	);
}
