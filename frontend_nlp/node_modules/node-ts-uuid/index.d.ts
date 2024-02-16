interface UuidOptions {
	length?: number;
	prefix?: string;
}

declare class Uuid {
	/**
	 * Generates a UUID using the IPv6 / Mac Address, the process id,
	 * and the current time. Optionally add a prefix, and limit / pad
	 * the uuid to be a specific length.
	 *
	 * @param options optional uuid options object
	 * @returns string
	 */
	public static generate(options?: UuidOptions): string;

	/**
	 * Returns the running process id or a
	 * randomly generated 5 digit number.
	 *
	 * @returns number
	 */
	public static getPid(): number;

	/**
	 * Returns the MAC Address or IPv6 Address, if neither are
	 * available a randomly generated 8 digit number is returned.
	 *
	 * @returns number
	 */
	public static getAddress(): number;

	/**
	 * Returns the current epoch time or the previously
	 * returned epoch time incremented by 1.
	 *
	 * @returns number
	 */
	public static getNow(): number;

	/**
	 * Pads / limits the length of the provided uuid
	 * if the length is shorter than desired a bitwise
	 * operation provides the randomly generated characters.
	 *
	 * @param uuid The uuid
	 * @param length The desired length of the uuid
	 * @returns string
	 */
	public static postProcessUuid(uuid: string, length?: number): string;
}

export { UuidOptions, Uuid };
