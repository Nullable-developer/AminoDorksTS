export interface Account {
    username: string | null;
    status: number;
    uid: string;
    modifiedTime: string;
    twitterID: string | null;
    activation: number;
    phoneNumberActivation: number;
    emailActivation: number;
    appleID: string | null;
    facebookID: string | null;
    nickname: string;
    mediaList: any;
    googleID: string | null;
    icon: string | null;
    securityLevel: number;
    phoneNumber: string | null;
    membership: any;
    advancedSettings: { analyticsEnabled: number };
    role: number;
    aminoIdEditable: boolean;
    aminoId: string;
    createdTime: string;
    extensions: {
        contentLanguage: string;
        adsFlags: number;
        adsLevel: number;
        deviceInfo?: any;
        adsEnabled: boolean;
        mediaLabAdsMigrationAugust2020: boolean;
        popupConfig?: any;
    };
    email: string;
}