import path from 'path';

const MODES = {
    DEVELOPMENT: 'development',
    PRODUCTION: 'production',
};

export const ENV_VARIABLES = {
    // mode: MODES.DEVELOPMENT,
    mode: MODES.PRODUCTION,
    TEMPLATE_PATH: path.resolve('.', 'template'),
    EXTENSION_PATH: path.resolve('.', 'extension'),
    BUNDLE_PATH: path.resolve('.', 'bundle'),
    MODES,
};
