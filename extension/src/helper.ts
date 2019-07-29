export type IActivationEvents = string[];

export interface ICommand {
    command: string;
    title?: string;
}

export interface IPackageJson {
    name: string;
    description: string;
    displayName: string;
    version: string;
    publisher: string;
    engines: Record<string, string>;
    categories: string[];
    main: string;
    scripts: Record<string, string>;
    contributes: IContributes;
    activationEvents: IActivationEvents;
    devDependencies: Record<string, string>;
}

export interface IContributes {
    commands: ICommand[];
}
