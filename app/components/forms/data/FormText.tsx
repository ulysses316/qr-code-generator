import { useForm } from "@tanstack/react-form";
import { Button } from "~/components/ui/button";
import { CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { Label } from "~/components/ui/label";
import { Textarea } from "~/components/ui/textarea";

type FormUrlProps = {
	setForm: (value: string) => void;
};

export default function FormText({ setForm }: FormUrlProps) {
	const form = useForm({
		defaultValues: {
			text: "",
		},
		onSubmit: ({ value }) => {
			setForm(value.text);
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
				<Label>Texto libre</Label>
				<form.Field name="text">
					{(field) => (
						<>
							<Textarea
								name={field.name}
								value={field.state.value}
								onChange={(e) => field.handleChange(e.target.value)}
							/>
						</>
					)}
				</form.Field>
				<Button type="submit">Submit</Button>
			</CardContent>
		</form>
	);
}
