import { useForm } from "@tanstack/react-form";
import { Button } from "~/components/ui/button";
import { CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { UrlSchema, type UrlSchemaType } from "~/lib/schemas";

type FormUrlProps = {
	setForm: (value: UrlSchemaType) => void;
};

export default function FormUrl({ setForm }: FormUrlProps) {
	const form = useForm({
		defaultValues: {
			url: "",
		},
		validators: {
			onChange: UrlSchema,
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
				<CardDescription>Pon una URL valida para crear su QR</CardDescription>
			</CardHeader>
			<CardContent className="mt-4 flex flex-col gap-4">
				<Label>URL</Label>
				<form.Field name="url">
					{(field) => (
						<>
							<Input
								type="text"
								name={field.name}
								value={field.state.value}
								onChange={(e) => field.handleChange(e.target.value)}
								placeholder="https://example.com"
							/>
						</>
					)}
				</form.Field>
				<Button type="submit">Submit</Button>
				{form.state.errors.length > 0 && (
					<ul className="list-inside list-disc text-red-600 text-xs">
						{form.state.errors[0]?.url?.[0]?.message && <li>{form.state.errors[0].url[0].message}</li>}
					</ul>
				)}
			</CardContent>
		</form>
	);
}
