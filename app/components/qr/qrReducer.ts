import type { DrawType, Options, ShapeType } from "qr-code-styling";

export type QRAction =
	| { type: "SET_TYPE"; payload: DrawType }
	| { type: "SET_SHAPE"; payload: ShapeType }
	| { type: "SET_WIDTH"; payload: number }
	| { type: "SET_HEIGHT"; payload: number }
	| { type: "SET_MARGIN"; payload: number }
	| { type: "SET_DATA"; payload: string }
	| { type: "SET_IMAGE"; payload: string }
	| { type: "SET_QROPTIONS"; payload: Options["qrOptions"] }
	| { type: "SET_IMAGEOPTIONS"; payload: Options["imageOptions"] }
	| { type: "SET_DOTOPTIONS"; payload: Options["dotsOptions"] }
	| { type: "SET_CORNERSSQUAREOPTIONS"; payload: Options["cornersSquareOptions"] }
	| { type: "SET_CORNERSDOTOPTIONS"; payload: Options["cornersDotOptions"] }
	| { type: "SET_BACKGROUNDOPTIONS"; payload: Options["backgroundOptions"] }
	| { type: "SET_DEFAULT" };

export const initialQROptions: Partial<Options> = {
	type: "svg",
	shape: "square",
	width: 300,
	height: 300,
	margin: 0,
	data: "https://www.example.com/",
	image: "",
	qrOptions: {
		typeNumber: 0,
		mode: "Byte",
		errorCorrectionLevel: "H",
	},
	imageOptions: {
		saveAsBlob: true,
		hideBackgroundDots: true,
		imageSize: 0.4,
		crossOrigin: "anonymous",
		margin: 0,
	},
	dotsOptions: {
		type: "classy",
		color: "#000000",
		gradient: {
			type: "linear",
			rotation: 0,
			colorStops: [{ offset: 0.5, color: "#000000" }],
		},
		roundSize: true,
	},
	cornersSquareOptions: {
		type: "classy",
		color: "#000000",
		gradient: {
			type: "linear",
			rotation: 0,
			colorStops: [{ offset: 0, color: "#000000" }],
		},
	},
	cornersDotOptions: {
		type: "classy",
		color: "#000000",
		gradient: {
			type: "linear",
			rotation: 0,
			colorStops: [{ offset: 0.2, color: "#000000" }],
		},
	},
	backgroundOptions: {
		round: 0,
		color: "#ffffff",
		gradient: {
			type: "linear",
			rotation: 0,
			colorStops: [{ offset: 1, color: "#ffffff" }],
		},
	},
};

export function qrOptionsReducer(state: Partial<Options>, action: QRAction): Partial<Options> {
	switch (action.type) {
		case "SET_TYPE":
			return { ...state, type: action.payload };
		case "SET_SHAPE":
			return { ...state, shape: action.payload };
		case "SET_WIDTH":
			return { ...state, width: action.payload };
		case "SET_HEIGHT":
			return { ...state, height: action.payload };
		case "SET_MARGIN":
			return { ...state, margin: action.payload };
		case "SET_DATA":
			return { ...state, data: action.payload };
		case "SET_IMAGE":
			return { ...state, image: action.payload };
		case "SET_QROPTIONS":
			return { ...state, qrOptions: action.payload };
		case "SET_IMAGEOPTIONS":
			return { ...state, imageOptions: action.payload };
		case "SET_DOTOPTIONS":
			return { ...state, dotsOptions: action.payload };
		case "SET_CORNERSSQUAREOPTIONS":
			return { ...state, cornersSquareOptions: action.payload };
		case "SET_CORNERSDOTOPTIONS":
			return { ...state, cornersDotOptions: action.payload };
		case "SET_BACKGROUNDOPTIONS":
			return { ...state, backgroundOptions: action.payload };
		case "SET_DEFAULT":
			return JSON.parse(JSON.stringify(initialQROptions));
		default:
			return state;
	}
}
