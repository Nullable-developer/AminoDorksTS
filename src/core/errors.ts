export class DorksError extends Error {
    public readonly status: number;

    constructor(message: string, status: number) {
        super(message || `Error ${status}`);
        this.status = status;
        this.name = new.target.name;
        Error.captureStackTrace?.(this, new.target);
    }
}

export class DorksUnsupportedService extends DorksError {
    constructor(message?: string) {
        super(message ?? "Unsupported service", 100);
    }
}

export class DorksFileTooLarge extends DorksError {
    constructor(message?: string) {
        super(message ?? "File size exceeds the limit", 102);
    }
}

export class DorksInvalidRequest extends DorksError {
    constructor(message?: string) {
        super(message ?? "Invalid request", 103);
    }
}

export class DorksInvalidSession extends DorksError {
    constructor(message?: string) {
        super(message ?? "Invalid session", 105);
    }
}

export class DorksAccessDenied extends DorksError {
    constructor(message?: string) {
        super(message ?? "Access denied", 106);
    }
}

export class DorksUnexistentData extends DorksError {
    constructor(message?: string) {
        super(message ?? "Data does not exist", 107);
    }
}

export class DorksActionNotAllowed extends DorksError {
    constructor(message?: string) {
        super(message ?? "Action not allowed", 110);
    }
}

export class DorksServiceUnderMaintenance extends DorksError {
    constructor(message?: string) {
        super(message ?? "Service is under maintenance", 111);
    }
}

export class DorksMessageNeeded extends DorksError {
    constructor(message?: string) {
        super(message ?? "Message is required", 113);
    }
}

export class DorksAccountDisabled extends DorksError {
    constructor(message?: string) {
        super(message ?? "Account is disabled", 210);
    }
}

export class DorksInvalidEmail extends DorksError {
    constructor(message?: string) {
        super(message ?? "Invalid email address", 213);
    }
}

export class DorksInvalidPassword extends DorksError {
    constructor(message?: string) {
        super(message ?? "Invalid password", 214);
    }
}

export class DorksEmailAlreadyTaken extends DorksError {
    constructor(message?: string) {
        super(message ?? "Email is already taken", 215);
    }
}

export class AccountDoesntExist extends DorksError {
    constructor(message?: string) {
        super(message ?? "Account does not exist", 216);
    }
}

export class DorksBadGateway extends DorksError {
    constructor(message?: string) {
        super(message ?? "Bad gateway", 502);
    }
}

const DorksErrors: Record<number, new (message?: string) => DorksError> = {
    100: DorksUnsupportedService,
    102: DorksFileTooLarge,
    103: DorksInvalidRequest,
    105: DorksInvalidSession,
    106: DorksAccessDenied,
    107: DorksUnexistentData,
    110: DorksActionNotAllowed,
    111: DorksServiceUnderMaintenance,
    113: DorksMessageNeeded,
    210: DorksAccountDisabled,
    213: DorksInvalidEmail,
    214: DorksInvalidPassword,
    215: DorksEmailAlreadyTaken,
    216: AccountDoesntExist,
    502: DorksBadGateway
};

export function getDorksErrorByStatus(status: number, message?: string): DorksError {
    const ErrorClass = DorksErrors[status];

    if (ErrorClass) {
        throw new ErrorClass(message);
    }
    
    throw new DorksError(message || `Unknown error with status ${status}`, status);
}