import { Routers } from './../services/RoutersService';
export declare class Signers {
    private readonly routers;
    private signers;
    constructor(routers: Routers);
    get(): Signer;
}
declare class Signer {
    private readonly routers;
    private signer;
    constructor(routers: Routers);
    remove(): void;
}
export {};
//# sourceMappingURL=EnvelopeSigner.d.ts.map