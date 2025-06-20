import { Client } from "../core/client";
import { AuthResponse } from "./types";

export class AuthService {
    readonly client: Client
    readonly SERVICE_ENDPOINT: string = "/g/s/auth";
    
    constructor(client: Client) {
        this.client = client
    }

    set sessionId(sessionId: string) {
        this.client.sessionId = sessionId;
        this.client.dorksHeaders["NDCAUTH"] = `sid=${sessionId}`
    }
    
    async authenticate(email: string, password: string): Promise<AuthResponse> {
        const response = await this.client.makeRequest(
            "POST", `${this.SERVICE_ENDPOINT}/login`, {
                email: email, 
                v: 2,
                secret: `0 ${password}`,
                deviceID: this.client.deviceId,
                clientType: 100,
                action: "normal",
            }
        ) as AuthResponse;

        this.sessionId = response.sid;
        return response;
    }

    async authenticateWithPhone(phoneNumber: string, password: string): Promise<AuthResponse> {
        const response = await this.client.makeRequest("POST", "/login", {
            phoneNumber: phoneNumber,
            v: 2,
            secret: `0 ${password}`,
            deviceID: this.client.deviceId,
            clientType: 100,
            action: "normal",
        }) as AuthResponse;

        this.sessionId = response.sid;
        return response;
    }

    async createAccount(
        email: string,
        password: string,
        nickname: string, 
        deviceId: string,
        verificationCode: string
    ): Promise<number> {
        await this.client.makeRequest("POST", "/register", {
            secret: `0 ${password}`,
            deviceId: deviceId,
            email: email,
            clientType: 100,
            nickname: nickname,
            latitude: 0,
            longitude: 0,
            address: null, 
            clientCallbackURL: "narviiapp://relogin",
            validationContext: {
                data: {
                    code: verificationCode
                },
                type: 1, 
                identity: email
            },
            type: 1, 
            identity: email
       });

       return 200;
    }

    async disconnect(): Promise<number> {
        await this.client.makeRequest("POST", "/logout", {
            deviceID: this.client.deviceId,
            clientType: 100
        });

        delete this.client.dorksHeaders["NDCAUTH"];
        return 200;
    }

    async requestVerifictionCode(email: string): Promise<number> {
        await this.client.makeRequest("POST", "/request-security-validation", {
            identity: email,
            type: 1,
            deviceID: this.client.deviceId
        });

        return 200;
    }

    async requestResetPassword(email: string): Promise<number> {
        await this.client.makeRequest("POST", "/request-security-validation", {
            identity: email,
            type: 1,
            deviceID: this.client.deviceId,
            level: 2,
            purpose: "reset-password"
        });

        return 200;
    }

    async verifyAccount(
        email: string, 
        verificationCode: string
    ): Promise<number> {
        await this.client.makeRequest("POST", "/check-security-validation", {
            validationContext: {
                type: 1, 
                identity: email, 
                data: { code: verificationCode }
            },
            deviceID: this.client.deviceId
        });

        return 200;
    }

    async activateAccount(
        email: string, 
        activationCode: string
    ): Promise<number> {
        await this.client.makeRequest("POST", "/activate-email", {
            type: 1, 
            identity: email, 
            data: { code: activationCode },
            deviceID: this.client.deviceId
        });

        return 200;
    }

    async changePassword(
        code: string,
        email: string, 
        password: string
    ): Promise<number> {
        await this.client.makeRequest("POST", "/reset-password", {
            updateSecret: `0 ${password}`,
            emailValidationContext: {
                data: { code: code },
                type: 1,
                identity: email,
                level: 2,
                deviceID: this.client.deviceId
            },
            phoneNumberValidationContext: null, 
            deviceID: this.client.deviceId,
        });

        return 200;
    }
    
    async deleteAccount(password: string): Promise<number> {
        await this.client.makeRequest("POST", "/delete-request", {
            secret: `0 ${password}`,
            deviceID: this.client.deviceId
        });

        return 200;
    }
}