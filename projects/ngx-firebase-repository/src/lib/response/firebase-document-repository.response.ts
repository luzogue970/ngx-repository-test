import { firestore } from 'firebase';
import { FirebaseRepositoryResponse } from './firebase-repository.response';
import { RepositoryRequest } from '@witty-services/ngx-repository';
import DocumentSnapshot = firestore.DocumentSnapshot;

export class FirebaseDocumentRepositoryResponse implements FirebaseRepositoryResponse {

  public constructor(private readonly response: DocumentSnapshot,
                     private readonly request: RepositoryRequest) {
  }

  public getBody(): any {
    return {
      id: this.response.id,
      ...this.response.data()
    };
  }

  public getRequest(): RepositoryRequest {
    return this.request;
  }
}

