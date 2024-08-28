"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { Materials } from "@/types/material";
import { unstable_update as update } from "@/auth";
import { generateRandomString } from "./utils";
import { revalidatePath } from "next/cache";
import { Employee } from "@/components/edit-work/staff-edit";

interface WorkData {
	name: string;
	slug: string;
	address: string;
	contact: string;
	mapWork: string;
	startDate: Date;
	endDate: Date;
	images: string[];
	category: string[];
	status: string;
}
export const creatework = async ({
	name,
	slug,
	address,
	contact,
	mapWork,
	startDate,
	endDate,
	images,
	category,
}: WorkData): Promise<any> => {
	try {
		const authenticatedUser = await auth();

		if (!authenticatedUser) {
			throw new Error("You must be signed in to create a work");
		}

		const userId = authenticatedUser.user?.id;

		const work = await db.work.create({
			data: {
				name,
				slug,
				address,
				mapWork,
				contact,
				startDate,
				endDate,
				status: "ACTIVE",
				categories: {
					connectOrCreate: category.map((name) => ({
						where: {
							name,
						},
						create: {
							name,
						},
					})),
				},
				images: {
					createMany: {
						data: images.map((image) => ({ url: image })),
					},
				},

				user: {
					connect: {
						id:
							authenticatedUser.user.role === "EMPLOYER"
								? userId
								: authenticatedUser.user.employerId,
					},
				},
			},
		});

		return work;
	} catch (error) {
		console.error(error);
		return null;
	}
};
export const updateWorkField = async (
	workId: string,
	field: keyof {
		name?: string;
		startDate?: Date;
		endDate?: Date;
		address?: string;
		mapWork?: string;
	},
	value: string | Date
): Promise<any> => {
	try {
		await db.work.update({
			where: {
				id: workId,
			},
			data: {
				[field]: value,
			},
		});
		return { success: "SUCCESS" };
	} catch (error) {
		{
			error: "ERROR";
		}
	}
};
export const updateCategoriesWork = async (
	workId: string,
	categories: string[]
) => {
	const work = await db.work.findUnique({
		where: {
			id: workId,
		},
	});

	if (!work) {
		throw new Error("work not found");
	}

	await db.work.update({
		where: {
			id: workId,
		},
		data: {
			categories: {
				set: [],
				connectOrCreate: categories.map((name) => ({
					where: { name },
					create: { name },
				})),
			},
		},
	});
	return work;
};
export const updateStaffWork = async (
	workId: string,
	assignedStaff: Employee[]
) => {
	const work = await db.work.findUnique({
		where: {
			id: workId,
		},
	});

	if (!work) {
		throw new Error("work not found");
	}

	await db.work.update({
		where: {
			id: workId,
		},
		data: {
			assignedStaff: {
				set: [],
				connect: assignedStaff.map((staff) => ({ id: staff.id })),
			},
		},
	});
	return work;
};
export const deleteWorkImg = async (imgId: string) => {
	await db.image.delete({
		where: {
			id: imgId,
		},
	});
};
export const createWorkImg = async (workId: string, urlImg: string) => {
	await db.image.create({
		data: {
			url: urlImg,
			workId: workId,
		},
	});
};
export const deleteWork = async (workId: string) => {
	const authenticatedUser = await auth();

	if (
		!authenticatedUser ||
		!authenticatedUser.user ||
		!authenticatedUser.user.id
	) {
		throw new Error("User ID is missing or invalid");
	}

	const userId = authenticatedUser.user.id;

	const work = await db.work.findUnique({
		where: {
			id: workId,
		},
	});

	if (!work || work.userId !== userId) {
		throw new Error("work not found or not authorized");
	}

	await db.work.delete({
		where: {
			id: workId,
		},
		include: {
			images: true,
		},
	});
	return true;
};

const getOwnerworks = async () => {
	const authenticatedUser = await auth();

	if (!authenticatedUser) {
		return [];
	}

	const userId = authenticatedUser.user?.id;

	const works = await db.work.findMany({
		where: {
			userId,
		},
		include: {
			images: true,
		},
	});

	return works;
};
export const getHistoryWorks = async () => {
	const authenticatedUser = await auth();

	if (!authenticatedUser) {
		return [];
	}

	let userId = authenticatedUser.user?.id;
	if (authenticatedUser.user.role === "STAFF") {
		userId = authenticatedUser.user.employerId;
	}
	const works = await db.work.findMany({
		where: {
			userId,
		},
		orderBy: {
			createdAt: "desc",
		},
		include: {
			images: true,
		},
	});

	return works;
};

export const getworkById = async (workId: string) => {
	try {
		const work = await db.work.findUnique({
			where: {
				id: workId,
			},
			include: {
				categories: true,
				images: true,
				Material: true,
				warehouseList: true,
				ShoppingList: true,
				assignedStaff: true,
			},
		});

		return work;
	} catch (error) {
		console.error(error);
		return null;
	}
};

export const getActiveWorks = async () => {
	const authenticatedUser = await auth();

	if (!authenticatedUser) {
		return [];
	}
	const userId = authenticatedUser.user?.id;
	if (authenticatedUser.user.role === "EMPLOYER") {
		const works = await db.work.findMany({
			where: {
				userId,
				status: "ACTIVE",
			},
			include: {
				categories: true,
				images: true,
				ShoppingList: true,
				warehouseList: true,
				assignedStaff: true,
			},
			orderBy: {
				startDate: "asc",
			},
		});

		return works;
	} else if (authenticatedUser.user.role === "STAFF") {
		const works = await db.work.findMany({
			where: {
				assignedStaff: {
					some: {
						id: userId,
					},
				},
				status: "ACTIVE",
			},
			include: {
				categories: true,
				images: true,
				ShoppingList: true,
				warehouseList: true,
				assignedStaff: true,
			},
			orderBy: {
				startDate: "asc",
			},
		});

		return works;
	}
};
const getWorkBySlug = async (slug: string) => {
	try {
		const work = await db.work.findUnique({
			where: {
				slug,
			},
			include: {
				images: true,
				categories: true,
			},
		});
		return work;
	} catch (error) {
		console.error("Error getting work by slug:", error);
		return null;
	}
};

const getCategories = async () => {
	const categories = await db.category.findMany({
		where: {
			work: {
				some: {
					status: "ACTIVE",
				},
			},
		},
	});

	return categories;
};

const getworksByCategoryName = async (category: string) => {
	const works = await db.work.findMany({
		where: {
			categories: {
				some: {
					name: category,
				},
			},
			status: "ACTIVE",
		},
	});
	return works;
};
export const searchWorks = async (query: string) => {
	const works = await db.work.findMany({
		where: {
			name: {
				contains: query,
				mode: "insensitive",
			},
			status: "ACTIVE",
		},
	});

	return works;
};

export const getWorksByUserId = async () => {
	const userAuth = await auth();
	console.log(userAuth?.user.employerId);
	if (userAuth?.user.role === "STAFF") {
		const works = await db.work.findMany({
			where: {
				userId: userAuth?.user.employerId,
			},
		});
		return works;
	} else if (userAuth?.user.role === "EMPLOYER") {
		const works = await db.work.findMany({
			where: {
				userId: userAuth?.user.id,
			},
		});
		return works;
	}
};
export const getUserByEmail = async (email: string) => {
	const user = await db.user.findUnique({
		where: {
			email,
		},
	});

	return user;
};
export const getUserById = async (employerId: string) => {
	const user = await db.user.findUnique({
		where: {
			id: employerId,
		},
	});

	return user;
};
export const createUser = async (
	firstName: string,
	email: string,
	hashedPassword: string,
	role: "EMPLOYER" | "STAFF",
	employerId?: string
): Promise<any> => {
	try {
		const user = await db.user.create({
			data: {
				name: firstName,
				email,
				password: hashedPassword,
				role,
				employerId,
				image: "/images/userdefault.png",
			},
		});
		return user;
	} catch (error) {
		console.error(error);
		return null;
	}
};
export const createPermisions = async (userId: string): Promise<any> => {
	try {
		await db.permissions.create({
			data: {
				userId: userId,
			},
		});
	} catch (error) {
		console.error(error);
		return null;
	}
};
export const updateUserField = async (
	field: keyof {
		name?: string;
		email?: string;
		password?: string;
		image?: string;
	},
	value: string
): Promise<any> => {
	const session = await auth();
	const userId = session!.user.id;
	try {
		await db.user.update({
			where: {
				id: userId,
			},
			data: {
				[field]: value,
			},
		});
		await update({
			...session,
			user: {
				...session!.user,
				[field]: value,
			},
		});
		return { success: "SUCCESS" };
	} catch (error) {
		{
			error: "ERROR";
		}
		return null;
	}
};
export const getUser = async (): Promise<any> => {
	const authenticatedUser = await auth();

	if (!authenticatedUser) {
		return [];
	}

	const userId = authenticatedUser.user?.id;

	const user = await db.user.findUnique({
		where: {
			id: userId,
		},
		include: {
			employees: {
				include: { permissions: true },
			},
			registrationCodes: true,
			permissions: true,
		},
	});
	return user;
};
export const getUserPermissions = async (): Promise<any> => {
	const authenticatedUser = await auth();

	if (!authenticatedUser) {
		return null;
	}

	const userId = authenticatedUser.user?.id;
	const user = await db.user.findUnique({
		where: {
			id: userId,
		},
		include: {
			permissions: true,
		},
	});
	return user;
};
export const updateUserPermissions = async (
	userId: string,
	field: keyof {
		calendar?: string;
		warehouse?: string;
		createWork?: string;
		editWork?: string;
	}
): Promise<any> => {
	try {
		const permission = await db.permissions.findUnique({
			where: {
				userId: userId,
			},
			select: {
				[field]: true,
			},
		});
		await db.permissions.update({
			where: {
				userId: userId,
			},
			data: {
				[field]: !permission?.[field],
			},
		});
		revalidatePath("/");
		return console.log("POPRAWNIE ZMIENIONO ");
	} catch (error) {
		{
			error: "ERROR";
		}
	}
};
const getEmployees = async (): Promise<any> => {
	const authenticatedUser = await auth();

	if (!authenticatedUser) {
		return [];
	}

	const userId = authenticatedUser.user?.id;
	const employees = await db.user.findUnique({
		where: {
			id: userId,
		},
		include: {
			employees: true,
		},
	});

	return employees;
};
export const getRegistrationCode = async (code: string): Promise<any> => {
	const registrationCode = await db.registrationCode.findUnique({
		where: { code },
	});
	return registrationCode;
};
export async function generateRegistrationCode(): Promise<string> {
	const authenticatedUser = await auth();

	if (
		!authenticatedUser ||
		!authenticatedUser.user ||
		!authenticatedUser.user.id
	) {
		return "";
	}
	const user = await getUser();
	const count = user.registrationCodes.filter(
		(code: any) => code.used === false
	);
	if (count.length >= 3) {
		return "";
	}
	const userId = authenticatedUser.user.id;
	const code = (await generateRandomString(3)).toUpperCase();

	const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);

	await db.registrationCode.create({
		data: {
			code,
			createdBy: userId,
			expiresAt,
		},
	});

	return code;
}
export const markRegistrationCodeAsUsed = async (
	code: string
): Promise<boolean> => {
	try {
		await db.registrationCode.update({
			where: { code },
			data: { used: true },
		});
		return true;
	} catch (error) {
		console.error(error);
		return false;
	}
};
export const deleteCode = async (codeId: string) => {
	await db.registrationCode.delete({
		where: {
			id: codeId,
		},
	});
};
export const isUserPremium = async () => {
	const authenticatedUser = await auth();

	if (
		!authenticatedUser ||
		!authenticatedUser.user ||
		!authenticatedUser.user.id
	) {
		return null;
	}

	const userId = authenticatedUser.user.id;
	if (authenticatedUser.user.role === "STAFF") {
		const user = await db.user.findUnique({
			where: {
				id: authenticatedUser.user.employerId,
			},
		});

		if (!user) {
			throw new Error("User not found");
		}

		return user.isPremium;
	} else if (authenticatedUser.user.role === "EMPLOYER") {
		const user = await db.user.findUnique({
			where: {
				id: userId,
			},
		});

		if (!user) {
			throw new Error("User not found");
		}

		return user.isPremium;
	}
};
const isUserStaff = async () => {
	const authenticatedUser = await auth();

	if (
		!authenticatedUser ||
		!authenticatedUser.user ||
		!authenticatedUser.user.id
	) {
		return null;
	}

	const userId = authenticatedUser.user.id;
	const user = await db.user.findUnique({
		where: {
			id: userId,
		},
	});

	if (!user) {
		throw new Error("User not found");
	}

	return user.role === "STAFF";
};
export const getUsers = async () => {
	const users = await db.user.findMany();

	return users;
};

export const getAdminData = async () => {
	const totalworks = await db.work.count();
	const totalUsers = await db.user.count();
	const totalCategories = await db.category.count();

	return {
		totalworks,
		totalUsers,
		totalCategories,
	};
};

// Materials

async function createMaterial(name: string, quantity: number, unit: string) {
	const authenticatedUser = await auth();

	if (!authenticatedUser) {
		throw new Error("You must be signed in to create a work");
	}

	const userId = authenticatedUser.user?.id;
	const material = await db.material.create({
		data: {
			name,
			quantity,
			unit,
			user: {
				connect: {
					id: userId,
				},
			},
		},
	});
	return material;
}
export async function updateMaterialWarehouse(
	id: string,
	action: string,
	quantity: number
) {
	try {
		if (action === "increment") {
			await db.material.update({
				where: { id },
				data: {
					quantity: { increment: quantity },
				},
			});
		} else if (action === "decrement") {
			await db.material.update({
				where: { id },
				data: {
					quantity: { decrement: quantity },
				},
			});
		} else if (action === "change") {
			await db.material.update({
				where: { id },
				data: {
					quantity: quantity,
				},
			});
		}
	} catch (error) {
		throw error;
	}
}
export async function deleteMaterial(id: string) {
	try {
		const deletedMaterial = await db.material.delete({
			where: { id },
		});
		return deletedMaterial;
	} catch (error) {
		throw error;
	}
}
export async function deleteManyMaterials(ids: string[]) {
	try {
		const { count } = await db.material.deleteMany({
			where: {
				id: { in: ids },
			},
		});
		return count;
	} catch (error) {
		throw error;
	}
}
export const getMaterialByUserId = async () => {
	const authenticatedUser = await auth();

	if (!authenticatedUser) {
		return [];
	}
	const isStaff = authenticatedUser.user.role === "STAFF";
	const userId = authenticatedUser.user?.id;
	const materials = await db.material.findMany({
		where: {
			userId: isStaff ? authenticatedUser.user.employerId : userId,
		},
		include: {
			work: true,
		},
	});

	const materialsData: Materials[] = materials.map((material) => ({
		userId: material.userId,
		id: material.id,
		quantity: material.quantity,
		name: material.name,
		unit: material.unit,
	}));
	return materialsData;
};
const getMaterialByName = async (name: string) => {
	const user = await auth();
	const material = await db.material.findFirst({
		where: {
			name,
			userId: user?.user.id,
		},
	});

	return material;
};
export const getMaterialById = async (materialId: string) => {
	const material = await db.material.findFirst({
		where: {
			id: materialId,
		},
	});

	return material;
};
export const newMaterial = async (prevState: any, formData: FormData) => {
	try {
		const isPremium = await isUserPremium();
		const userMaterials = await getMaterialByUserId();
		const name = formData.get("material") as string;
		const quantityStr = formData.get("amount") as string;
		const unit = formData.get("unit") as string;
		if (!name || !quantityStr || !unit) {
			return { success: "MATERIAL" };
		}
		const existingMaterial = await getMaterialByName(name);
		const quantity = parseInt(quantityStr, 10);
		if (existingMaterial) {
			return { success: "MATERIALEXIST" };
		} else {
			if (!isPremium && userMaterials.length >= 5) {
				return { success: "PREMIUM" };
			} else {
				await createMaterial(name, quantity, unit);
				return { success: "SUCCES" };
			}
		}
	} catch (e) {
		console.log(e);
		return { success: "SERVER" };
	}
};
export const getLastUpdatedMaterials = async () => {
	const authenticatedUser = await auth();

	if (!authenticatedUser) {
		return [];
	}
	let userId;
	if (authenticatedUser.user.role === "EMPLOYER") {
		userId = authenticatedUser.user.id;
	} else if (authenticatedUser.user.role === "STAFF") {
		userId = authenticatedUser.user.employerId;
	}
	const works = await db.material.findMany({
		where: {
			userId,
		},
		orderBy: {
			updatedAt: "desc",
		},
		take: 5,
	});

	return works;
};
export async function sendMessage(content: string) {
	const user = await auth();
	if (!user) {
		return null;
	}
	const senderId = user?.user.id;
	const sender = await db.user.findUnique({ where: { id: senderId } });

	if (!sender) throw new Error("Sender not found");

	const messageData = {
		content,
		senderId,
		employerId: sender.role === "EMPLOYER" ? sender.id : sender.employerId!,
	};

	return db.message.create({ data: messageData });
}
export async function getUserMessages() {
	const session = await auth();
	if (!session) {
		return null;
	}
	const userId = session?.user.id;
	const user = await db.user.findUnique({
		where: { id: userId },
		include: { employer: true },
	});

	if (!user) throw new Error("User not found");

	const employerId = user.role === "EMPLOYER" ? user.id : user.employerId;

	return db.message.findMany({
		where: { employerId: employerId },
		include: { sender: true },
		orderBy: { createdAt: "desc" },
		take: 15,
	});
}
export const getWorkMaterials = async (work: any) => {
	const materials = await db.workMaterial.findMany({
		where: {
			workId: work.id,
		},
	});

	const materialsData: Materials[] = materials.map((material) => ({
		materialId: material.materialId!,
		userId: material.userId,
		id: material.id,
		quantity: material.quantity,
		name: material.name,
		unit: material.unit,
	}));
	return materialsData;
};
export const getShoppingList = async (work: any) => {
	const materials = await db.shoppingList.findMany({
		where: {
			workId: work.id,
		},
	});

	const materialsData: Materials[] = materials.map((material) => ({
		userId: material.userId,
		id: material.id,
		quantity: material.quantity,
		name: material.name,
		unit: material.unit,
	}));
	return materialsData;
};
export const createWorkMaterial = async (
	value: string,
	quantity: number,
	unit: string,
	materialId: string,
	userId: string,
	workId: string
) => {
	const prevQuantity = await db.material.findUnique({
		where: {
			id: materialId,
		},
	});
	if (prevQuantity!.quantity < quantity) {
		return { status: "ERROR" };
	}
	if (quantity <= 0) {
		return { status: "ZERO" };
	}
	await db.workMaterial.create({
		data: {
			name: value,
			unit: unit,
			materialId: materialId,
			quantity: quantity,
			userId: userId,
			workId: workId,
		},
	});
	await db.material.update({
		where: {
			id: materialId,
		},
		data: {
			quantity: {
				decrement: quantity,
			},
		},
	});
};
export const deleteWorkMaterial = async (
	id: string,
	materialId: string,
	quantity: number
) => {
	if (materialId) {
		await db.workMaterial.delete({
			where: {
				id: id,
			},
		});
		await db.material.update({
			where: {
				id: materialId,
			},
			data: {
				quantity: {
					increment: quantity,
				},
			},
		});
	} else {
		await db.shoppingList.delete({
			where: {
				id: id,
			},
		});
	}
};
export const editWorkMaterial = async (
	id: string,
	materialId: string,
	quantity: number,
	materialName: string,
	materialUnit: string
) => {
	if (!id || !quantity || !materialName || !materialUnit) {
		return { status: "MISSING" };
	}
	if (materialId) {
		const oldValue = await db.workMaterial.findFirst({
			where: {
				id: id,
			},
		});
		if (oldValue!.quantity === quantity) {
			return { status: "SAME" };
		}
		const acutalStateWarehouse = await db.material.findFirst({
			where: { id: materialId },
		});
		const maxValue = acutalStateWarehouse!.quantity + oldValue!.quantity;
		if (maxValue < quantity) {
			console.log(maxValue);
			return { status: "MAXVALUE" };
		}

		const newValue = oldValue!.quantity - quantity;
		if (newValue > 0) {
			await db.workMaterial.update({
				where: {
					id: id,
				},
				data: {
					quantity: {
						decrement: newValue,
					},
				},
			});
			await db.material.update({
				where: {
					id: materialId,
				},
				data: {
					quantity: {
						increment: newValue,
					},
				},
			});
		} else if (newValue < 0) {
			await db.workMaterial.update({
				where: {
					id: id,
				},
				data: {
					quantity: {
						decrement: newValue,
					},
				},
			});
			await db.material.update({
				where: {
					id: materialId,
				},
				data: {
					quantity: {
						increment: newValue,
					},
				},
			});
		}
	} else {
		await db.shoppingList.update({
			where: {
				id: id,
			},
			data: {
				name: materialName,
				unit: materialUnit,
				quantity: quantity,
			},
		});
	}
	return { status: "SUCCESS" };
};
export const createShoppingList = async (
	materialName: string,
	unit: string,
	quantity: number,
	userId: string,
	workId: string
) => {
	const findMaterial = await db.shoppingList.findFirst({
		where: {
			name: materialName,
		},
	});
	if (findMaterial?.workId === workId && findMaterial?.name === materialName) {
		return { status: "EXIST" };
	}
	await db.shoppingList.create({
		data: {
			name: materialName,
			quantity: quantity,
			unit: unit,
			userId: userId,
			workId: workId,
		},
	});
};
