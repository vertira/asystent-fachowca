import NextAuth from "next-auth";

declare module "next-auth" {
	interface User {
		role?: "EMPLOYER" | "STAFF";
		employerId?: string | null;
	}

	interface Session {
		user: {
			id: string;
			role: "EMPLOYER" | "STAFF";
			employerId?: string | null;
		} & DefaultSession["user"];
	}
}

declare module "next-auth/jwt" {
	interface JWT {
		role?: "EMPLOYER" | "STAFF";
		employerId?: string | null;
	}
}
