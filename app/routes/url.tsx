import { AwesomeQRCode } from "@awesomeqr/react";
import { useForm } from "@tanstack/react-form";
import { FileUpload } from "~/components/v0/file-upload";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { UrlSchema } from "~/lib/schemas";

export default function Url() {
    const form = useForm({
        defaultValues: {
            url: "",
        },
        validators: {
            onChange: UrlSchema,
        },
        onSubmit: ({ value }) => {
            console.log("url: ", value.url);
        },
    });

    const handdleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
    };

    return (
        <main className="grid min-h-screen w-full grid-cols-1 md:grid-cols-3 md:gap-2 gap-4 py-2">
            <div className="rounded-lg border p-4 md:max-h-[calc(100vh-1rem)] overflow-y-auto">
                <form className="flex flex-col gap-4" onSubmit={handdleSubmit}>
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
                </form>
            </div>
            <div className="col-span-2 md:max-h-[calc(100vh-1rem)] overflow-y-auto rounded-lg border p-4">
                {form.state.values.url !== "" && (
                    <>
                        <div className="flex w-full items-center justify-center">
                            <div className="aspect-square w-36">
                                <AwesomeQRCode
                                    options={{
                                        text: form.state.values.url,
                                        size: 500,
                                        margin: 20,
                                    }}
                                />
                            </div>
                        </div>
                        <FileUpload />
                    </>
                )}
            </div>
        </main>
    );
}
