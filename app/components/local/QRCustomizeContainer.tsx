import type React from "react";

export default function QRCustomizeContainer({ children }: { children: React.ReactNode }) {
	return <div className="col-span-1 sm:col-span-3 lg:col-span-4 overflow-y-auto rounded-lg border p-4 md:max-h-[calc(100vh-1rem)]">{children}</div>;
}
