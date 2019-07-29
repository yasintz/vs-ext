export function commandGenerator(extensionName: string, command: string) {
    return `localextension.${extensionName}.${command}`;
}
