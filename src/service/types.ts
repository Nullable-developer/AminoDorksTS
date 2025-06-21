import { Account } from "../structures/account";
import { UserProfile } from "../structures/userProfile";

export type WallCommentsTypes = "newest" | "oldest" | "vote";
export type MembersType = "recent" | "banned" | "featured" | "leaders" | "curators"

export interface AuthResponse {
    auid: string;
    account: Account;
    secret: string;
    sid: string;
    userProfile: UserProfile;
}

export class UserProfileBuilder {
    private data: Record<string, any> = {}; 

    setNickname(nickname: string): UserProfileBuilder {
        this.data["nickname"] = nickname;
        return this;
    }

    setContent(content: string): UserProfileBuilder {
        this.data["content"] = content;
        return this;
    }

    setBackgroundColor(backgroundColor: string): UserProfileBuilder {
        this.data["extensions"] = {
            style: {
                backgroundColor: backgroundColor
            }
        };

        return this;
    }

    setBackgroundImage(backgroundImage: string | null): UserProfileBuilder {
        this.data["extensions"] = {
            style: {
                backgroundMediaList: [[100, backgroundImage, null, null, null]]
            }
        };

        return this;
    }

    setDefaultBubbleId(defaultBubbleId: string | null): UserProfileBuilder {
        this.data["defaultBubbleId"] = {
            defaultBubbleId: defaultBubbleId
        };

        return this;
    }

    build(): Record<string, any> {
        return this.data;
    }
}