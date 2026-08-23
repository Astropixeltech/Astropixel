'use client';
import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { MenuToggleIcon } from '@/components/ui/menu-toggle-icon';
import { createPortal } from 'react-dom';
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { LucideIcon } from 'lucide-react';
import {
	CodeIcon,
	GlobeIcon,
	LayersIcon,
	UserPlusIcon,
	Users,
	Star,
	FileText,
	Shield,
	RotateCcw,
	Handshake,
	Leaf,
	HelpCircle,
	BarChart,
	PlugIcon,
} from 'lucide-react';
import logoFullPng from "@/assets/logo-full.png";

type LinkItem = {
	title: string;
	href: string;
	icon: LucideIcon;
	description?: string;
};

export function Header() {
	const [open, setOpen] = React.useState(false);
	const scrolled = useScroll(10);

	React.useEffect(() => {
		if (open) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = '';
		}
		return () => {
			document.body.style.overflow = '';
		};
	}, [open]);

	return (
		<header
			className={cn('sticky top-0 z-50 w-full border-b border-transparent transition-all duration-300', {
				'bg-background/95 supports-[backdrop-filter]:bg-background/50 border-border backdrop-blur-lg shadow-sm':
					scrolled,
			})}
		>
			<nav className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6">
				<div className="flex items-center gap-6">
					<a href="/" className="flex items-center gap-2 rounded-md p-1">
						<img
							src={(logoFullPng as any)?.src || '/astropixel-logo-full.png'}
							alt="AstroPixel Agency"
							className="h-8 w-auto object-contain brightness-0 dark:invert"
						/>
					</a>
					<NavigationMenu className="hidden md:flex">
						<NavigationMenuList>
							<NavigationMenuItem>
								<NavigationMenuTrigger className="bg-transparent text-sm font-semibold">Services</NavigationMenuTrigger>
								<NavigationMenuContent className="bg-background p-1 pr-1.5">
									<ul className="bg-popover grid w-lg grid-cols-2 gap-2 rounded-md border p-2 shadow">
										{productLinks.map((item, i) => (
											<li key={i}>
												<ListItem {...item} />
											</li>
										))}
									</ul>
									<div className="p-2">
										<p className="text-muted-foreground text-sm">
											Interested in a custom project?{' '}
											<a href="/contact" className="text-foreground font-medium hover:underline">
												Schedule a call
											</a>
										</p>
									</div>
								</NavigationMenuContent>
							</NavigationMenuItem>
							<NavigationMenuItem>
								<NavigationMenuTrigger className="bg-transparent text-sm font-semibold">Company</NavigationMenuTrigger>
								<NavigationMenuContent className="bg-background p-1 pr-1.5 pb-1.5">
									<div className="grid w-lg grid-cols-2 gap-2">
										<ul className="bg-popover space-y-2 rounded-md border p-2 shadow">
											{companyLinks.map((item, i) => (
												<li key={i}>
													<ListItem {...item} />
												</li>
											))}
										</ul>
										<ul className="space-y-2 p-3">
											{companyLinks2.map((item, i) => (
												<li key={i}>
													<NavigationMenuLink
														href={item.href}
														className="flex p-2 hover:bg-accent flex-row rounded-md items-center gap-x-2 text-sm"
													>
														<item.icon className="text-foreground size-4" />
														<span className="font-medium">{item.title}</span>
													</NavigationMenuLink>
												</li>
											))}
										</ul>
									</div>
								</NavigationMenuContent>
							</NavigationMenuItem>
							<NavigationMenuLink className="px-4" asChild>
								<a href="/work" className="hover:bg-accent rounded-md p-2 text-sm font-semibold">
									Portfolio
								</a>
							</NavigationMenuLink>
							<NavigationMenuLink className="px-2" asChild>
								<a href="/contact" className="hover:bg-accent rounded-md p-2 text-sm font-semibold">
									Contact
								</a>
							</NavigationMenuLink>
						</NavigationMenuList>
					</NavigationMenu>
				</div>
				<div className="hidden items-center gap-3 md:flex">
					<a href="/contact">
						<Button variant="outline" className="rounded-xl">Contact Us</Button>
					</a>
					<a href="/contact">
						<Button className="rounded-xl bg-gradient-to-r from-[#6D28D9] via-[#7C3AED] to-[#9333EA] text-white">Start Project</Button>
					</a>
				</div>
				<Button
					size="icon"
					variant="outline"
					onClick={() => setOpen(!open)}
					className="md:hidden rounded-xl"
					aria-expanded={open}
					aria-controls="mobile-menu"
					aria-label="Toggle menu"
				>
					<MenuToggleIcon open={open} className="size-5" duration={300} />
				</Button>
			</nav>
			<MobileMenu open={open} className="flex flex-col justify-between gap-2 overflow-y-auto">
				<NavigationMenu className="max-w-full">
					<div className="flex w-full flex-col gap-y-2">
						<span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Services</span>
						{productLinks.map((link) => (
							<ListItem key={link.title} {...link} />
						))}
						<span className="text-xs font-bold uppercase tracking-wider text-muted-foreground mt-4">Company</span>
						{companyLinks.map((link) => (
							<ListItem key={link.title} {...link} />
						))}
						{companyLinks2.map((link) => (
							<ListItem key={link.title} {...link} />
						))}
					</div>
				</NavigationMenu>
				<div className="flex flex-col gap-2 pt-4">
					<a href="/contact" className="w-full">
						<Button variant="outline" className="w-full bg-transparent rounded-xl">
							Contact Us
						</Button>
					</a>
					<a href="/contact" className="w-full">
						<Button className="w-full rounded-xl bg-gradient-to-r from-[#6D28D9] via-[#7C3AED] to-[#9333EA] text-white">Start Project</Button>
					</a>
				</div>
			</MobileMenu>
		</header>
	);
}

type MobileMenuProps = React.ComponentProps<'div'> & {
	open: boolean;
};

function MobileMenu({ open, children, className, ...props }: MobileMenuProps) {
	if (!open || typeof window === 'undefined') return null;

	return createPortal(
		<div
			id="mobile-menu"
			className={cn(
				'bg-background/95 supports-[backdrop-filter]:bg-background/50 backdrop-blur-lg',
				'fixed top-16 right-0 bottom-0 left-0 z-40 flex flex-col overflow-hidden border-y md:hidden',
			)}
		>
			<div
				data-slot={open ? 'open' : 'closed'}
				className={cn(
					'data-[slot=open]:animate-in data-[slot=open]:zoom-in-97 ease-out',
					'size-full p-4',
					className,
				)}
				{...props}
			>
				{children}
			</div>
		</div>,
		document.body,
	);
}

function ListItem({
	title,
	description,
	icon: Icon,
	className,
	href,
	...props
}: React.ComponentProps<typeof NavigationMenuLink> & LinkItem) {
	return (
		<NavigationMenuLink className={cn('w-full flex flex-row gap-x-2 data-[active=true]:focus:bg-accent data-[active=true]:hover:bg-accent data-[active=true]:bg-accent/50 data-[active=true]:text-accent-foreground hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground rounded-md p-2', className)} {...props} asChild>
			<a href={href}>
				<div className="bg-background/40 flex aspect-square size-10 items-center justify-center rounded-md border shadow-sm shrink-0">
					<Icon className="text-foreground size-4" />
				</div>
				<div className="flex flex-col items-start justify-center">
					<span className="font-medium text-sm">{title}</span>
					{description && <span className="text-muted-foreground text-xs">{description}</span>}
				</div>
			</a>
		</NavigationMenuLink>
	);
}

const productLinks: LinkItem[] = [
	{
		title: 'Web Development',
		href: '/services#web-dev',
		description: 'High performing React & Next.js applications',
		icon: GlobeIcon,
	},
	{
		title: 'UI/UX Design',
		href: '/services#ui-ux',
		description: 'Modern, high-converting digital interfaces',
		icon: LayersIcon,
	},
	{
		title: 'Mobile App Development',
		href: '/services#mobile-app',
		description: 'Cross-platform iOS & Android mobile apps',
		icon: UserPlusIcon,
	},
	{
		title: 'Analytics & SEO',
		href: '/services#seo',
		description: 'Track, optimize & scale search rankings',
		icon: BarChart,
	},
	{
		title: 'Integrations & API',
		href: '/services#api',
		description: 'Connect your apps and backend services',
		icon: PlugIcon,
	},
	{
		title: 'AI Solutions',
		href: '/services#ai',
		description: 'Custom AI agents and automated workflows',
		icon: CodeIcon,
	},
];

const companyLinks: LinkItem[] = [
	{
		title: 'About Us',
		href: '/about',
		description: 'Learn more about our story and agency vision',
		icon: Users,
	},
	{
		title: 'Our Team',
		href: '/about#team',
		description: 'Meet our designers, engineers & leaders',
		icon: Star,
	},
	{
		title: 'Partnerships',
		href: '/contact',
		icon: Handshake,
		description: 'Collaborate with us for mutual growth',
	},
];

const companyLinks2: LinkItem[] = [
	{
		title: 'Portfolio & Works',
		href: '/work',
		icon: FileText,
	},
	{
		title: 'Privacy Policy',
		href: '/about',
		icon: Shield,
	},
	{
		title: 'Services',
		href: '/services',
		icon: RotateCcw,
	},
	{
		title: 'Blog',
		href: '/about',
		icon: Leaf,
	},
	{
		title: 'Contact Support',
		href: '/contact',
		icon: HelpCircle,
	},
];

function useScroll(threshold: number) {
	const [scrolled, setScrolled] = React.useState(false);

	const onScroll = React.useCallback(() => {
		setScrolled(window.scrollY > threshold);
	}, [threshold]);

	React.useEffect(() => {
		window.addEventListener('scroll', onScroll);
		return () => window.removeEventListener('scroll', onScroll);
	}, [onScroll]);

	React.useEffect(() => {
		onScroll();
	}, [onScroll]);

	return scrolled;
}

export default Header;
export { Header as Navbar };