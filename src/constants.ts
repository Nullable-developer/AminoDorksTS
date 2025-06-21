import { DorksHeaders } from "./core/types";

export const API_URL = "https://service.aminoapps.com/api/v1/g";
export const WEBSOCKET_URL = "ws://ws1.aminoapps.com";

export const DEFAULT_HEADERS: DorksHeaders = {
    "Accept-Language": "en-US",
    "User-Agent": "Apple iPhone12,1 iOS v15.5 Main/3.12.2",
    "Host": "service.narvii.com",
    "Accept-Encoding": "gzip",
}

export const CRYPTO = {
    PREFIX: Buffer.from("19", "hex"),
    SIGNATURE_KEY: Buffer.from("DFA5ED192DDA6E88A12FE12130DC6206B1251E44", "hex"),
    DEVICE_ID_KEY: Buffer.from("E7309ECC0953C6FA60005B2765F99DBBC965C8E9", "hex"),
};