// import { useEffect, useReducer, useState } from "react";
// import FormCustom from "~/components/forms/custom/FormCustom";
// import FormUrl from "~/components/forms/data/FormUrl";

import QRCustomizeContainer from "~/components/local/QRCustomizeContainer";
import QRDataContainer from "~/components/local/QRDataContainer";
// import QRStylus from "~/components/local/QRStylus";
// import { initialQROptions, qrOptionsReducer } from "~/components/qr/qrReducer";
// import type { UrlSchemaType } from "~/lib/schemas";

export default function Url() {
	return (
		<main className="grid min-h-screen w-full grid-cols-1 gap-4 py-2 md:grid-cols-5 md:gap-2">
			<QRDataContainer>
				{/* <FormUrl setForm={setFormData} /> */}
				{":)"}
			</QRDataContainer>
			<QRCustomizeContainer>
				{/* {formData && formData.url !== "" && (
					<>
						<QRStylus options={QROptions} />
						<FormCustom dispatch={dispatch} QROptions={QROptions} />
					</>
				)} */}
				{":)"}
			</QRCustomizeContainer>
		</main>
	);
}
