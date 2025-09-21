import Link from "next/link";
import Image from "next/image";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import NavItems from "@/components/NavItems";

const Navbar = () => {
    return (
        <nav className="navbar">
            <Link href="/home">
                <div className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity">
                    <Image
                        src="/images/logo.svg"
                        alt="logo"
                        width={40}
                        height={38}
                    />
                    <span className="text-lg font-bold gradient-text">MentorAI</span>
                </div>
            </Link>
            <div className="flex items-center gap-8">
                <NavItems />
                <div className="flex items-center gap-4">
                    <SignedOut>
                        <SignInButton>
                            <button className="btn-signin">
                                <span>Sign In</span>
                            </button>
                        </SignInButton>
                    </SignedOut>
                    <SignedIn>
                        <UserButton />
                    </SignedIn>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
