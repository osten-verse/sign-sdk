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

  /**
   * Method to retrieve envelopes
   * @param params - used to query a specific field
   * @param options - extra information, such as a ID of the user logged into the system in this case
   * @returns - an array of envelopes
   */
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

  /**
   * Method to retrieve envelopes and their signers
   * @param params - used to query a specific field
   * @param options - extra information, such as a ID of the user logged into the system in this case
   * @returns - an array of envelopes and their signers
   */
  async listEnvelopeSigners(
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
        includes: ['envelopeSigners', 'envelopeSigners.signer'],
        page: params?.page,
        pageSize: params?.pageSize,
      } as any,
      options,
    )
  }

  /**
   * Method to retrieve envelopes and their documents
   * @param params - used to query a specific field
   * @param options - extra information, such as a ID of the user logged into the system in this case
   * @returns - an array of envelopes and their documents
   */
  async listEnvelopesDocuments(
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
        includes: ['envelopeDocuments', 'envelopeDocuments.document'],
        page: params?.page,
        pageSize: params?.pageSize,
      } as any,
      options,
    )
  }

  /**
   * Method to retrieve an envelope by id
   * @param params - used to query a specific id
   * @param options - extra information, such as a ID of the user logged into the system in this case
   * @returns - an single envelope
   */
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

  /**
   * Method to create an array of envelopes
   * @param body - contains the necessary information to create an array of envelopes
   * @param userId - ID of the user logged into the system
   * @returns - an array of created envelopes
   */
  async createEnvelope(body: Array<CreateEnvelopeData>, userId?: string) {
    return this.post('envelope', body, { userId })
  }

  /**
   * Method to close an array of envelopes. Once closed, the envelopes no longer have draft status and are able to be signed
   * @param body - contains an array of envelope Ids to close
   * @param userId - ID of the user logged into the system
   * @returns - an array of closed envelopes
   */
  async closeEnvelope(body: Array<CloseEnvelopeData>, userId?: string) {
    return this.put('envelope/close', body, { userId })
  }

  /**
   * Method to cancel an array of envelopes. Once canceled, the envelopes no longer have draft status and are not able to be signed
   * @param body - contains an array of envelope Ids to cancel
   * @param userId - ID of the user logged into the system
   * @returns - an array of canceled envelopes
   */
  async cancelEnvelope(body: Array<CancelEnvelopeData>, userId?: string) {
    return this.put('envelope/cancel', body, { userId })
  }

  /**
   * Method to add or to remove documents in envelope
   * @param body - an array of envelope Ids, and within each position of that array, there is another array containing signers Ids
   * @param userId - ID of the user logged into the system
   * @returns - an array of envelope IDs with with an array of their corresponding document IDs
   */
  async createAndRemoveDocument(method: 'set' | 'remove', body: CreateAndRemoveEnvelopeDocumentType, userId?: string) {
    return this.post(`envelope/${method}/document`, body, { userId })
  }

  /**
   * Method to retrieve documents
   * @param params - used to query a specific field
   * @param options - extra information, such as a ID of the user logged into the system in this case
   * @returns - an array of documents
   */
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

  /**
   * Method to retrieve a token to access function getDocumentUrl
   * @param body - contains an array of document IDs
   * @param userId - ID of the user logged into the system
   * @returns - an array of tokens
   */
  async getTokenDocumentsUrl(body: Array<{ id: string }>, userId?: string) {
    return this.post('envelope/document-url', body, { userId })
  }

  /**
   * Method to retrieve a specific document entity to upload a document
   * @param token - token retrieved from function getTokenDocumentsUrl
   * @param userId - ID of the user logged into the system
   * @returns - a document with the link to upload the document
   */
  async getDocumentUrl(token: string, userId?: string) {
    return this.get('documents/url', '', { userId, tokenParams: token })
  }

  /**
   * Method to create a document
   * @param body - contains the necessary information to create an array of documents
   * @param userId - ID of the user logged into the system
   * @returns - an array of created documents
   */
  async createDocument(body: Array<CreateDocumentData>, userId?: string) {
    return this.post('documents', body, { userId })
  }

  /**
   * Method to add signers to envelope
   * @param body - an array of envelope IDs, and within each position of that array, there is another array containing information to add signers
   * @param userId - ID of the user logged into the system
   * @returns - an array of envelopes Ids and another array with their signers ids
   */
  async createEnvelopeSigner(body: Array<CreateEnvelopeSignerData>, userId?: string) {
    return this.post('envelope-signer', body, { userId })
  }

  /**
   * Method to delete signers from an envelope
   * @param body - an array of envelope IDs, and within each position of that array, there is another array containing signer IDs
   * @param userId - ID of the user logged into the system
   * @returns - an array of envelopes Ids and another array with their signers ids
   */
  async deleteEnvelopeSigner(body: Array<DeleteEnvelopeSignerData>, userId?: string) {
    return this.delete('envelope-signer', body, { userId })
  }

  /**
   * Method to resend the signature link to the signer
   * @param body - an array of envelope IDs, and within each position of that array, there is another array containing signer IDs
   * @param userId - ID of the user logged into the system
   * @returns - empty
   */
  async resendNotification(body: ResendNotificationEnvelopeSigner, userId?: string) {
    return this.post('envelope-signer/resend-notification', body, { userId })
  }

  /**
   * Method to create a tag in the envelope
   * @param body - an array of envelope IDs, and within each position of that array, there is another array containing information of each tag
   * @param userId - ID of the user logged into the system
   * @returns - an array of envelopes Ids and another array with their tag information
   */
  async createTag(body: Array<CreateTagData>, userId?: string) {
    return this.post('tags', body, { userId })
  }

  /**
   * Method to delete a tag from an envelope
   * @param body - an array of envelope IDs, and within each position of that array, there is another array containing tag IDs
   * @param userId - ID of the user logged into the system
   * @returns - an array of envelopes Ids and another array with their tags IDs
   */
  async deleteTag(body: Array<DeleteTagData>, userId?: string) {
    return this.delete('tags', body, { userId })
  }
}
