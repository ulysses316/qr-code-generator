import { useEffect, useReducer, useState } from "react";
import BasicConf from "~/components/forms/custom/BasicQRConf";
import BgConfig from "~/components/forms/custom/BgConfig";
import DotsConfig from "~/components/forms/custom/DotsConfig";
import ImageQRConfir from "~/components/forms/custom/ImageQRConfir";
import SquareConfig from "~/components/forms/custom/SquareConfig";
import FormUrl from "~/components/forms/data/FormUrl";
import OptionSelection from "~/components/forms/OptionSelection";
import QRStylus from "~/components/qr/QRStylus";
import { initialQROptions, qrOptionsReducer } from "~/components/qr/qrReducer";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import type { UrlSchemaType } from "~/lib/schemas";
import { SidebarTrigger } from "~/components/ui/sidebar";

export default function Url() {
	const [formData, setFormData] = useState<UrlSchemaType | null>(null);
	const [QROptions, dispatch] = useReducer(qrOptionsReducer, initialQROptions);

	useEffect(() => {
		if (formData && formData?.url !== "") {
			dispatch({ type: "SET_DATA", payload: formData.url });
		}
	}, [formData]);

	return (
		<main className="grid min-h-screen w-full grid-cols-1 gap-4 bg-stone-100 py-2 md:grid-cols-2">
			<Card className="h-fit block md:hidden py-1 rounded-none">
				<SidebarTrigger className="w-12 h-12"/>
			</Card>
			<Card className="p-4">
				<QRStylus options={QROptions} />
			</Card>
			<Card className="row-span-2 p-4">
				<div>
					<h2 className="font-bold">Opciones de Personalización</h2>
					<p className="text-sm">Haz clic en cualquier opción para personalizar tu código QR</p>
				</div>
				<OptionSelection title="Contenido del QR" description="El contenido que almacenara tu QR" icon="content">
					<FormUrl setForm={setFormData} />
				</OptionSelection>
				<OptionSelection
					title="Configuracuion basica"
					description="Configura el contenido y las propiedades básicas de tu código QR"
					icon="settings"
				>
					<BasicConf QROptions={QROptions} dispatch={dispatch} />
				</OptionSelection>
				<OptionSelection
					title="Estilo de Puntos"
					description="Personaliza la apariencia de los puntos del código QR"
					icon="circle"
				>
					<DotsConfig QROptions={QROptions} dispatch={dispatch} />
				</OptionSelection>
				<OptionSelection
					title="Esquinas"
					description="Personaliza las esquinas y puntos de esquina del código QR"
					icon="square"
				>
					<SquareConfig QROptions={QROptions} dispatch={dispatch} />
				</OptionSelection>
				<OptionSelection
					title="Fondo"
					description="Personaliza el color y estilo del fondo de tu código QR"
					icon="palette"
				>
					<BgConfig QROptions={QROptions} dispatch={dispatch} />
				</OptionSelection>
				<OptionSelection
					title="Imagen / Logo"
					description="Añade un logo o imagen al centro de tu código QR"
					icon="image"
				>
					<ImageQRConfir QROptions={QROptions} dispatch={dispatch} />
				</OptionSelection>
			</Card>
			<Card className="bg-white shadow-lg">
				<CardHeader>
					<CardTitle>Información del QR</CardTitle>
				</CardHeader>
				<CardContent className="space-y-3">
					<div className="grid grid-cols-2 gap-4 text-sm">
						<div>
							<span className="font-medium text-gray-700">Contenido: </span>
							{formData?.url}
						</div>
					</div>
				</CardContent>
			</Card>
		</main>
	);
}
