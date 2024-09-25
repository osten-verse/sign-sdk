export declare class JWTToken {
    private publicKey;
    private defaultUserId;
    private secretKey;
    private defaultTokens;
    constructor(publicKey: string, defaultUserId: string, secretKey: string);
    generate(userId: string, time: string): any;
    get(userId?: string): string;
}
//# sourceMappingURL=JWTToken.d.ts.map