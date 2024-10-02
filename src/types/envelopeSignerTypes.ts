export enum SignatureStatus {
  REJECTED = 'reject',
  SIGNED = 'signed',
  COMPLETED = 'completed',
  PENDING = 'pending',
}

export enum SignatureType {
  PARTY = 'party',
  APPROVER = 'approver',
  WITNESS = 'witness',
  CLIENT = 'client',
  SELLER = 'seller',
  MANAGER = 'manager',
  ACKNOWLEDGE = 'acknowledge',
  ACKNOWLEDGE_RECEIPT = 'acknowledge_receipt',
}

export type EnvelopeSignerEntity = {
  envelopeId: string
  signerId: string
  order: number
  signatureType: SignatureType
  requirePersonalDocument: boolean
  requireEmailToken: boolean
  requireRubric: boolean
  requireSignature: boolean
  status: SignatureStatus
  log: string
  createdAt: string
  updatedAt: string
}

export type EnvelopeSignerQuery = {
  filters?: {
    signerId: string
    envelopeId: string
    order: number
    signatureType: string
    requirePersonalDocument: boolean
    requireEmailToken: boolean
    requireRubric: boolean
    requireSignature: boolean
    status: string
    log: string
    createdAt: string
    updatedAt: string
  }
  includes?: Array<string>
  sortBy?: {
    envelopeId: 'DESC' | 'ASC'
    signerId: 'DESC' | 'ASC'
    order: 'DESC' | 'ASC'
    signatureToken: 'DESC' | 'ASC'
    signatureType: 'DESC' | 'ASC'
    assigned: 'DESC' | 'ASC'
    requirePersonalDocument: 'DESC' | 'ASC'
    requireEmailToken: 'DESC' | 'ASC'
    requireRubric: 'DESC' | 'ASC'
    requireSignature: 'DESC' | 'ASC'
    createdAt: 'DESC' | 'ASC'
    updatedAt: 'DESC' | 'ASC'
  }
  page?: number
  pageSize?: number
}

type CreateData = {
  order: number
  signatureType: SignatureType
  requirePersonalDocument: boolean
  requireEmailToken: boolean
  email: string
  fullName: string
}

export type CreateEnvelopeSignerData = {
  data: Array<CreateData>
  envelopeId: string
}

type DeleteData = {
  signerId: string
}

export type DeleteEnvelopeSignerData = {
  data: Array<DeleteData>
  envelopeId: string
}

type ResendNotificationData = {
  signerId: string
}

export type ResendNotificationEnvelopeSigner = {
  data: Array<ResendNotificationData>
  envelopeId: string
}
