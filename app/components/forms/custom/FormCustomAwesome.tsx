import { useForm } from "@tanstack/react-form";
import { Button } from "~/components/ui/button";
import { Checkbox } from "~/components/ui/checkbox";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { type QROptionsAwesomeSquemaType } from "~/lib/schemas";
import { FileUpload } from "~/components/v0/file-upload";
import type React from "react";
import type { AwesomeQRCodeProps } from "@awesomeqr/react";

type FormCustomAwesomeProps = {
    setQROptions: (value: AwesomeQRCodeProps["options"]) => void;
};

export default function FormCustomAwesome({ setQROptions }: FormCustomAwesomeProps) {
    const form = useForm({
        defaultValues: {
            size: 400,
            margin: 20,
            correctLevel: 0,
            maskPattern: 0,
            version: 2,
            // components: "",
            colorDark: "#000000",
            colorLight: "#ffffff",
            autoColor: true,
            backgroundImage: "",
            backgroundDimming: "rgba(0, 0, 0, 0)",
            gifBackground: "",
            whiteMargin: true,
            logoImage: "",
            logoScale: 0.2,
            logoMargin: 6,
            logoCornerRadius: 8,
        },
        onSubmit: ({ value  }) => {
            setQROptions(value);
        },
    });

    const handdleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
    };

    const handleReset = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        form.reset();
        setQROptions(form.state.values);
    };

    return (
        <form className="grid md:grid-cols-2 grid-cols-1 gap-x-4 gap-y-6" onChange={handdleSubmit}>
            <div className="flex flex-col gap-2">
                <Label>Size</Label>
                <form.Field name="size">
                    {(field) => (
                        <Input
                            type="number"
                            name={field.name}
                            value={field.state.value}
                            onChange={(e) => field.handleChange(Number(e.target.value))}
                        />
                    )}
                </form.Field>
            </div>
            <div className="flex flex-col gap-2">
                <Label>Margen</Label>
                <form.Field name="margin">
                    {(field) => (
                        <Input
                            type="number"
                            name={field.name}
                            value={field.state.value}
                            onChange={(e) => field.handleChange(Number(e.target.value))}
                        />
                    )}
                </form.Field>
            </div>
            <div className="flex flex-col gap-2">
                <Label>Niverl de correccion</Label>
                <form.Field name="correctLevel">
                    {(field) => (
                        <Input
                            type="number"
                            name={field.name}
                            value={field.state.value}
                            onChange={(e) => field.handleChange(Number(e.target.value))}
                        />
                    )}
                </form.Field>
            </div>
            <div className="flex flex-col gap-2">
                <Label>Patron de Mascara</Label>
                <form.Field name="maskPattern">
                    {(field) => (
                        <Input
                            type="number"
                            name={field.name}
                            value={field.state.value}
                            onChange={(e) => field.handleChange(Number(e.target.value))}
                        />
                    )}
                </form.Field>
            </div>
            <div className="flex flex-col gap-2">
                <Label>Version</Label>
                <form.Field name="version">
                    {(field) => (
                        <Input
                            type="number"
                            name={field.name}
                            value={field.state.value}
                            onChange={(e) => field.handleChange(Number(e.target.value))}
                        />
                    )}
                </form.Field>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2">
                <div>
                    <Label>colorDark</Label>
                    <form.Field name="colorDark">
                        {(field) => (
                            <Input
                                type="color"
                                name={field.name}
                                value={field.state.value}
                                onChange={(e) => field.handleChange(e.target.value)}
                            />
                        )}
                    </form.Field>
                </div>
                <div>
                    <Label>colorLight</Label>
                    <form.Field name="colorLight">
                        {(field) => (
                            <Input
                                type="color"
                                name={field.name}
                                value={field.state.value}
                                onChange={(e) => field.handleChange(e.target.value)}
                            />
                        )}
                    </form.Field>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <Label>autoColor</Label>
                <form.Field name="autoColor">
                    {(field) => (
                        <Checkbox
                            name={field.name}
                            checked={field.state.value}
                            onCheckedChange={(checked) => {
                                if (checked !== "indeterminate") {
                                    field.handleChange(checked);
                                }
                            }}
                        />
                    )}
                </form.Field>
                <Label>whiteMargin</Label>
                <form.Field name="whiteMargin">
                    {(field) => (
                        <Checkbox
                            name={field.name}
                            checked={field.state.value}
                            onCheckedChange={(checked) => {
                                if (checked !== "indeterminate") {
                                    field.handleChange(checked);
                                }
                            }}
                        />
                    )}
                </form.Field>
            </div>
            <div className="flex flex-col gap-2">
                <Label>backgroundDimming</Label>
                <form.Field name="backgroundDimming">
                    {(field) => (
                        <Input
                            type="color"
                            name={field.name}
                            value={field.state.value}
                            onChange={(e) => field.handleChange(e.target.value)}
                        />
                    )}
                </form.Field>
            </div>
            <div className="flex flex-col gap-2">
                <Label>backgroundImage</Label>
                <form.Field name="backgroundImage">
                    {(field) => (
                        <Input
                            type="text"
                            name={field.name}
                            value={field.state.value}
                            onChange={(e) => field.handleChange(e.target.value)}
                        />
                    )}
                </form.Field>
            </div>
            <div className="flex flex-col gap-2">
                <Label>gifBackground</Label>
                <form.Field name="gifBackground">
                    {(field) => (
                        <Input
                            type="text"
                            name={field.name}
                            value={field.state.value}
                            onChange={(e) => field.handleChange(e.target.value)}
                        />
                    )}
                </form.Field>
            </div>
            <div className="flex flex-col gap-2">
                <Label>logoImage</Label>
                <form.Field name="logoImage">
                    {(field) => (
                        <Input
                            type="text"
                            name={field.name}
                            value={field.state.value}
                            onChange={(e) => field.handleChange(e.target.value)}
                        />
                    )}
                </form.Field>
            </div>
            <div className="flex flex-col gap-2">
                <Label>logoScale</Label>
                <form.Field name="logoScale">
                    {(field) => (
                        <Input
                            type="number"
                            name={field.name}
                            value={field.state.value}
                            onChange={(e) => field.handleChange(Number(e.target.value))}
                        />
                    )}
                </form.Field>
            </div>
            <div className="flex flex-col gap-2">
                <Label>logoMargin</Label>
                <form.Field name="logoMargin">
                    {(field) => (
                        <Input
                            type="number"
                            name={field.name}
                            value={field.state.value}
                            onChange={(e) => field.handleChange(Number(e.target.value))}
                        />
                    )}
                </form.Field>
            </div>
            <div className="flex flex-col gap-2">
                <Label>logoCornerRadius</Label>
                <form.Field name="logoCornerRadius">
                    {(field) => (
                        <Input
                            type="number"
                            name={field.name}
                            value={field.state.value}
                            onChange={(e) => field.handleChange(Number(e.target.value))}
                        />
                    )}
                </form.Field>
            </div>
            <Button className="col-span-2" type="reset" onClick={(e) => handleReset(e)} variant={"destructive"}>Reset</Button>
        </form>
    );
}
