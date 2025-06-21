import { UserService } from "./user.service";
import { UserProfile } from "../structures";
import { WallCommentsTypes, UserProfileBuilder, MembersType } from "./types";

export class NDCService {
    readonly ndcUrl: string;
    readonly userService: UserService;
    readonly ndcId: string;

    constructor(userService: UserService, ndcId: string) {
        this.ndcUrl = `https://service.aminoapps.com/api/v1/x${ndcId}`;
        this.userService = userService
        this.ndcId = ndcId;
    }

    getUserInfo = async (userId: string): Promise<UserProfile> => {
        return await this.userService.getUserInfo(this.ndcUrl, userId)
    }

    getUserFollowing = async (userId: string, start: number, size: number): Promise<Array<UserProfile>> => {
        return await this.userService.getUserFollowing(this.ndcUrl, userId, start, size)
    }

    getUserFollowers = async (userId: string, start: number, size: number): Promise<Array<UserProfile>> => {
        return await this.userService.getUserFollowing(this.ndcUrl, userId, start, size)
    }

    getWallComments = async (userId: string, sorting: WallCommentsTypes, start: number, size: number): Promise<any>  => {
        return await this.userService.getWallComments(this.ndcUrl, userId, sorting, start, size)
    }

    follow = async (userIds: number[]): Promise<any> => {
        return await this.userService.follow(this.ndcUrl, userIds)
    }

    unfollow = async (userId: string): Promise<any> => {
        return await this.userService.unfollow(this.ndcUrl, userId)
    }

    editProfile = async (userProfileBuilder: UserProfileBuilder): Promise<any> => {
        return await this.userService.editProfile(this.ndcUrl, userProfileBuilder)
    }

    sendWallComment = async (content: string, userId: string, repliedMessageId?: string): Promise<any> => {
        return await this.userService.sendWallComment(this.ndcUrl, content, userId, repliedMessageId)
    }

    deleteWallComment = async (userId: string, commentId: string): Promise<any> => {
        return await this.userService.deleteWallComment(this.ndcUrl, userId, commentId)
    }

    likeWallComment = async (userId: string, commentId: string): Promise<any> => {
        return await this.userService.likeWallComment(this.ndcUrl, userId, commentId)
    }

    unlikeWallComment = async (userId: string, commentId: string): Promise<any> => {
        return await this.userService.unlikeWallComment(this.ndcUrl, userId, commentId)
    }

    getAllUsers = async (type: MembersType, start: number, size: number): Promise<Array<UserProfile>> => {
        return await this.userService.getAllUsers(this.ndcUrl, type, start, size)
    }
}