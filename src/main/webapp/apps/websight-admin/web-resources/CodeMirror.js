import { Controlled as CodeMirror } from 'websight-admin/esm/react-codemirror2';

import 'codemirror/addon/edit/matchbrackets.js';
import 'codemirror/addon/edit/closebrackets.js';
import codemirrorStyles from 'styles/codemirror.css';

import { GlobalStyle } from './GlobalStyle.js';

export const importAndSetCodeMirrorMode = (mimeType, editorInstance, fileName) => {
    mimeType = mapFileExtensionToMimeType(fileName) || mimeType;

    importCodeMirrorMode(mimeType)
        .then(() => editorInstance.setOption('mode', mimeType));
}

export const mapFileExtensionToMimeType = (fileName) => {
    const fileExtension =
        fileName ? fileName.split('.').pop() : '';

    switch(fileExtension) {
    case 'coffee':
    case 'css':
        return 'text/css';
    case 'less':
        return 'text/x-less';
    case 'scss':
        return 'text/x-scss';
    case 'sass':
        return 'text/x-sass';
    case 'js':
    case 'jsx':
    case 'vue':
        return 'text/javascript';
    case 'ts':
        return 'text/typescript';
    case 'json':
        return 'application/json';
    case 'xml':
        return 'text/xml';
    case 'md':
    case 'markdown':
    case 'mdown':
        return 'text/markdown';
    case 'hbs':
        return 'text/x-handlebars-template';
    case 'html':
        return 'text/html';
    case 'jsp':
        return 'application/x-jsp';
    case 'yaml':
        return 'text/yaml';
    case 'groovy':
        return 'text/x-groovy'
    default:
        return '';
    }
};

export const importCodeMirrorMode = (mimeType) => {
    switch(mimeType) {
    case 'javascript':
    case 'text/javascript':
    case 'text/ecmascript':
    case 'application/javascript':
    case 'application/x-javascript':
    case 'application/ecmascript':
    case 'application/json':
    case 'application/x-json':
    case 'application/ld+json':
    case 'text/typescript':
    case 'application/typescript':
        return import('codemirror/mode/javascript/javascript.js');
    case 'text/css':
    case 'text/x-scss':
    case 'text/x-less':
    case 'text/x-gss':
        return import('codemirror/mode/css/css.js');
    case 'text/xml':
    case 'application/xml':
        return import('codemirror/mode/xml/xml.js');
    case 'text/html':
        return import('codemirror/mode/htmlmixed/htmlmixed.js');
    case 'htmlembedded':
    case 'application/x-ejs':
    case 'application/x-aspx':
    case 'application/x-jsp':
    case 'application/x-erb':
        return import('codemirror/mode/htmlembedded/htmlembedded.js');
    case 'text/x-sass':
        return import('codemirror/mode/sass/sass.js');
    case 'text/x-groovy':
        return import('codemirror/mode/groovy/groovy.js');
    case 'text/x-yaml':
    case 'text/yaml':
        return import('codemirror/mode/yaml/yaml.js');
    case 'text/markdown':
    case 'text/x-markdown':
        return import('codemirror/mode/markdown/markdown.js');
    case 'handlebars':
    case 'text/x-handlebars-template':
        return import('codemirror/mode/handlebars/handlebars.js');
    default:
        return new Promise((resolve) => resolve());
    }
}

GlobalStyle({ styles: codemirrorStyles });

export default CodeMirror;