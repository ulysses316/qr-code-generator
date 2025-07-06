import type React from "react";

export default function QRDataContainer({ children }: { children: React.ReactNode }) {
	return (
		<div className="col-span-1 overflow-y-auto rounded-lg border p-4 sm:col-span-2 md:max-h-[calc(100vh-1rem)] lg:col-span-1">
			{children}
		</div>
	);
}
