import { BookText, CalendarCheck2, Home, IdCard, Link2, MapPin, Wifi } from "lucide-react";
import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarTrigger,
} from "~/components/ui/sidebar";

const items = [
	{
		title: "Home",
		url: "/",
		icon: Home,
	},
	{
		title: "URL",
		url: "/url",
		icon: Link2,
	},
	{
		title: "Wifi",
		url: "/wifi",
		icon: Wifi,
	},
	{
		title: "VCard",
		url: "/vcard",
		icon: IdCard,
	},
	{
		title: "Geo",
		url: "/geo",
		icon: MapPin,
	},
	{
		title: "Evento",
		url: "/event",
		icon: CalendarCheck2,
	},
	{
		title: "Text",
		url: "/text",
		icon: BookText,
	},
];

export default function SidebarApp() {
	return (
		<Sidebar variant="floating" collapsible="icon">
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupLabel>QR Generator</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							<SidebarTrigger />
							{items.map((item) => (
								<SidebarMenuItem key={item.title}>
									<SidebarMenuButton asChild>
										<a href={item.url}>
											<item.icon />
											<span>{item.title}</span>
										</a>
									</SidebarMenuButton>
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
		</Sidebar>
	);
}
