import { Fragment } from "react";
import { Link } from "react-router-dom";
import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
} from "@/components/ui/navigation-menu";

export function Footer() {
	const footerItems = [
		{ label: "Home", href: "/" },
		{ label: "Placar", href: "/results" },
	];

	return (
		<footer className="absolute bottom-0 flex flex-col items-center w-full mt-4 p-4 border-t border-t-slate-300 space-y-4">
			<NavigationMenu>
				<NavigationMenuList>
					{footerItems.map((item, itemIndex) => (
						<Fragment key={item.label}>
							<NavigationMenuItem>
								<NavigationMenuLink asChild>
									<Link to={item.href}>{item.label}</Link>
								</NavigationMenuLink>
							</NavigationMenuItem>
							{itemIndex < footerItems.length - 1 && (
								<NavigationMenuItem className="text-3xl cursor-default">
									&#183;
								</NavigationMenuItem>
							)}
						</Fragment>
					))}
				</NavigationMenuList>
			</NavigationMenu>
			<p className="text-xs">&copy; {new Date().getFullYear()} Quick Solver</p>
		</footer>
	);
}
