import { Injectable } from '@angular/core';
import { RepositoryResponse } from '../repository.response';
import { RequestManagerContext } from '../../manager/request-manager.context';
import { PATH_COLUMN_METADATA_KEY } from '../../decorator/path-column.decorator';
import { first, get, isArray } from 'lodash';
import { Path } from '../../request/path';
import { ResponseProcessor } from './response.processor';
import {PathColumnContextConfiguration} from '../../configuration/context/path-column-context.configuration';

@Injectable()
export class PathColumnResponseProcessor implements ResponseProcessor {

  public transform(response: any, origin: RepositoryResponse, { configuration }: RequestManagerContext): any {
    if (response != null) {
      const pathColumns: PathColumnContextConfiguration[] = Reflect.getMetadata(PATH_COLUMN_METADATA_KEY, first(response) || response);
      const path: Path = get(origin.getRequest(), 'path'); // TODO @RMA find best solution to retrieve path

      if (pathColumns && isArray(response)) {
        response.forEach((item: any) => this.mapPathColumn(pathColumns, item, path));
      } else if (pathColumns) {
        this.mapPathColumn(pathColumns, response, path);
      }

      return response;
    }
  }

  protected mapPathColumn(pathColumns: PathColumnContextConfiguration[], item: any, path: Path): void {
    pathColumns.forEach((pc: PathColumnContextConfiguration) => {
      item[pc.propertyKey] = path.pathParams[`:${ pc.name }`];
    });
  }
}
