import { get } from 'lodash';

export class ConfigurationProvider {

  public constructor(private readonly params: any) {
  }

  public getConfiguration(property: string, paths: string[]): any {
    const configuration: any = this.findConfiguration(property, paths);

    if (configuration != null) {
      return configuration;
    }

    console.error(`Unable to found configuration '${ property }' (${ JSON.stringify(paths) })`, this.params);

    throw new Error(`Unable to found configuration '${ property }' (${ JSON.stringify(paths) })`);
  }

  public findConfiguration(property: string, paths: string[]): any {
    for (const path of paths) {
      const value: any = get(this.params, `${ path }.${ property }`);
      if (value != null) {
        return value;
      }
    }

    if (get(this.params, property) != null) {
      return get(this.params, property);
    }

    return null;
  }
}
