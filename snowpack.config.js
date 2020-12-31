const rollupPluginPostcss = require('rollup-plugin-postcss');
const rollupPluginNodePolyfills = require('rollup-plugin-node-polyfills');

module.exports = {
    webDependencies: [
        're-resizable',
        'react-codemirror2',
        'codemirror/addon/edit/closebrackets.js',
        'codemirror/addon/edit/matchbrackets.js',
        'codemirror/mode/javascript/*',
        'codemirror/mode/css/*',
        'codemirror/mode/xml/*',
        'codemirror/mode/htmlmixed/*',
        'codemirror/mode/htmlembedded/*',
        'codemirror/mode/sass/*',
        'codemirror/mode/groovy/*',
        'codemirror/mode/yaml/*',
        'codemirror/mode/markdown/*',
        'codemirror/mode/handlebars/*',
    ],
    namedExports: {
        'exenv': ['canUseDOM', 'canUseEventListeners', 'canUseViewport', 'canUseWorkers'],
        'codemirror/mode/xml/xml.js': ['__moduleExports'],
        'codemirror/mode/css/css.js': ['__moduleExports'],
        'codemirror/mode/javascript/javascript.js': ['__moduleExports'],
        'codemirror/mode/htmlmixed/htmlmixed.js': ['__moduleExports'],
    },
    rollup: {
        plugins: [rollupPluginPostcss(), rollupPluginNodePolyfills()]
    }
};
