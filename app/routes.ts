import { index, layout, type RouteConfig, route } from "@react-router/dev/routes";

export default [
	layout("components/layouts/main.tsx", [
		index("routes/home.tsx"),
		route("/url", "routes/url.tsx"),
		route("/wifi", "routes/wifi.tsx"),
		route("/vcard", "routes/vcard.tsx"),
	]),
] satisfies RouteConfig;
