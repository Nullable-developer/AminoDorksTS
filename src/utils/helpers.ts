import { createHmac, randomBytes } from "crypto";
import { CRYPTO } from "../constants";

export function generateDeviceId(data?: string | Buffer): string {
    let identifier: Buffer;
    if (typeof data === "string") {
        identifier = Buffer.concat([CRYPTO.PREFIX, Buffer.from(data, "utf-8")]);
    } else if (data instanceof Buffer) {
        identifier = Buffer.concat([CRYPTO.PREFIX, data]);
    } else {
        identifier = Buffer.concat([CRYPTO.PREFIX, randomBytes(20)]);
    }
    const hmac = createHmac("sha1", CRYPTO.DEVICE_ID_KEY).update(identifier).digest();
    return (identifier.toString("hex") + hmac.toString("hex")).toUpperCase();
}

export function generateSignature(data: string | Buffer): string {
    const buffer = typeof data === "string" ? Buffer.from(data, "utf-8") : data;
    const generatedSignature = createHmac("sha1", CRYPTO.SIGNATURE_KEY).update(buffer).digest();
    return Buffer.concat([CRYPTO.PREFIX, generatedSignature]).toString("base64").replace(/\+/g, "-").replace(/\//g, "_");
}