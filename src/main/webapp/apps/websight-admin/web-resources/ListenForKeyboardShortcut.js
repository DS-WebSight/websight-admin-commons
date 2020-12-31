import { useCallback, useEffect, useReducer } from 'react';


const keysReducer = (state, action) => {
    switch (action.type) {
    case 'set-key-down':
        return { ...state, [action.code]: true };
    case 'set-key-up':
        return { ...state, [action.code]: false };
    default:
        return state;
    }
};

/**
 * It allows to listen and call an action when defined keyboard keys are pressed
 *
 * @param Function callback     (Required) A function that will be called when given keys will be pressed
 * @param Array    keyCodes     (Required) An array of arrays of codes that need to be pressed together
 *                              to call a callback function, eg: [['AltLeft', 'KeyR'], ['AltRight', 'KeyR']]
 */
const ListenForKeyboardShortcut = (props) => {
    const { keyCodes, callback } = props;

    if (!Array.isArray(keyCodes) || !keyCodes.length || !callback) {
        console.warn('Check if all props of ListenForKeyboardShortcut are set properly', props);
    }

    const initalKeyMapping = keyCodes.reduce((currentKeys, code) => {
        currentKeys[code] = false;
        return currentKeys;
    }, {});

    const [keys, setKeys] = useReducer(keysReducer, initalKeyMapping);

    const preventShortcutDefault = (event, outOfDateKeys, code) => {
        const upToDateKeys = { ...outOfDateKeys, [code]: true };
        if (!Object.values(upToDateKeys).filter(value => !value).length) {
            event.preventDefault();
        }
    }

    const keyDownListener = useCallback(
        keyDownEvent => {
            const { code, repeat, defaultPrevented } = keyDownEvent;

            if (repeat) return;
            if (defaultPrevented) return;
            if (keys[code] === undefined) return;

            if (keys[code] === false) {
                setKeys({ type: 'set-key-down', code });
                preventShortcutDefault(keyDownEvent, keys, code);
            }
        },
        [keys]
    );

    const keyUpListener = useCallback(
        keyUpEvent => {
            const { code } = keyUpEvent;

            if (keys[code] === undefined) return;

            if (keys[code] === true) {
                setKeys({ type: 'set-key-up', code });
            }
        },
        [keys]
    );

    useEffect(() => {
        if (!Object.values(keys).filter(value => !value).length) {
            callback(keys)
        }
    }, [callback, keys]);

    useEffect(() => {
        window.addEventListener('keydown', keyDownListener, false);
        return () => window.removeEventListener('keydown', keyDownListener, false);
    }, [keyDownListener]);

    useEffect(() => {
        window.addEventListener('keyup', keyUpListener, false);
        return () => window.removeEventListener('keyup', keyUpListener, false);
    }, [keyUpListener]);

    return null;
};

export default ListenForKeyboardShortcut;