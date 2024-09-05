"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { FaHome, FaBriefcase, FaWarehouse } from "react-icons/fa";
import NewWorkLink from "../navbar/new-work-button-mobile";
import AvatarMenu from "../navbar/avatar-menu";
import "driver.js/dist/driver.css";
interface NewWorkProps {
  authenticatedUser?: any;
  works?: any;
}
export default function NavbarMobile({
  authenticatedUser,
  works,
}: NewWorkProps) {
  const pathname = usePathname();
  return (
    <>
      <AvatarMenu authenticatedUser={authenticatedUser} />
      <div className="border-t border-white/50 flex  bg-myBackground z-[200] w-full sticky bottom-0 py-2 md:hidden">
        <nav className="flex w-full">
          <ul className="flex text-base justify-around font-medium w-full">
            <li>
              <Link
                href="/"
                className={`link ${
                  pathname === "/"
                    ? "bg-cardBackground text-first"
                    : "text-myText-muted"
                } flex flex-col items-center rounded-md px-3 py-2 transition-all hover:text-first tour-mobile-dashboard`}
              >
                <FaHome />
                <span className="text-xs">Główna</span>
              </Link>
            </li>
            <li>
              <NewWorkLink
                works={works}
                authenticatedUser={authenticatedUser}
              />
            </li>
            <li>
              <Link
                href="/upcoming-works"
                className={`link ${
                  pathname === "/upcoming-works"
                    ? "bg-cardBackground text-first"
                    : "text-myText-muted"
                } flex flex-col items-center rounded-md px-3 py-2 transition-all hover:text-first tour-mobile-upcoming-works`}
              >
                <FaBriefcase />
                <span className="text-xs">Zaplanowane</span>
              </Link>
            </li>
            <li>
              <Link
                href="/warehouse"
                className={`link ${
                  pathname === "/warehouse"
                    ? "bg-cardBackground text-first"
                    : "text-myText-muted"
                } flex flex-col items-center rounded-md px-3 py-2 transition-all hover:text-first tour-mobile-warehouse`}
              >
                <FaWarehouse />
                <span className="text-xs">Magazyn</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}
