import fs from 'fs';
import path from 'path';
export const inlineHtmlScripts = htmlPath => {
    const scriptTagRegex = /<script type="text\/javascript" src="([\w./]+)"><\/script>/;
    let html = fs.readFileSync(htmlPath, 'utf8');
    const htmlMatch = html.replace(new RegExp(scriptTagRegex, 'g'), (_, filePath, _2) => {
        return `<script>${fs.readFileSync(path.join(path.dirname(htmlPath), filePath), 'utf8')}</script>`;
    });
    return htmlMatch;
};

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
