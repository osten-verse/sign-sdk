"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Signers = void 0;
class Signers {
    constructor(routers) {
        this.routers = routers;
        this.routers = routers;
    }
    get() {
        return this.signers[0];
    }
}
exports.Signers = Signers;
class Signer {
    constructor(routers) {
        this.routers = routers;
    }
    remove() {
        this.routers.deleteEnvelopeSigner([{ envelopeId: this.signer.envelopeId, data: [{ signerId: this.signer.id }] }]);
    }
}
