import { ChevronRight, Circle, Image, Palette, Settings, Square, TableOfContents, X } from "lucide-react";
import { useState } from "react";
import { createPortal } from "react-dom";
import { Card } from "../ui/card";

type OptionSelectionProps = {
	title: string;
	description: string;
	icon: "settings" | "circle" | "square" | "palette" | "image" | "content";
	children?: React.ReactNode;
};

export default function OptionSelection({ title, description, icon, children }: OptionSelectionProps) {
	const [showModal, setShowModal] = useState<boolean>(false);
	const icons = {
		settings: Settings,
		circle: Circle,
		square: Square,
		palette: Palette,
		image: Image,
		content: TableOfContents,
	};

	const IconComponent = icons[icon];

	return (
		<>
			<div
				onClick={() => setShowModal(true)}
				className="flex cursor-pointer items-center justify-between gap-2 rounded-md border-2 p-4 transition-colors duration-300 hover:bg-stone-50"
			>
				<div className="flex items-center gap-3">
					<div className="rounded-xl bg-white p-1">
						<IconComponent width={24} height={24} />
					</div>

					<div>
						<h2 className="font-bold text-sm">{title}</h2>
						<p className="text-xs">{description}</p>
					</div>
				</div>

				<ChevronRight />
			</div>

			{children &&
				createPortal(
					<div
						className={`fixed top-0 left-0 z-10 flex h-screen w-screen items-center justify-center p-4 transition-all duration-300 ${showModal ? "translate-x-0" : "translate-x-full"}`}
					>
						<Card className="absolute top-0 right-0 h-full w-auto overflow-y-auto pt-10 lg:min-w-4/12 xl:min-w-5/12">
							{children}
							<div
								className="absolute top-2 right-2 flex aspect-square w-8 cursor-pointer items-center justify-center rounded-lg border-2 border-black"
								onClick={() => setShowModal(false)}
							>
								<X width={24} height={24} />
							</div>
						</Card>
					</div>,
					document.body,
				)}
		</>
	);
}
