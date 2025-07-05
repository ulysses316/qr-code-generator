import {
	BookText,
	CalendarCheck2,
	IdCard,
	IdCardLanyard,
	Link2,
	Mail,
	MapPin,
	MessageCircleMore,
	Wifi,
} from "lucide-react";
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
		title: "URL",
		url: "#",
		icon: Link2,
	},
	{
		title: "Wifi",
		url: "#",
		icon: Wifi,
	},
	{
		title: "VCard",
		url: "#",
		icon: IdCard,
	},
	{
		title: "MeCard",
		url: "#",
		icon: IdCardLanyard,
	},
	{
		title: "SMS",
		url: "#",
		icon: MessageCircleMore,
	},
	{
		title: "Email",
		url: "#",
		icon: Mail,
	},
	{
		title: "Geo",
		url: "#",
		icon: MapPin,
	},
	{
		title: "Evento",
		url: "#",
		icon: CalendarCheck2,
	},
	{
		title: "Text",
		url: "#",
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
