import { AwesomeQRCode } from "@awesomeqr/react";
import { useState } from "react";
import FormCustomAwesome from "~/components/forms/custom/FormCustomAwesome";
import FormUrl from "~/components/forms/data/FormUrl";
import QRCustomizeContainer from "~/components/local/QRCustomizeContainer";
import QRDataContainer from "~/components/local/QRDataContainer";
import type { UrlSchemaType } from "~/lib/schemas";
import type { AwesomeQRCodeProps } from "@awesomeqr/react";

export default function Url() {
    const [formData, setFormData] = useState<UrlSchemaType | null>(null);
    const [QROptions, setQROptions] = useState<AwesomeQRCodeProps | null>(null);

    return (
        <main className="grid min-h-screen w-full grid-cols-1 gap-4 py-2 md:grid-cols-5 md:gap-2">
            <QRDataContainer>
                <FormUrl setForm={setFormData} />
            </QRDataContainer>
            <QRCustomizeContainer>
                {formData && (
                    <>
                        <div className="flex w-full items-center justify-center">
                            <div className="aspect-square w-36">
                                <AwesomeQRCode
                                    options={{
                                        text: formData.url,
                                        ...QROptions
                                    }}
                                />
                            </div>
                        </div>
                        {/* <FileUpload /> */}
                        <FormCustomAwesome setQROptions={setQROptions} />
                    </>
                )}
            </QRCustomizeContainer>
        </main>
    );
}
