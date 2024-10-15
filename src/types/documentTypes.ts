import { BaseResponse } from './BaseResponse'

export type DocumentsEntity = {
  id: string
  envelopId: string
  userId: string
  companyId: string
  alias: string
  url: string
  createdFrom: string
  createdAt: string
  updatedAt: string
}

export type DocumentQuery = {
  id?: string
  envelopId?: string
  userId?: string
  companyId?: string
  alias?: string
  url?: string
  createdFrom?: string
  createdAt?: string
  updatedAt?: string
  includes?: Array<string>
  sortBy?: {
    id: 'DESC' | 'ASC'
    envelopId: 'DESC' | 'ASC'
    userId: 'DESC' | 'ASC'
    companyId: 'DESC' | 'ASC'
    alias: 'DESC' | 'ASC'
    url: 'DESC' | 'ASC'
    createdFrom: 'DESC' | 'ASC'
    createdAt: 'DESC' | 'ASC'
    updatedAt: 'DESC' | 'ASC'
  }
  page?: number
  pageSize?: number
}

export type CreateDocumentType = {
  alias: string
}

export type ResponseListDocumentDTO = BaseResponse & {
  documents: Array<DocumentsEntity>
}

export type ResponseCreateDocument = {
  id: string
  userId: string
  alias: string
  url: string
  createdFrom: string
  companyId: string
}
