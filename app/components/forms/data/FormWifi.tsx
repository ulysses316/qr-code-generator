import { useForm } from "@tanstack/react-form";
import { Button } from "~/components/ui/button";
import { CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";
import { WifiSquema, type WifiSquemaType } from "~/lib/schemas";

type FormUrlProps = {
	setForm: (value: WifiSquemaType) => void;
};

export default function FormWifi({ setForm }: FormUrlProps) {
	const form = useForm({
		defaultValues: {
			type: "",
			name: "",
			password: "",
		},
		validators: {
			onChange: WifiSquema,
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
				<CardTitle>Crea el QR para conectarte a una red wifi</CardTitle>
			</CardHeader>
			<CardContent className="mt-4 flex flex-col gap-4">
				<Label>Nombre de la red Wifi</Label>
				<form.Field name="name">
					{(field) => (
						<>
							<Input
								type="text"
								name={field.name}
								value={field.state.value}
								onChange={(e) => field.handleChange(e.target.value)}
								placeholder="RED2540"
							/>
						</>
					)}
				</form.Field>
				<Label>Contraseña de la red Wifi</Label>
				<form.Field name="password">
					{(field) => (
						<>
							<Input
								type="text"
								name={field.name}
								value={field.state.value}
								onChange={(e) => field.handleChange(e.target.value)}
								placeholder="Password"
							/>
						</>
					)}
				</form.Field>
				<Label>Tipo de red Wifi</Label>
				<form.Field name="type">
					{(field) => (
						<Select
							value={form.state.values.type}
							onValueChange={(value) => {
								field.handleChange(value);
							}}
						>
							<SelectTrigger className="col-span-2 w-full">
								<SelectValue />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="WPA/WPA2">WPA</SelectItem>
								<SelectItem value="WEP">WEP</SelectItem>
							</SelectContent>
						</Select>
					)}
				</form.Field>
				<Button type="submit">Submit</Button>
				{form.state.errors.length > 0 && (
					<ul className="list-inside list-disc text-red-600 text-xs">
						{form.state.errors[0]?.type?.[0]?.message && <li>{form.state.errors[0].type[0].message}</li>}
					</ul>
				)}
			</CardContent>
		</form>
	);
}
