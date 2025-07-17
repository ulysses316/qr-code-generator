import { useForm } from "@tanstack/react-form";
import { Button } from "~/components/ui/button";
import { CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { GeoSquema, type GeoSquemaType } from "~/lib/schemas";

type FormUrlProps = {
	setForm: (value: GeoSquemaType) => void;
};

export default function FormGeo({ setForm }: FormUrlProps) {
	const form = useForm({
		defaultValues: {
			lat: "",
			lng: "",
		},
		validators: {
			onChange: GeoSquema,
		},
		onSubmit: ({ value }) => {
			setForm(value);
		},
	});

	const handdleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		e.stopPropagation();
		form.handleSubmit();
	};

	return (
		<form onSubmit={handdleSubmit}>
			<CardHeader>
				<CardTitle>Crea el QR de una ubicacion</CardTitle>
				<CardDescription>Abrira en la aplicacion de mapas perferida del usuario</CardDescription>
			</CardHeader>
			<CardContent className="mt-4 flex flex-col gap-4">
				<div className="col-span-2 rounded-lg border border-blue-200 bg-blue-50 p-3">
					<h4 className="mb-1 font-medium text-blue-900 text-sm">📝 Nota</h4>
					<p className="text-blue-700 text-xs">
						¿Como puedo obtener la latitud y longitud en google maps? da{" "}
						<a
							className="underline"
							href="https://support.google.com/maps/answer/18539?hl=es&co=GENIE.Platform%3DAndroid"
							target="_blank"
							rel="noopener noreferrer"
						>
							click aqui
						</a>
					</p>
				</div>
				<Label>Latitud</Label>
				<form.Field name="lat">
					{(field) => (
						<>
							<Input
								type="text"
								name={field.name}
								value={field.state.value}
								onChange={(e) => field.handleChange(e.target.value)}
								placeholder="19.434386978652295"
							/>
						</>
					)}
				</form.Field>
				<Label>Longitud</Label>
				<form.Field name="lng">
					{(field) => (
						<>
							<Input
								type="text"
								name={field.name}
								value={field.state.value}
								onChange={(e) => field.handleChange(e.target.value)}
								placeholder="-99.13313751153174"
							/>
						</>
					)}
				</form.Field>
				<Button type="submit">Submit</Button>
				{form.state.errors.length > 0 && (
					<ul className="list-inside list-disc text-red-600 text-xs">
						{form.state.errors[0]?.lat?.[0]?.message && <li>{form.state.errors[0].lat[0].message}</li>}
						{form.state.errors[0]?.lng?.[0]?.message && <li>{form.state.errors[0].lng[0].message}</li>}
					</ul>
				)}
			</CardContent>
		</form>
	);
}
