import { Query } from '@duaneoli/typeorm-nest-joi-parse'
import { Request } from '../helpers/AxiosRequest'
import {
  AddDocumentInEnvelope,
  ManageDocumentInEnvelopeData,
  ManageEnvelopeDocumentType,
  RemoveDocumentInEnvelope,
} from '../types/envelopeDocumentTypes'
import {
  CreateData,
  CreateEnvelopeSignerData,
  DeleteData,
  DeleteEnvelopeSignerData,
  EnvelopeSignerEntity,
  ResendNotificationEnvelopeSigner,
} from '../types/envelopeSignerTypes'
import {
  CancelEnvelopeData,
  CloseEnvelopeData,
  CreateEnvelopeType,
  EnvelopeEntity,
  ResponseCancelEnvelope,
  ResponseCloseEnvelope,
  ResponseListEnvelopeDTO,
} from '../types/envelopeTypes'
import { CreateTag, CreateTagData, DeleteTagData, ResponseTag } from '../types/tagTypes'
import {
  CreateDocumentType,
  DocumentsEntity,
  ResponseCreateDocument,
  ResponseListDocumentDTO,
} from './../types/documentTypes'

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
  async listEnvelopes(
    params?: {
      query?: Query<EnvelopeEntity>
      includes?: Array<string>
      page?: number
      pageSize?: number
    },
    options?: {
      userId?: string
    },
  ): Promise<ResponseListEnvelopeDTO> {
    return this.get(
      'envelopes',
      {
        filters: params?.query?.filters.stringify(),
        sortBy: params?.query?.sortBy.stringify(),
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
      includes?: Array<string>
      page?: number
      pageSize?: number
    },
    options?: {
      userId?: string
    },
  ): Promise<EnvelopeSignerEntity> {
    return this.get(
      'envelopes',
      {
        filters: params?.query?.filters.stringify(),
        sortBy: params?.query?.sortBy.stringify(),
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
      includes?: Array<string>
      page?: number
      pageSize?: number
    },
    options?: {
      userId?: string
    },
  ) {
    return this.get(
      'envelopes',
      {
        filters: params?.query.filters.stringify(),
        sortBy: params?.query.sortBy.stringify(),
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
      query: Query<{ id: string }>
    },
    options?: {
      userId?: string
    },
  ) {
    return this.get(
      'envelopes',
      {
        filters: params?.query.filters.stringify(),
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
  async createEnvelopes(body: Array<CreateEnvelopeType>, userId?: string) {
    return this.post('envelopes', body, { userId })
  }

  /**
   * Method to create an array of envelopes
   * @param body - contains the necessary information to create an array of envelopes
   * @param userId - ID of the user logged into the system
   * @returns - an array of created envelopes
   */
  async createEnvelope(body: CreateEnvelopeType, options: { userId?: string } = {}): Promise<ResponseCreateDocument> {
    const { userId } = options
    const response = await this.post('envelopes', { data: [body] }, { userId })
    return response.envelopes[0]
  }

  /**
   * Method to close an array of envelopes. Once closed, the envelopes no longer have draft status and are able to be signed
   * @param body - contains an array of envelope Ids to close
   * @param userId - ID of the user logged into the system
   * @returns - an array of closed envelopes
   */
  async closeEnvelopes(body: Array<CloseEnvelopeData>, userId?: string) {
    return this.put('envelopes/close', body, { userId })
  }

  async closeEnvelope(
    envelopeId: string,
    options: { userId?: string; soft?: boolean } = {},
  ): Promise<ResponseCloseEnvelope> {
    const { userId, soft } = options

    const response = await this.put('envelopes/close', { data: [{ id: envelopeId }] }, { userId })
    return response.envelopes[0]
  }

  /**
   * Method to cancel an array of envelopes. Once canceled, the envelopes no longer have draft status and are not able to be signed
   * @param body - contains an array of envelope Ids to cancel
   * @param userId - ID of the user logged into the system
   * @returns - an array of canceled envelopes
   */
  async cancelEnvelopes(body: Array<CancelEnvelopeData>, userId?: string) {
    return this.put('envelopes/cancel', body, { userId })
  }

  async cancelEnvelope(envelopeId: string, userId?: string): Promise<ResponseCancelEnvelope> {
    const response = await this.put('envelopes/cancel', { data: [{ id: envelopeId }] }, { userId })
    return response.envelopes[0]
  }

  /**
   * Method to add or to remove documents in envelope
   * @param body - an array of envelope Ids, and within each position of that array, there is another array containing signers Ids
   * @param userId - ID of the user logged into the system
   * @returns - an array of envelope IDs with with an array of their corresponding document IDs
   */
  async manageDocumentsInEnvelopes(method: 'set' | 'remove', body: ManageEnvelopeDocumentType, userId?: string) {
    return this.post(`envelopes/${method}/documents`, body, { userId })
  }

  async addDocumentsInEnvelopes(body: ManageEnvelopeDocumentType, userId?: string) {
    return this.post(`envelopes/set/documents`, body, { userId })
  }

  async removeDocumentsInEnvelopes(body: ManageEnvelopeDocumentType, userId?: string) {
    return this.post(`envelopes/remove/documents`, body, { userId })
  }

  async addDocumentsInEnvelope(
    envelopeId: string,
    documents: Array<ManageDocumentInEnvelopeData>,
    options: { userId?: string; soft?: boolean } = {},
  ): Promise<AddDocumentInEnvelope> {
    const { userId, soft } = options
    const response = await this.post(`envelopes/set/documents`, { data: [{ envelopeId, documents }], soft }, { userId })
    return response
  }

  async removeDocumentsInEnvelope(
    envelopeId: string,
    documents: Array<ManageDocumentInEnvelopeData>,
    options: { userId?: string; soft?: boolean } = {},
  ): Promise<RemoveDocumentInEnvelope> {
    const { userId, soft } = options
    return this.post(`envelopes/remove/documents`, { data: [{ envelopeId, documents }], soft }, { userId })
  }

  /**
   * Method to retrieve documents
   * @param params - used to query a specific field
   * @param options - extra information, such as a ID of the user logged into the system in this case
   * @returns - an array of documents
   */
  async listDocuments(
    params?: {
      query?: Query<DocumentsEntity>
      includes?: Array<string>
      page?: number
      pageSize?: number
    },
    options?: {
      userId?: string
    },
  ): Promise<ResponseListDocumentDTO> {
    return this.get(
      'documents',
      {
        filters: params?.query?.filters.stringify(),
        sortBy: params?.query?.sortBy.stringify(),
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
    return this.post('envelopes/documents-url', body, { userId })
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
   * Method to create documents
   * @param body - contains the necessary information to create an array of documents
   * @param userId - ID of the user logged into the system
   * @returns - an array of created documents
   */
  async createDocuments(data: Array<CreateDocumentType>, options: { soft?: boolean; userId?: string } = {}) {
    const { userId, soft } = options
    return this.post('documents', { data, soft }, { userId })
  }

  /**
   * Method to create a document
   * @param body - contains the necessary information to create an array of documents
   * @param userId - ID of the user logged into the system
   * @returns - an array of created documents
   */
  async createDocument(
    document: CreateDocumentType,
    options: { soft?: boolean; userId?: string } = {},
  ): Promise<ResponseCreateDocument> {
    const { userId, soft } = options
    const response = await this.post('documents', { data: [document], soft }, { userId })
    return response.documents[0]
  }

  /**
   * Method to add signers to envelope
   * @param body - an array of envelope IDs, and within each position of that array, there is another array containing information to add signers
   * @param userId - ID of the user logged into the system
   * @returns - an array of envelopes Ids and another array with their signers ids
   */
  async createSignersInEnvelopes(body: Array<CreateEnvelopeSignerData>, userId?: string) {
    return this.post('envelope-signers', body, { userId })
  }

  /**
   * Method to add signer to envelope
   * @param envelopeId - The ID of envelope
   * @param signer - Infos about the signer who gonna be insert in envelope
   * @param userId - ID of the user logged into the system
   * @returns - an array of envelopes Ids and another array with their signers ids
   */
  async createEnvelopeSigner(
    envelopeId: string,
    signer: CreateData,
    options: { soft?: boolean; userId?: string } = {},
  ): Promise<EnvelopeSignerEntity> {
    const { userId, soft } = options

    const response = await this.post('envelope-signers', { data: [{ ...signer }], envelopeId }, { userId })
    return response.envelopeSigners[0]
  }

  /**
   * Method to delete signers from an envelope
   * @param body - an array of envelope IDs, and within each position of that array, there is another array containing signer IDs
   * @param userId - ID of the user logged into the system
   * @returns - an array of envelopes Ids and another array with their signers ids
   */
  async deleteEnvelopeSigners(body: Array<DeleteEnvelopeSignerData>, userId?: string) {
    return this.delete('envelope-signers', body, { userId })
  }

  async deleteEnvelopeSigner(
    envelopeId: string,
    signer: DeleteData,
    options: { soft?: boolean; userId?: string } = {},
  ): Promise<EnvelopeSignerEntity> {
    const { userId, soft } = options

    const response = await this.delete('envelope-signers', { data: [{ ...signer }], envelopeId }, { userId })
    return response.envelopeSigners[0]
  }

  /**
   * Method to resend the signature link to the signer
   * @param body - an array of envelope IDs, and within each position of that array, there is another array containing signer IDs
   * @param userId - ID of the user logged into the system
   * @returns - empty
   */
  async resendNotification(body: ResendNotificationEnvelopeSigner, userId?: string) {
    return this.post('envelope-signers/resend-notification', body, { userId })
  }

  /**
   * Method to create a tag in the envelope
   * @param body - an array of envelope IDs, and within each position of that array, there is another array containing information of each tag
   * @param userId - ID of the user logged into the system
   * @returns - an array of envelopes Ids and another array with their tag information
   */
  async createTags(body: Array<CreateTagData>, userId?: string) {
    return this.post('tags', body, { userId })
  }

  async createTag(
    envelopeId: string,
    tag: CreateTag,
    options: { soft?: boolean; userId?: string } = {},
  ): Promise<ResponseTag> {
    const { userId, soft } = options

    const response = await this.post('tags', { data: [{ ...tag }], envelopeId }, { userId })
    return response.tags[0]
  }

  /**
   * Method to delete a tag from an envelope
   * @param body - an array of envelope IDs, and within each position of that array, there is another array containing tag IDs
   * @param userId - ID of the user logged into the system
   * @returns - an array of envelopes Ids and another array with their tags IDs
   */
  async deleteTags(body: Array<DeleteTagData>, userId?: string) {
    return this.delete('tags', body, { userId })
  }

  async deleteTag(
    envelopeId: string,
    tagId: string,
    options: { soft?: boolean; userId?: string } = {},
  ): Promise<ResponseTag> {
    const { userId, soft } = options

    const response = await this.delete('tags', { data: [{ id: tagId }], envelopeId }, { userId })
    return response.tags[0]
  }
}
