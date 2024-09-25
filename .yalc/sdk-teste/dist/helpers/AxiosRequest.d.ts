export declare class Request {
    private apiPath;
    private jwt;
    constructor(publicKey: string, defaultUserId: string, secretKey: string, apiPath?: string);
    get(path: string, params: any, optional?: {
        userId?: string;
    }): Promise<any>;
    post(path: string, body: any, optional?: {
        userId: string;
    }): Promise<any>;
    put(path: string, body: any, optional?: {
        userId: string;
    }): Promise<any>;
    delete(path: string, body: any, optional?: {
        userId: string;
    }): Promise<any>;
}
//# sourceMappingURL=AxiosRequest.d.ts.map