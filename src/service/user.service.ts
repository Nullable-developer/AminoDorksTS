import { Client } from "../core/client";
import { API_URL } from "../constants";
import { UserProfile } from "../structures";
import { WallCommentsTypes, UserProfileBuilder, MembersType } from "./types";

export class UserService {
    readonly client: Client;
    readonly SERVICE_ENDPOINT: string = "/s/user-profile";

    constructor(client: Client) {
        this.client = client;
    }

    async getLinkedCommunities(userId: string): Promise<any> {
        const response = await this.client.makeRequest(
            API_URL, "GET", `${this.SERVICE_ENDPOINT}/${userId}/linked-communities`
        );

        return response;
    }
    
    async getUserInfo(contextUrl: string, userId: string): Promise<UserProfile> {
        const response = await this.client.makeRequest(
            contextUrl, "GET", `${this.SERVICE_ENDPOINT}/${userId}`
        ) as UserProfile;

        return response;
    }   

    async getUserFollowing(contextUrl: string, userId: string, start: number, size: number): Promise<Array<UserProfile>> {
        const response = await this.client.makeRequest(
            contextUrl, "GET", `${this.SERVICE_ENDPOINT}/${userId}/joined?start=${start}&size=${size}`
        );

        return response.userProfileList as Array<UserProfile>;

    }

    async getUserVisitors(userId: string, start: number, size: number): Promise<Array<UserProfile>> {
        const response = await this.client.makeRequest(
            API_URL, "GET", `${this.SERVICE_ENDPOINT}/${userId}/visitor?start=${start}&size=${size}`
        );

        return response.userProfileList as Array<UserProfile>;
    }
    
    async getUserFollowers(contextUrl: string, userId: string, start: Number, size: number): Promise<Array<UserProfile>> {
        const response = await this.client.makeRequest(
            contextUrl, "GET", `${this.SERVICE_ENDPOINT}/${userId}/member?start=${start}&size=${size}`
        );

        return response.userProfileList as Array<UserProfile>;
    }

    async getWallComments(contextUrl: string, userId: string, sorting: WallCommentsTypes, start: number, size: number): Promise<any> {
        const response = await this.client.makeRequest(
            contextUrl, "GET", `${this.SERVICE_ENDPOINT}/${userId}/g-comments?sort=${sorting}&start=${start}&size=${size}`
        );

        return response;
    }

    async visit(userId: string): Promise<number> {
        await this.client.makeRequest(
            API_URL, "GET", `${this.SERVICE_ENDPOINT}/${userId}?action=visit`
        );

        return 200;
    }

    async follow(contextUrl: string, userIds: number[]): Promise<any> {
        await this.client.makeRequest(
            contextUrl, "POST", `${this.SERVICE_ENDPOINT}/${this.client.userId}/joined`, {
                targetUidList: userIds
            }
        );
    }

    async unfollow(contextUrl: string, userId: string): Promise<any> {
        await this.client.makeRequest(
            contextUrl, "DELETE", `${this.SERVICE_ENDPOINT}/${userId}/member/${this.client.userId}`
        );
    }


    async editProfile(
        contextUrl: string,
        userProfileBuilder: UserProfileBuilder
    ): Promise<number> {
        let data: Record<string, any> = {
            address: null, 
            latitude: 0,
            longitude: 0,
            mediaList: null,
            eventSource: "UserProfileView",
            ...userProfileBuilder.build()
        };

        await this.client.makeRequest(
            contextUrl, "POST", `${this.SERVICE_ENDPOINT}/${this.client.userId}`, data
        );

        return 200;
    }

    async sendWallComment(contextUrl: string, content: string, userId: string, repliedMessageId?: string): Promise<any> {
        await this.client.makeRequest(
            contextUrl, "POST", `${this.SERVICE_ENDPOINT}/${userId}/g-comment`, {
                content: content,
                stickerId: null,
                type: 0,
                respondTo: repliedMessageId
            }
        )
    }

    async deleteWallComment(contextUrl: string, userId: string, commentId: string): Promise<any> {
        await this.client.makeRequest(
            contextUrl, "DELETE", `${this.SERVICE_ENDPOINT}/${userId}/g-comment/${commentId}`
        )
    }

    async likeWallComment(contextUrl: string, userId: string, commentId: string): Promise<any> {
        await this.client.makeRequest(
            contextUrl, "POST", `${this.SERVICE_ENDPOINT}/${userId}/comment/${commentId}/g-vote?cv=1.2&value=1`, {
                value: 4,
                eventSource: "UserProfileView"
            }
        )
    }

    async unlikeWallComment(contextUrl: string, userId: string, commentId: string): Promise<any> {
        await this.client.makeRequest(contextUrl, "DELETE", `${this.SERVICE_ENDPOINT}/${userId}/comment/${commentId}/g-vote?eventSource=UserProfileView`)
    }

    async getAllUsers(contextUrl: string, type: MembersType, start: number, size: number): Promise<Array<UserProfile>> {
        const response = await this.client.makeRequest(
            contextUrl, "GET", `${this.SERVICE_ENDPOINT}?type=${type}&start=${start}&size=${size}`
        );

        return response.userProfileList as Array<UserProfile>;
    }
}
