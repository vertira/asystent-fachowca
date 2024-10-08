import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import "@uploadthing/react/styles.css";
import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";
import { auth } from "@/auth";
import AuthWrapper from "../lib/auth_wrapper";
import { LoginFormProvider } from "@/context/LoginFormContext";
const telegram = localFont({
  src: [
    {
      path: "./fonts/PPTelegraf-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/PPTelegraf-Ultrabold.otf",
      weight: "800",
      style: "normal",
    },
    {
      path: "./fonts/PPTelegraf-Ultralight.otf",
      weight: "200",
      style: "normal",
    },
  ],
});

const APP_NAME = "Asystent fachowca";
const APP_DEFAULT_TITLE = "Asystent Fachowca";
const APP_TITLE_TEMPLATE = "%s - Asystent Fachowca";
const APP_DESCRIPTION = "Aplikacja do zarządzania pracą";

export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  description: APP_DESCRIPTION,
  appleWebApp: {
    capable: true,
    statusBarStyle: "black",
    title: APP_DEFAULT_TITLE,
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: APP_NAME,
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
  twitter: {
    card: "summary",
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  colorScheme: "only light",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

const RootLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const authenticatedUser = await auth();
  return (
    <html
      suppressHydrationWarning={true}
      lang="pl"
      data-theme="light"
      className="light"
    >
      <head />
      <LoginFormProvider>
        <body
          className={cn(
            `${telegram.className} min-h-screen h-full flex flex-col text-myText bg-myBackground`,
            {
              "flex-col": authenticatedUser,
            },
            "pt-safe",
          )}
        >
          <AuthWrapper>{children}</AuthWrapper>
          <Toaster />
          <Analytics />
        </body>
      </LoginFormProvider>
    </html>
  );
};

export default RootLayout;
