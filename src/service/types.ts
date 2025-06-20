import { Account } from "../structures/account";
import { UserProfile } from "../structures/userProfile";

export type WallCommentsTypes = "newest" | "oldest" | "vote";

export interface AuthResponse {
    auid: string;
    account: Account;
    secret: string;
    sid: string;
    userProfile: UserProfile;
}

export class UserProfileBuilder {
    private data: Record<string, any> = {}; 

    setNickname(nickname: string): void {
        this.data["nickname"] = nickname;
    }

    setContent(content: string): void {
        this.data["content"] = content;
    }

    setBackgroundColor(backgroundColor: string): void {
        this.data["extensions"] = {
            style: {
                backgroundColor: backgroundColor
            }
        };
    }

    setBackgroundImage(backgroundImage: string | null): void {
        this.data["extensions"] = {
            style: {
                backgroundMediaList: [[100, backgroundImage, null, null, null]]
            }
        };
    }

    setDefaultBubbleId(defaultBubbleId: string | null): void {
        this.data["defaultBubbleId"] = {
            defaultBubbleId: defaultBubbleId
        };
    }

    build(): Record<string, any> {
        return this.data;
    }
}