import path from 'path';
import template from './template';
import extension from './extension';
import starter from './starter';
const MODES = {
    DEVELOPMENT: 'development',
    PRODUCTION: 'production',
};

export const env_variables = {
    // mode: MODES.DEVELOPMENT,
    mode: MODES.PRODUCTION,
    TEMPLATE_PATH: path.resolve('.', 'template'),
    EXTENSION_PATH: path.resolve('.', 'extension'),
    BUNDLE_PATH: path.resolve('.', 'bundle'),
    MODES,
};

(async () => {
    // await starter(data).run();
    await extension(data);
    await template(Object.assign({}, data, { mode: MODES.PRODUCTION }));
})();
