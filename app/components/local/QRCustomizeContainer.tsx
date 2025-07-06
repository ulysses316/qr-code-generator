import type React from "react";

export default function QRCustomizeContainer({ children }: { children: React.ReactNode }) {
	return (
		<div className="col-span-1 overflow-y-hidden rounded-lg border p-4 sm:col-span-3 md:max-h-[calc(100vh-1rem)] lg:col-span-4">
			{children}
		</div>
	);
}
