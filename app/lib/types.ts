import type { ErrorCorrectionLevel } from "qr-code-styling";

export type QRCapacitiesByVersion = {
	[level in ErrorCorrectionLevel]: Record<number, number>;
};

export type ColorPickerItemProps = {
	index: number;
	color: string;
	offset: number;
};
