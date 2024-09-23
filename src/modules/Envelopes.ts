// import { Routers } from '../services/RoutersService'
// import { Signers } from './EnvelopeSigner'

// export class Envelope {
//   private routers: Routers
//   private envelope: any

//   private constructor(routers: Routers, envelope?: any) {
//     this.routers = routers
//     this.envelope = envelope
//   }

//   static start(routers: Routers) {
//     return new Envelope(routers)
//   }

//   static startByRequest(routers: Routers, envelope: any) {
//     return new Envelope(routers, envelope)
//   }

//   print() {
//     console.log(this.envelope)
//   }

//   close() {}

//   signer(): Signers {
//     if (!this.envelope.signer) this.envelope.signer = new Signers(this.routers)

//     return this.envelope.signers
//   }
// }

// const router = new Routers('', '', '')
// const envelope = Envelope.start(router)
// const signers = envelope.signer().list()
// signers.map((it) => envelope.signer().get(it.id).remove())
// envelope.close()
