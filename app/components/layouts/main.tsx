import { Outlet } from "react-router";
import SidebarApp from "../local/SidebarApp";

export default function main() {
	return (
		<>
			<SidebarApp />
			<Outlet />
		</>
	);
}
