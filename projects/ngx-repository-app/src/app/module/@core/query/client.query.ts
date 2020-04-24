import {
  FirebaseCriteria,
  FirebaseEndAt,
  FirebaseEndBefore,
  FirebaseLimit,
  FirebaseLimitToLast,
  FirebaseOrderBy,
  FirebaseOrderByParam,
  FirebaseStartAfter,
  FirebaseStartAt
} from '@witty-services/ngx-firebase-repository';

export class ClientQuery {

  @FirebaseCriteria({field: 'lastName', operator: '=='})
  public lastNameEqual?: string;

  @FirebaseOrderBy()
  public orderBy?: string|FirebaseOrderByParam|(FirebaseOrderByParam|string)[];

  @FirebaseStartAt()
  public startAt?: any;

  @FirebaseStartAfter()
  public startAfter?: any;

  @FirebaseEndAt()
  public endAt?: any;

  @FirebaseEndBefore()
  public endBefore?: any;

  @FirebaseLimit()
  public limit?: number;

  @FirebaseLimitToLast()
  public limitToLast?: number;

  public constructor(data: Partial<ClientQuery> = {}) {
    Object.assign(this, data);
  }
}
