'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navItems = [
    { label: 'Home', href: '/home' },
    { label: 'Features', href: '/features' },
    { label: 'AI Companions', href: '/companions' },
    { label: 'Startup Agent', href: '/startup-agent' },
    { label: 'My Journey', href: '/my-journey' },
]

const NavItems = () => {
    const pathname = usePathname();

    return (
        <nav className="flex items-center gap-6">
            {navItems.map(({ label, href }) => (
                <Link
                    href={href}
                    key={label}
                    className={cn(
                        "text-sm font-medium transition-colors hover:text-primary",
                        pathname === href
                            ? 'text-primary font-semibold'
                            : 'text-muted-foreground hover:text-foreground'
                    )}
                >
                    {label}
                </Link>
            ))}
        </nav>
    )
}

export default NavItems
