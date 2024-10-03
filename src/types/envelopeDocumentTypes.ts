export type ManageDocumentInEnvelopeData = {
  id: string
}

type ManageDocumentInEnvelope = {
  envelopeId: string
  documents: Array<ManageDocumentInEnvelopeData>
}

export type ManageEnvelopeDocumentType = {
  soft?: boolean
  data: Array<ManageDocumentInEnvelope>
}

type DocumentInEnvelope = {
  envelopeId: string
  originalDocumentId: string
  documentWithoutSummaryId: null
  documentWithSummaryId: null
  createdAt: string
}

export type AddDocumentInEnvelope = {
  entities: Array<DocumentInEnvelope>
  totalElements: number
  rejectedInputs: Array<any>
}

type DeleteDocInEnvelope = {
  envelopeId: string
  originalDocumentId: string
  documentWithoutSummaryId: null
  documentWithSummaryId: null
  createdAt: string
}

export type RemoveDocumentInEnvelope = {
  entities: Array<DeleteDocInEnvelope>
  totalElements: number
  rejectedInputs: Array<any>
}
