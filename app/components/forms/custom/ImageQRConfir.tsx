import type { Options } from "qr-code-styling";
import type React from "react";
import type { QRAction } from "~/components/qr/qrReducer";
import { CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { Label } from "~/components/ui/label";
import { Slider } from "~/components/ui/slider";
import { Switch } from "~/components/ui/switch";
import { FileUpload } from "~/components/v0/file-upload";

type FormCustomAwesomeProps = {
	QROptions: Partial<Options>;
	dispatch: React.ActionDispatch<[action: QRAction]>;
};

export default function ImageQRConfir({ QROptions, dispatch }: FormCustomAwesomeProps) {
	return (
		<form className="grid grid-cols-1 gap-4 overflow-y-scroll">
			<CardHeader>
				<CardTitle>Imagen/Logo</CardTitle>
				<CardDescription>Añade un logo o imagen al centro de tu código QR</CardDescription>
			</CardHeader>
			<CardContent className="grid grid-cols-2 gap-4">
				<div className="col-span-2 rounded-lg border border-blue-200 bg-blue-50 p-3">
					<h4 className="mb-1 font-medium text-blue-900 text-sm">📝 Nota</h4>
					<p className="text-blue-700 text-xs">
						Asegúrate de que la imagen tenga buena resolución y contraste para mejor legibilidad del QR
					</p>
				</div>

				<div className="col-span-2">
					<Label htmlFor="backgroundRound">Subir Imagen</Label>
					<FileUpload accept="image/*" setImage={dispatch} />
				</div>

				<div className="col-span-2 space-y-3">
					<Label htmlFor="imageSize">Tamaño de la Imagen</Label>
					<div className="space-y-3">
						<Slider
							value={[QROptions.imageOptions?.imageSize || 0.4]}
							onValueChange={(value) =>
								dispatch({ type: "SET_IMAGEOPTIONS", payload: { ...QROptions.imageOptions, imageSize: value[0] } })
							}
							max={1}
							min={0.1}
							step={0.05}
							className="w-full"
						/>
						<div className="flex justify-between text-muted-foreground text-xs">
							<span>10%</span>
							<span className="font-medium">{Math.round((QROptions.imageOptions?.imageSize || 0.4) * 100)}%</span>
							<span>100%</span>
						</div>
					</div>
				</div>

				<div className="col-span-2 space-y-3">
					<Label htmlFor="imageMargin">Margen de la Imagen</Label>
					<div className="space-y-3">
						<Slider
							value={[QROptions.imageOptions?.margin || 0]}
							onValueChange={(value) =>
								dispatch({ type: "SET_IMAGEOPTIONS", payload: { ...QROptions.imageOptions, margin: value[0] } })
							}
							max={20}
							min={0}
							step={1}
							className="w-full"
						/>
						<div className="flex justify-between text-muted-foreground text-xs">
							<span>0px</span>
							<span className="font-medium">{QROptions.imageOptions?.margin || 0}px</span>
							<span>20px</span>
						</div>
					</div>
				</div>

				<div className="col-span-2 flex items-center justify-between rounded-lg bg-gray-50 p-3">
					<div className="space-y-1">
						<Label htmlFor="hideBackgroundDots" className="font-medium text-sm">
							Ocultar puntos detrás de la imagen
						</Label>
						<p className="text-muted-foreground text-xs">Mejora la visibilidad del logo</p>
					</div>
					<Switch
						id="hideBackgroundDots"
						checked={QROptions.imageOptions?.hideBackgroundDots || false}
						onCheckedChange={(checked) =>
							dispatch({
								type: "SET_IMAGEOPTIONS",
								payload: { ...QROptions.imageOptions, hideBackgroundDots: checked },
							})
						}
					/>
				</div>
			</CardContent>
		</form>
	);
}
