import { FaBriefcase, FaHome, FaPlus, FaWarehouse } from "react-icons/fa";
import { CalendarPlus2, History } from "lucide-react";
import { CiLogout, CiSettings } from "react-icons/ci";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { useSidebar } from "./sidebar-base-component";
import { NewWorkProps } from "../navbar/navbar-links";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { getUserPermissions, isUserPremium } from "@/lib/server-actions";
import Modal from "../ui/modals/modal";
import UpgradeMembership from "../upgrade-membership";
import NoPermissionModal from "../ui/modals/no-permission-modal";
import { signOut } from "next-auth/react";
export const links = [
	{
		activeLink: "/",
		permission: "all",
		label: "Strona główna",
		href: "/",
		icon: <FaHome className="ml-4 h-7 w-7 flex-shrink-0" />,
	},
	{
		activeLink: "/upcoming-works",
		permission: "all",
		label: "Zaplanowane prace",
		href: "/upcoming-works",
		icon: <FaBriefcase className="ml-4 h-7 w-7 flex-shrink-0" />,
	},
	{
		activeLink: "/my-works",
		permission: "editWork",
		label: "Edytowanie prac",
		href: "/my-works",
		icon: <History className="ml-4 h-7 w-7 flex-shrink-0" />,
	},
	{
		activeLink: "/warehouse",
		permission: "warehouse",
		label: "Magazyn",
		href: "/warehouse",
		icon: <FaWarehouse className=" ml-4 h-7 w-7 flex-shrink-0" />,
	},
];
export const NewWorkSideBar = ({ works, authenticatedUser }: NewWorkProps) => {
	const pathname = usePathname();
	const router = useRouter();
	const { open, animate } = useSidebar();
	const [isUpgradeModalVisible, setIsUpgradeModalVisible] = useState(false);
	const [hasPermission, setHasPermission] = useState(true);

	const handleClick = async (e: { preventDefault: () => void }) => {
		e.preventDefault();
		const isPremium = await isUserPremium();
		const user = await getUserPermissions();
		if (!isPremium && works.length >= 2) {
			setIsUpgradeModalVisible(true);
		} else if (!user.permissions.createWork) {
			setHasPermission(false);
			setIsUpgradeModalVisible(true);
		} else {
			router.push("/new-work");
		}
	};

	return (
		<>
			<Link
				className={`link ${
					pathname === "/new-work"
						? "text-first-muted font-extrabold"
						: "text-myText-muted"
				} flex items-center justify-start gap-4  group/sidebar py-4 link border-b border-white/10 hover:text-first-muted`}
				onClick={handleClick}
				href="/new-work"
			>
				<CalendarPlus2 className="ml-4 h-7 w-7 flex-shrink-0 group-hover/link:text-first-muted" />
				<motion.span
					animate={{
						display: animate
							? open
								? "inline-block"
								: "none"
							: "inline-block",
						opacity: animate ? (open ? 1 : 0) : 1,
					}}
					className="text-base group-hover/sidebar:translate-x-1 group-hover/sidebar:text-myText group-hover/sidebar:font-extrabold transition duration-150 whitespace-pre inline-block !p-0 !m-0"
				>
					Nowa praca
				</motion.span>
			</Link>
			<Modal
				visible={isUpgradeModalVisible}
				setVisible={setIsUpgradeModalVisible}
			>
				{!hasPermission ? (
					<NoPermissionModal link="Nowa praca" />
				) : (
					<UpgradeMembership authenticatedUser={authenticatedUser} />
				)}
			</Modal>
		</>
	);
};
export const Logo = () => {
	const { open, animate } = useSidebar();
	return (
		<Link
			href="/"
			className="flex items-center justify-start gap-2 py-4 border-b "
		>
			<Image
				src="/icons/favicon.ico"
				alt="Logo"
				width={72}
				height={72}
				className="ml-4 h-7 w-7 flex-shrink-0"
			/>

			<motion.span
				animate={{
					display: animate ? (open ? "inline-block" : "none") : "inline-block",
					opacity: animate ? (open ? 1 : 0) : 1,
				}}
				className="text-lg font-extrabold whitespace-pre inline-block !p-0 !m-0"
			>
				Asystent Fachowca
			</motion.span>
		</Link>
	);
};
export const Settings = () => {
	const { open, animate } = useSidebar();
	const pathname = usePathname();
	return (
		<Link
			href="/settings"
			className={`link ${
				pathname === "/settings"
					? "text-first-muted font-extrabold"
					: "text-myText-muted"
			} flex items-center justify-start gap-2  group/link py-4 link border-b border-white/10 hover:text-first-muted`}
		>
			<CiSettings className="ml-4 h-7 w-7 flex-shrink-0 group-hover/link:text-first-muted" />

			<motion.span
				animate={{
					display: animate ? (open ? "inline-block" : "none") : "inline-block",
					opacity: animate ? (open ? 1 : 0) : 1,
				}}
				className="text-lg font-extrabold text-myText-muted group-hover/link:text-myText whitespace-pre inline-block group-hover/link:translate-x-1 transition duration-150 !p-0 !m-0"
			>
				Ustawienia
			</motion.span>
		</Link>
	);
};
export const SignOut = () => {
	const { open, animate } = useSidebar();
	return (
		<button
			onClick={() => signOut()}
			className="flex items-center justify-start gap-2 py-4 group/link "
		>
			<CiLogout className="ml-4 h-7 w-7 flex-shrink-0 group-hover/link:text-first-muted" />

			<motion.span
				animate={{
					display: animate ? (open ? "inline-block" : "none") : "inline-block",
					opacity: animate ? (open ? 1 : 0) : 1,
				}}
				className="text-lg text-myText-muted group-hover/link:text-myText font-extrabold whitespace-pre inline-block group-hover/link:translate-x-1 transition duration-150 !p-0 !m-0"
			>
				Wyloguj się
			</motion.span>
		</button>
	);
};
export const AvatarSideBar = ({
	authenticatedUser,
}: {
	authenticatedUser: any;
}) => {
	const { open, animate } = useSidebar();
	return (
		<div className="flex items-center justify-start gap-4 group/link flex-shrink-0 mt-10">
			<Avatar className="ring-1 ring-offset-2 ring-offset-myBackground ring-first-muted ml-[10px] flex-shrink-0 group-hover/link:text-first-muted">
				<AvatarImage src={authenticatedUser.user.image} />
				<AvatarFallback>
					<Image
						src="/favicon.ico"
						width={48}
						height={48}
						alt="avatar logo fallback"
						className="ml-4 h-7 w-7 flex-shrink-0 group-hover/link:text-first-muted"
					/>
				</AvatarFallback>
			</Avatar>
			<motion.div
				className="flex flex-col items-start text-myText"
				animate={{
					display: animate ? (open ? "inline-block" : "none") : "inline-block",
					opacity: animate ? (open ? 1 : 0) : 1,
				}}
			>
				<div className="flex flex-col">
					<span className="text-base font-medium">
						{authenticatedUser.user.name}
					</span>
					<span className="text-sm text-myText-muted">
						{authenticatedUser.user.email}
					</span>
				</div>
			</motion.div>
		</div>
	);
};
