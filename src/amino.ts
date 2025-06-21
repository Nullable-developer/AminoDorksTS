import { Client } from "./core/client";
import { AuthResponse } from "./service/types";
import { AuthService } from "./service/auth.service";
import { UserService } from "./service/user.service";
import { NDCService } from "./service/ndc.service";

export class AminoDorks {
    private userId?: string;
    private deviceId?: string;
    private sessionId?: string;

    private readonly client: Client = new Client(
        this.sessionId, this.userId, this.deviceId
    );

    private readonly authService: AuthService = new AuthService(this.client);
    private readonly userService: UserService = new UserService(this.client);
    
    // IQ test
    private _ndcService?: NDCService;

    constructor(sessionId?: string, userId?: string, deviceId?: string) {
        this.userId = userId;
        this.deviceId = deviceId;
        this.sessionId = sessionId;
    }

    public get community(): NDCService | undefined {
        return this._ndcService;
    }

    public set ndcId(ndcId: string) {
        this._ndcService = new NDCService(this.userService, ndcId);
    }

    /**
     * Authenticate a user with email and password.
     * @param email User's email
     * @param password User's password
     * @returns AuthResponse object
     */
    authenticate = async (email: string, password: string): Promise<AuthResponse> => {
        return await this.authService.authenticate(email, password);
    }

    /**
     * Authenticate a user with phone number and password.
     * @param phoneNumber User's phone number
     * @param password User's password
     * @returns AuthResponse object
     */
    authenticateWithPhone = async (phoneNumber: string, password: string): Promise<AuthResponse> => {
        return await this.authService.authenticateWithPhone(phoneNumber, password);
    }

    /**
     * Create a new account.
     * @param email User's email
     * @param password User's password
     * @param nickname User's nickname
     * @param deviceId Device identifier
     * @param verificationCode Verification code
     * @returns Operation status code
     */
    createAccount = async (
        email: string,
        password: string,
        nickname: string,
        deviceId: string,
        verificationCode: string
    ): Promise<number> => {
        return await this.authService.createAccount(
            email, password, nickname, deviceId, verificationCode
        );
    }

    /**
     * Disconnect the current user (logout).
     * @returns Operation status code
     */
    disconnect = async (): Promise<number> => {
        return await this.authService.disconnect();
    }

    /**
     * Request a verification code to be sent to the user's email.
     * @param email User's email
     * @returns Operation status code
     */
    requestVerifictionCode = async (email: string): Promise<number> => {
        return await this.authService.requestVerifictionCode(email);
    }

    /**
     * Request a password reset for the user's email.
     * @param email User's email
     * @returns Operation status code
     */
    requestResetPassword = async (email: string): Promise<number> => {
        return await this.authService.requestResetPassword(email);
    }

    /**
     * Verify a user's account using a verification code.
     * @param email User's email
     * @param verificationCode Verification code
     * @returns Operation status code
     */
    verifyAccount = async (email: string, verificationCode: string): Promise<number> => {
        return await this.authService.verifyAccount(email, verificationCode);
    }

    /**
     * Activate a user's account using an activation code.
     * @param email User's email
     * @param activationCode Activation code
     * @returns Operation status code
     */
    activateAccount = async (email: string, activationCode: string): Promise<number> => {
        return await this.authService.activateAccount(email, activationCode);
    }

    /**
     * Change the user's password.
     * @param code Verification code
     * @param email User's email
     * @param password New password
     * @returns Operation status code
     */
    changePassword = async (code: string, email: string, password: string): Promise<number> => {
        return await this.authService.changePassword(code, email, password);
    }

    /**
     * Delete the user's account.
     * @param password User's password
     * @returns Operation status code
     */
    deleteAccount = async (password: string): Promise<number> => {
        return await this.authService.deleteAccount(password);
    }
}