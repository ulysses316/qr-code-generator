import type React from "react";

export default function QRDataContainer({ children }: { children: React.ReactNode }) {
	return <div className="overflow-y-auto rounded-lg border p-4 md:max-h-[calc(100vh-1rem)] col-span-1 sm:col-span-2 lg:col-span-1">{children}</div>;
}
