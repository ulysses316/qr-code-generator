import * as v from "valibot";

export const UrlSchema = v.object({
	url: v.pipe(
		v.string(),
		v.regex(/^(https?:\/\/)?([\w.-]+)\.([a-z]{2,})(:[0-9]{1,5})?(\/[^\s?#]*)?(\?[^\s#]*)?(#[^\s]*)?$/i, "Invalid URL"),
	),
});

export type UrlSchemaType = v.InferOutput<typeof UrlSchema>;

export const WifiSquema = v.object({
	type: v.string(),
	name: v.string(),
	password: v.string(),
});

export type WifiSquemaType = v.InferOutput<typeof WifiSquema>;

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
