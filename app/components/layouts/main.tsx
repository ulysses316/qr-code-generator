import { Outlet } from "react-router";
import SidebarApp from "../local/SidebarApp";
import { Card } from "../ui/card";
import { SidebarTrigger } from "../ui/sidebar";

export default function main() {
	return (
		<>
			<SidebarApp />
			<main className="flex w-full flex-col">
				<Card className="block h-fit w-full rounded-none py-1 md:hidden">
					<SidebarTrigger className="h-12 w-12" />
				</Card>
				<Outlet />
			</main>
		</>
	);
}
