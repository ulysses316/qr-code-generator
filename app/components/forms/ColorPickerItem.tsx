import { X } from "lucide-react";

type removeColor = () => void;
type setColor = (color: string) => void;

export default function ColorPickerItem({
	color,
	removeColor,
	setColor,
}: {
	color: string;
	removeColor: removeColor;
	setColor: setColor;
}) {
	return (
		<div className="group relative">
			<input
				className="h-16 w-16 cursor-pointer rounded-lg p-1 hover:border"
				type="color"
				value={color}
				onChange={(e) => setColor(e.currentTarget.value)}
			/>
			<button type="button" className="absolute top-0 right-0 rounded-full bg-red-500 outline-0" onClick={removeColor}>
				<X className="hidden h-5 w-5 group-hover:block" />
			</button>
		</div>
	);
}
