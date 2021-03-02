import { Type } from '@angular/core';
import { merge } from 'lodash';
import { ResourceConfiguration } from '../configuration/resource.configuration';
import {RepositoryContextConfiguration} from '../configuration/context/repository-context.configuration';

/**
 * @ignore
 */
export const REPOSITORY_METADATA_KEY: string = 'repository';

/**
 * @ignore
 */
export const RESOURCE_CONFIGURATION_METADATA_KEY: string = 'resourceConfiguration';

// @dynamic
export function Repository<T>(resourceType: () => Type<T>, configuration: ResourceConfiguration = null): any {
  return (target: any): void => {
    const defaultRepositoryConfiguration: RepositoryContextConfiguration<T> = Reflect.getMetadata(REPOSITORY_METADATA_KEY, Object.getPrototypeOf(target));
    const defaultConfiguration: ResourceConfiguration = defaultRepositoryConfiguration ? defaultRepositoryConfiguration.defaultConfiguration : null;
    const params: RepositoryContextConfiguration<T> = {
      resourceType,
      defaultConfiguration: merge({}, defaultConfiguration, configuration )
    };

    Reflect.defineMetadata(REPOSITORY_METADATA_KEY, params, target);
  };
}
