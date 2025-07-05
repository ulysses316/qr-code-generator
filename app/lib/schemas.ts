import * as v from "valibot";

export const UrlSchema = v.object({
	url: v.pipe(
		v.string(),
		v.regex(/^(https?:\/\/)?([\w.-]+)\.([a-z]{2,})(:[0-9]{1,5})?(\/[^\s?#]*)?(\?[^\s#]*)?(#[^\s]*)?$/i, "Invalid URL"),
	),
});

export const WifiSquema = v.object({
	ssid: v.string(),
	password: v.string(),
});

export const VCardSquema = v.object({
	name: v.string(),
	email: v.string(),
	phone: v.string(),
	url: v.string(),
	wifi: v.array(WifiSquema),
});

export const MeCardSquema = v.object({
	name: v.string(),
	email: v.string(),
	phone: v.string(),
	url: v.string(),
	wifi: v.array(WifiSquema),
	vcard: v.array(VCardSquema),
});

export const SMSSquema = v.object({
	number: v.string(),
	message: v.string(),
});

export const EmailSquema = v.object({
	name: v.string(),
	email: v.string(),
	password: v.string(),
	code: v.string(),
});

export const GeoSquema = v.object({
	lat: v.number(),
	lng: v.number(),
});

export const EventSchema = v.object({
	name: v.string(),
});

export const TextSquema = v.object({
	text: v.string(),
});

export const ComponentOptionsSquema = v.object({
	data: v.optional(
		v.object({
			scale: v.optional(v.pipe(v.number(), v.minValue(0.1), v.maxValue(0.9))),
		}),
	),
	timing: v.optional(
		v.object({
			scale: v.optional(v.pipe(v.number(), v.minValue(0.1), v.maxValue(0.9))),
			protectors: v.optional(v.boolean()),
		}),
	),
	alignment: v.optional(
		v.object({
			scale: v.optional(v.pipe(v.number(), v.minValue(0.1), v.maxValue(0.9))),
			protectors: v.optional(v.boolean()),
		}),
	),
	cornerAlignment: v.optional(
		v.object({
			scale: v.optional(v.pipe(v.number(), v.minValue(0.1), v.maxValue(0.9))),
			protectors: v.optional(v.boolean()),
		}),
	),
});

export const QROptionsSquema = v.object({
	size: v.optional(v.pipe(v.number(), v.integer())),
	margin: v.optional(v.pipe(v.number(), v.integer())),
	correctLevel: v.optional(v.pipe(v.number(), v.integer())),
	maskPattern: v.optional(v.pipe(v.number(), v.integer())),
	version: v.optional(v.pipe(v.number(), v.integer(), v.minValue(1), v.maxValue(40))),
	components: v.optional(ComponentOptionsSquema),
	colorDark: v.optional(v.pipe(v.string(), v.regex(/^[0-9a-fA-F]{6}$/))),
	colorLight: v.optional(v.pipe(v.string(), v.regex(/^[0-9a-fA-F]{6}$/))),
	autoColor: v.optional(v.boolean()),
	backgroundImage: v.optional(v.union([v.string(), v.instance(File)])),
	backgroundDimming: v.optional(
		v.pipe(v.string(), v.regex(/^rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})(?:\s*,\s*(0|1|0?\.\d+))?\s*\)$/i)),
	),
	gifBackground: v.optional(v.instance(ArrayBuffer)),
	whiteMargin: v.optional(v.boolean()),
	logoImage: v.optional(v.union([v.string(), v.instance(File)])),
	logoScale: v.optional(v.pipe(v.number(), v.minValue(0.1), v.maxValue(1))),
	logoMargin: v.optional(v.pipe(v.number(), v.integer())),
	logoCornerRadius: v.optional(v.pipe(v.number(), v.integer())),
});
