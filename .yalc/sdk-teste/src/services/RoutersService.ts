import { Query } from '@duaneoli/typeorm-nest-joi-parse'
import { Request } from '../helpers/AxiosRequest'
import { CreateAndRemoveEnvelopeDocumentType } from '../types/envelopeDocumentTypes'
import {
  CreateEnvelopeSignerData,
  DeleteEnvelopeSignerData,
  ResendNotificationEnvelopeSigner,
} from '../types/envelopeSignerTypes'
import { CancelEnvelopeData, CloseEnvelopeData, CreateEnvelopeData, EnvelopeEntity } from '../types/envelopeTypes'
import { CreateTagData, DeleteTagData } from '../types/tagTypes'
import { CreateDocumentData, DocumentsEntity } from './../types/documentTypes'

export class Routers extends Request {
  constructor(publicKey: string, defaultUserId: string, secretKey: string, apiPath?: string) {
    super(publicKey, defaultUserId, secretKey, apiPath)
  }

  async listEnvelope(
    params: {
      query?: Query<EnvelopeEntity>
      includes: Array<string>
      page?: number
      pageSize?: number
    },
    options?: {
      userId?: string
    },
  ) {
    return this.get(
      'envelope',
      {
        filters: params?.query.filters.stringify().replace('filters=', ''),
        sortBy: params?.query.sortBy.stringify().replace('sortBy=', ''),
        includes: params?.includes,
        page: params?.page,
        pageSize: params?.pageSize,
      } as any,
      options,
    )
  }

  async getEnvelopeById(
    params: {
      query?: Query<{ id: string }>
    },
    options?: {
      userId?: string
    },
  ) {
    return this.get(
      'envelope',
      {
        filters: params?.query.filters.stringify().replace('filters=', ''),
      } as any,
      options,
    )
  }

  async createEnvelope(body: Array<CreateEnvelopeData>, userId?: string) {
    return this.post('envelope', body, { userId })
  }

  async closeEnvelope(body: Array<CloseEnvelopeData>, userId?: string) {
    return this.put('envelope/close', body, { userId })
  }

  async cancelEnvelope(body: Array<CancelEnvelopeData>, userId?: string) {
    return this.put('envelope/cancel', body, { userId })
  }

  async createAndRemoveDocument(method: 'set' | 'remove', body: CreateAndRemoveEnvelopeDocumentType, userId?: string) {
    return this.post(`envelope/${method}/document`, body, { userId })
  }

  async listDocument(
    params: {
      query?: Query<DocumentsEntity>
      includes: Array<string>
      page?: number
      pageSize?: number
    },
    options?: {
      userId?: string
    },
  ) {
    return this.get(
      'documents',
      {
        filters: params?.query.filters.stringify().replace('filters=', ''),
        sortBy: params?.query.sortBy.stringify().replace('sortBy=', ''),
        includes: params?.includes,
        page: params?.page,
        pageSize: params?.pageSize,
      } as any,
      options,
    )
  }

  async createDocument(body: Array<CreateDocumentData>, userId?: string) {
    return this.post('documents', body, { userId })
  }

  async createEnvelopeSigner(body: Array<CreateEnvelopeSignerData>, userId?: string) {
    return this.post('envelope-signer', body, { userId })
  }

  async deleteEnvelopeSigner(body: Array<DeleteEnvelopeSignerData>, userId?: string) {
    return this.delete('envelope-signer', body, { userId })
  }

  async resendNotification(body: ResendNotificationEnvelopeSigner, userId?: string) {
    return this.post('envelope-signer/resend-notification', body, { userId })
  }

  async createTag(body: Array<CreateTagData>, userId?: string) {
    return this.post('tags', body, { userId })
  }

  async deleteTag(body: Array<DeleteTagData>, userId?: string) {
    return this.delete('tags', body, { userId })
  }
}
