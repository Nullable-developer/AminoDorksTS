import { Client } from "../core/client";
import { WallCommentsTypes, UserProfileBuilder } from "./types";

export class UserService {
    readonly client: Client;
    readonly SERVICE_ENDPOINT: string = "/g/s/user-profile";

    constructor(client: Client) {
        this.client = client;
    }

    async getLinkedCommunities(userId: string): Promise<any> {
        const response = await this.client.makeRequest(
            "GET", `${this.SERVICE_ENDPOINT}/${userId}/linked-communities`
        );

        return response;
    }
    
    async getUserInfo(userId: string): Promise<any> {
        const response = await this.client.makeRequest(
            "GET", `${this.SERVICE_ENDPOINT}/${userId}`
        );

        return response;
    }

    async getUserFollowing(userId: string, start: number, size: number): Promise<any> {
        const response = await this.client.makeRequest(
            "GET", `${this.SERVICE_ENDPOINT}/${userId}/joined?start=${start}&size=${size}`
        );

        return response

    }

    async getUserVisitors(userId: string, start: number, size: number): Promise<any> {
        const response = await this.client.makeRequest(
            "GET", `${this.SERVICE_ENDPOINT}/${userId}/visitor?start=${start}&size=${size}`
        );

        return response;
    }
    
    async getUserFollowers(userId: string, start: Number, size: number): Promise<any> {
        const response = await this.client.makeRequest(
            "GET", `${this.SERVICE_ENDPOINT}/${userId}/member?start=${start}&size=${size}`
        );

        return response
    }

    async getWallComments(userId: string, sorting: WallCommentsTypes, start: number, size: number): Promise<any> {
        const response = await this.client.makeRequest(
            "GET", `${this.SERVICE_ENDPOINT}/${userId}/g-comments?sort=${sorting}&start=${start}&size=${size}`
        );

        return response;
    }

    async visit(userId: string): Promise<number> {
        await this.client.makeRequest(
            "GET", `${this.SERVICE_ENDPOINT}/${userId}?action=visit`
        );

        return 200;
    }

    async follow(userIds: number[]): Promise<any> {
        await this.client.makeRequest(
            "POST", `${this.SERVICE_ENDPOINT}/${this.client.userId}/joined`, {
                targetUidList: userIds
            }
        );
    }

    async unfollow(userId: string): Promise<any> {
        await this.client.makeRequest(
            "DELETE", `${this.SERVICE_ENDPOINT}/${userId}/member/${this.client.userId}`
        );
    }


    async editProfile(
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
            "POST", `${this.SERVICE_ENDPOINT}/${this.client.userId}`, data
        );

        return 200;
    }

    async sendWallComment(content: string, userId: string, repliedMessageId?: string): Promise<any> {
        await this.client.makeRequest(
            "POST", `${this.SERVICE_ENDPOINT}/${userId}/g-comment`, {
                content: content,
                stickerId: null,
                type: 0,
                respondTo: repliedMessageId
            }
        )
    }

    async deleteWallComment(userId: string, commentId: string): Promise<any> {
        await this.client.makeRequest(
            "DELETE", `${this.SERVICE_ENDPOINT}/${userId}/g-comment/${commentId}`
        )
    }

    async likeWallComment(userId: string, commentId: string): Promise<any> {
        await this.client.makeRequest(
            "POST", `${this.SERVICE_ENDPOINT}/${userId}/comment/${commentId}/g-vote?cv=1.2&value=1`, {
                value: 4,
                eventSource: "UserProfileView"
            }
        )
    }

    async unlikeWallComment(userId: string, commentId: string): Promise<any> {
        await this.client.makeRequest("DELETE", `${this.SERVICE_ENDPOINT}/${userId}/comment/${commentId}/g-vote?eventSource=UserProfileView`)
    }

    async getAllUsers(type: string, start: number, size: number): Promise<any> {
        const response = await this.client.makeRequest(
            "GET", `${this.SERVICE_ENDPOINT}?type=${type}&start=${start}&size=${size}`
        );

        return response
    }
}