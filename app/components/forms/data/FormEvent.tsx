import { useForm } from "@tanstack/react-form";
import { DatePicker } from "~/components/local/DatePicker";
import { Button } from "~/components/ui/button";
import { CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { EventSchema, type EventSchemaType } from "~/lib/schemas";

type FormUrlProps = {
	setForm: (value: EventSchemaType) => void;
};

const today = new Date();

export default function FormEvent({ setForm }: FormUrlProps) {
	console.log(today);

	const form = useForm({
		defaultValues: {
			title: "",
			description: "",
			location: "",
			date_start: today,
			date_end: today,
		},
		validators: {
			onChange: EventSchema,
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
				<CardTitle>Crea el QR de una URL</CardTitle>
				<CardDescription>Escoge una URL para crear tu URL</CardDescription>
			</CardHeader>
			<CardContent className="mt-4 flex flex-col gap-4">
				<Label>Titulo</Label>
				<form.Field name="title">
					{(field) => (
						<>
							<Input
								type="text"
								name={field.name}
								value={field.state.value}
								onChange={(e) => field.handleChange(e.target.value)}
								placeholder="Nombre del evento"
							/>
						</>
					)}
				</form.Field>
				<Label>Descripcion</Label>
				<form.Field name="description">
					{(field) => (
						<>
							<Input
								type="text"
								name={field.name}
								value={field.state.value}
								onChange={(e) => field.handleChange(e.target.value)}
								placeholder="Descripcion del evento"
							/>
						</>
					)}
				</form.Field>
				<Label>Ubicacion</Label>
				<form.Field name="location">
					{(field) => (
						<>
							<Input
								type="text"
								name={field.name}
								value={field.state.value}
								onChange={(e) => field.handleChange(e.target.value)}
								placeholder="Direccion del evento"
							/>
						</>
					)}
				</form.Field>
				<Label>Fecha de inicio</Label>
				<form.Field name="date_start">
					{(field) => (
						<DatePicker
							date={field.state.value}
							setDate={(value) => {
								if (typeof value === "undefined") return;
								field.handleChange(value);
							}}
						/>
					)}
				</form.Field>
				<Label>Fecha de finalizacion</Label>
				<form.Field name="date_end">
					{(field) => (
						<DatePicker
							date={field.state.value}
							setDate={(value) => {
								if (typeof value === "undefined") return;
								field.handleChange(value);
							}}
						/>
					)}
				</form.Field>
				<Button type="submit">Submit</Button>
			</CardContent>
		</form>
	);
}
