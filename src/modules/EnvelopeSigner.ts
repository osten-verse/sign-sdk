import { Routers } from './../services/RoutersService'

export class Signers {
  private signers: Array<Signer>

  constructor(private readonly routers: Routers) {
    this.routers = routers
  }

  get() {
    return this.signers[0]
  }
}

class Signer {
  private signer: any
  constructor(private readonly routers: Routers) {}

  remove() {
    this.routers.deleteEnvelopeSigners([{ envelopeId: this.signer.envelopeId, data: [{ signerId: this.signer.id }] }])
  }
}
