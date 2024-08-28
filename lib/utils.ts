import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

// Web Crypto API utility functions

/**
 * Generates a random string of specified length
 * @param length The length of the random string
 * @returns A promise that resolves to the random string
 */
async function generateRandomString(length: number): Promise<string> {
	const buffer = new Uint8Array(length);
	crypto.getRandomValues(buffer);
	return Array.from(buffer, (byte) => byte.toString(16).padStart(2, "0")).join(
		""
	);
}

/**
 * Hashes a string using SHA-256
 * @param str The string to hash
 * @returns A promise that resolves to the hashed string
 */
async function hashString(str: string): Promise<string> {
	const encoder = new TextEncoder();
	const data = encoder.encode(str);
	const hashBuffer = await crypto.subtle.digest("SHA-256", data);
	const hashArray = Array.from(new Uint8Array(hashBuffer));
	return hashArray.map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

/**
 * Encrypts a string using AES-GCM
 * @param str The string to encrypt
 * @param key The encryption key
 * @returns A promise that resolves to the encrypted string
 */
async function encryptString(str: string, key: CryptoKey): Promise<string> {
	const encoder = new TextEncoder();
	const data = encoder.encode(str);
	const iv = crypto.getRandomValues(new Uint8Array(12));
	const encryptedBuffer = await crypto.subtle.encrypt(
		{ name: "AES-GCM", iv: iv },
		key,
		data
	);
	const encryptedArray = Array.from(new Uint8Array(encryptedBuffer));
	return JSON.stringify({ iv: Array.from(iv), data: encryptedArray });
}

/**
 * Decrypts a string using AES-GCM
 * @param encryptedStr The encrypted string
 * @param key The decryption key
 * @returns A promise that resolves to the decrypted string
 */
async function decryptString(
	encryptedStr: string,
	key: CryptoKey
): Promise<string> {
	const { iv, data } = JSON.parse(encryptedStr);
	const decryptedBuffer = await crypto.subtle.decrypt(
		{ name: "AES-GCM", iv: new Uint8Array(iv) },
		key,
		new Uint8Array(data)
	);
	const decoder = new TextDecoder();
	return decoder.decode(decryptedBuffer);
}

export { generateRandomString };
