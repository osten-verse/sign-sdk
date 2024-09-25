import { Query } from '@duaneoli/typeorm-nest-joi-parse';
import { Request } from '../helpers/AxiosRequest';
import { CreateAndRemoveEnvelopeDocumentType } from '../types/envelopeDocumentTypes';
import { CreateEnvelopeSignerData, DeleteEnvelopeSignerData, ResendNotificationEnvelopeSigner } from '../types/envelopeSignerTypes';
import { CancelEnvelopeData, CloseEnvelopeData, CreateEnvelopeData, EnvelopeEntity } from '../types/envelopeTypes';
import { CreateTagData, DeleteTagData } from '../types/tagTypes';
import { CreateDocumentData, DocumentsEntity } from './../types/documentTypes';
export declare class Routers extends Request {
    constructor(publicKey: string, defaultUserId: string, secretKey: string, apiPath?: string);
    listEnvelope(params: {
        query?: Query<EnvelopeEntity>;
        includes: Array<string>;
        page?: number;
        pageSize?: number;
    }, options?: {
        userId?: string;
    }): Promise<any>;
    getEnvelopeById(params: {
        query?: Query<{
            id: string;
        }>;
    }, options?: {
        userId?: string;
    }): Promise<any>;
    createEnvelope(body: Array<CreateEnvelopeData>, userId?: string): Promise<any>;
    closeEnvelope(body: Array<CloseEnvelopeData>, userId?: string): Promise<any>;
    cancelEnvelope(body: Array<CancelEnvelopeData>, userId?: string): Promise<any>;
    createAndRemoveDocument(method: 'set' | 'remove', body: CreateAndRemoveEnvelopeDocumentType, userId?: string): Promise<any>;
    listDocument(params: {
        query?: Query<DocumentsEntity>;
        includes: Array<string>;
        page?: number;
        pageSize?: number;
    }, options?: {
        userId?: string;
    }): Promise<any>;
    createDocument(body: Array<CreateDocumentData>, userId?: string): Promise<any>;
    createEnvelopeSigner(body: Array<CreateEnvelopeSignerData>, userId?: string): Promise<any>;
    deleteEnvelopeSigner(body: Array<DeleteEnvelopeSignerData>, userId?: string): Promise<any>;
    resendNotification(body: ResendNotificationEnvelopeSigner, userId?: string): Promise<any>;
    createTag(body: Array<CreateTagData>, userId?: string): Promise<any>;
    deleteTag(body: Array<DeleteTagData>, userId?: string): Promise<any>;
}
//# sourceMappingURL=RoutersService.d.ts.map