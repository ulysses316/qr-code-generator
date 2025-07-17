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

export const GeoSquema = v.object({
	lat: v.pipe(v.string(), v.regex(/^[+-]?([1-8]?\d(\.\d+)?|90(\.0+)?$)/, "Latitud inválida")),
	lng: v.pipe(v.string(), v.regex(/^[+-]?((1[0-7]\d|0?\d{1,2})(\.\d+)?|180(\.0+)?$)/, "Longitud inválida")),
});

export type GeoSquemaType = v.InferOutput<typeof GeoSquema>;

export const EventSchema = v.object({
	title: v.string(),
	description: v.string(),
	location: v.string(),
	date_start: v.date(),
	date_end: v.date(),
});

export type EventSchemaType = v.InferOutput<typeof EventSchema>;
