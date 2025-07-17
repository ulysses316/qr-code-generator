import { useForm } from "@tanstack/react-form";
import { Button } from "~/components/ui/button";
import { CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";

type FormUrlProps = {
	setForm: (value: Record<string, string>) => void;
};

export default function FormVCard({ setForm }: FormUrlProps) {
	const form = useForm({
		defaultValues: {
			name: "",
			lastname: "",
			company: "",
			title: "",
			tel: "",
			email: "",
			url: "",
			address: "",
			note: "",
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
				<Label>Nombre</Label>
				<form.Field name="name">
					{(field) => (
						<>
							<Input
								type="text"
								name={field.name}
								value={field.state.value}
								onChange={(e) => field.handleChange(e.target.value)}
								placeholder="Joe"
							/>
						</>
					)}
				</form.Field>
				<Label>Apellido</Label>
				<form.Field name="lastname">
					{(field) => (
						<>
							<Input
								type="text"
								name={field.name}
								value={field.state.value}
								onChange={(e) => field.handleChange(e.target.value)}
								placeholder="Doe"
							/>
						</>
					)}
				</form.Field>
				<Label>Comañia</Label>
				<form.Field name="company">
					{(field) => (
						<>
							<Input
								type="text"
								name={field.name}
								value={field.state.value}
								onChange={(e) => field.handleChange(e.target.value)}
								placeholder="Company Inc."
							/>
						</>
					)}
				</form.Field>
				<Label>Puesto</Label>
				<form.Field name="title">
					{(field) => (
						<>
							<Input
								type="text"
								name={field.name}
								value={field.state.value}
								onChange={(e) => field.handleChange(e.target.value)}
								placeholder="CEO"
							/>
						</>
					)}
				</form.Field>
				<Label>Numero telefonico</Label>
				<form.Field name="tel">
					{(field) => (
						<>
							<Input
								type="text"
								name={field.name}
								value={field.state.value}
								onChange={(e) => field.handleChange(e.target.value)}
								placeholder="+525555555555"
							/>
						</>
					)}
				</form.Field>
				<Label>Email</Label>
				<form.Field name="email">
					{(field) => (
						<>
							<Input
								type="text"
								name={field.name}
								value={field.state.value}
								onChange={(e) => field.handleChange(e.target.value)}
								placeholder="email@email.com"
							/>
						</>
					)}
				</form.Field>
				<Label>Sitio web</Label>
				<form.Field name="url">
					{(field) => (
						<>
							<Input
								type="text"
								name={field.name}
								value={field.state.value}
								onChange={(e) => field.handleChange(e.target.value)}
								placeholder="https://www.example.com"
							/>
						</>
					)}
				</form.Field>
				<Label>Direccion</Label>
				<form.Field name="address">
					{(field) => (
						<>
							<Input
								type="text"
								name={field.name}
								value={field.state.value}
								onChange={(e) => field.handleChange(e.target.value)}
								placeholder="Address"
							/>
						</>
					)}
				</form.Field>
				<Label>Nota</Label>
				<form.Field name="note">
					{(field) => (
						<>
							<Input
								type="text"
								name={field.name}
								value={field.state.value}
								onChange={(e) => field.handleChange(e.target.value)}
								placeholder="Note"
							/>
						</>
					)}
				</form.Field>
				<Button type="submit">Submit</Button>
			</CardContent>
		</form>
	);
}
