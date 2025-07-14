import { Plus } from "lucide-react";
import ColorPickerItem from "./ColorPickerItem";
import type { ColorAction, ColorPickerItemProps } from "./ColorReducer";

type ColorPickerComponentProps = {
	colors: ColorPickerItemProps[];
	dispatch: React.ActionDispatch<[action: ColorAction]>;
};

export default function ColorsPicker({ colors, dispatch }: ColorPickerComponentProps) {
	const addColor = () => {
		if (colors.length >= 5) return;
		dispatch({ type: "ADD_COLOR", payload: { color: "#000000", offset: 0 } });
	};

	return (
		<div className="flex items-center justify-between">
			<div className="flex flex-col items-center">
				{colors.map((colorItem) => (
					<ColorPickerItem
						key={colorItem.id}
						color={colorItem.color}
						setColor={(newColor) => dispatch({ type: "SET_COLOR", payload: { color: newColor, id: colorItem.id } })}
						removeColor={() => dispatch({ type: "REMOVE_COLOR", payload: { id: colorItem.id } })}
					/>
				))}
				{colors.length < 5 && (
					<button
						onClick={addColor}
						type="button"
						className="flex h-13 w-13 cursor-pointer items-center justify-center rounded-lg border p-1"
					>
						<Plus />
					</button>
				)}
			</div>
			<div className="px-2">
				{colors.map((colorItem) => (
					<div key={colorItem.id} className="flex flex-col">
						<div className="flex items-center gap-2 py-0.5">
							<div className="h-4 w-4 rounded" style={{ backgroundColor: `${colorItem.color}` }} />
							<input
								min={0}
								max={1}
								step={0.1}
								type="range"
								onChange={(e) =>
									dispatch({ type: "SET_OFFSET", payload: { id: colorItem.id, offset: Number(e.target.value) } })
								}
							/>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
