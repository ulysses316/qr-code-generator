export type ColorPickerItemProps = {
	id: string; // Cambio de index a id único
	color: string;
	offset: number;
};

export type ColorAction =
	| { type: "SET_COLOR"; payload: { color: string; id: string } }
	| { type: "SET_OFFSET"; payload: { offset: number; id: string } }
	| { type: "REMOVE_COLOR"; payload: { id: string } }
	| { type: "ADD_COLOR"; payload: { color: string; offset: number } };

export const initialColorOptions: ColorPickerItemProps[] = [{ id: "color-0", color: "#000000", offset: 0.5 }];

export function colorOptionsReducer(state: ColorPickerItemProps[], action: ColorAction): ColorPickerItemProps[] {
	switch (action.type) {
		case "SET_COLOR": {
			return state.map((item) => (item.id === action.payload.id ? { ...item, color: action.payload.color } : item));
		}
		case "REMOVE_COLOR": {
			return state.filter((item) => item.id !== action.payload.id);
		}
		case "SET_OFFSET": {
			return state.map((item) => (item.id === action.payload.id ? { ...item, offset: action.payload.offset } : item));
		}
		case "ADD_COLOR": {
			// Generar un ID único para el nuevo color
			const newId = `color-${Date.now()}-${Math.random().toString(36).substring(2, 11)}`;
			return [
				...state,
				{
					id: newId,
					color: action.payload.color,
					offset: action.payload.offset,
				},
			];
		}
		default:
			return state;
	}
}
