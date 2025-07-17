import { useEffect, useReducer, useState } from "react";
import BasicConf from "~/components/forms/custom/BasicQRConf";
import BgConfig from "~/components/forms/custom/BgConfig";
import DotsConfig from "~/components/forms/custom/DotsConfig";
import ImageQRConfir from "~/components/forms/custom/ImageQRConfir";
import SquareConfig from "~/components/forms/custom/SquareConfig";
import FormEvent from "~/components/forms/data/FormEvent";
import OptionSelection from "~/components/forms/OptionSelection";
import QRStylus from "~/components/qr/QRStylus";
import { initialQROptions, qrOptionsReducer } from "~/components/qr/qrReducer";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import type { EventSchemaType } from "~/lib/schemas";

export default function Url() {
	const [formData, setFormData] = useState<EventSchemaType | null>(null);
	const [QROptions, dispatch] = useReducer(qrOptionsReducer, initialQROptions);

	useEffect(() => {
		if (formData) {
			const toICSDate = (date: Date) => `${date.toISOString().replace(/[-:]/g, "").split(".")[0]}Z`;

			const fields = [
				"BEGIN:VCALENDAR",
				"VERSION:2.0",
				"BEGIN:VEVENT",
				formData.title ? `SUMMARY:${formData.title}` : null,
				formData.description ? `DESCRIPTION:${formData.description}` : null,
				formData.location ? `LOCATION:${formData.location}` : null,
				formData.date_start ? `DTSTART:${toICSDate(new Date(formData.date_start))}` : null,
				formData.date_end ? `DTEND:${toICSDate(new Date(formData.date_end))}` : null,
				"END:VEVENT",
				"END:VCALENDAR",
			]
				.filter(Boolean)
				.join("\n");

			dispatch({ type: "SET_DATA", payload: fields });
		}
	}, [formData]);

	return (
		<main className="grid min-h-screen w-full grid-cols-1 gap-4 bg-stone-100 py-2 md:grid-cols-2">
			<Card className="p-4">
				<h1 className="font-bold text-2xl">Evento</h1>
				<QRStylus options={QROptions} />
			</Card>
			<Card className="row-span-2 p-4">
				<div>
					<h2 className="font-bold">Opciones de Personalización</h2>
					<p className="text-sm">Haz clic en cualquier opción para personalizar tu código QR</p>
				</div>
				<OptionSelection title="Contenido del QR" description="El contenido que almacenara tu QR" icon="content">
					<FormEvent setForm={setFormData} />
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
							{formData?.title}, {formData?.description}
						</div>
					</div>
				</CardContent>
			</Card>
		</main>
	);
}
