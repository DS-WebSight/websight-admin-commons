const REQUEST_DEBOUNCE_TIMEOUT_IN_MS = 300;

const debounce = (callback, timerId, wait) => {
    clearTimeout(timerId);
    return setTimeout(() => callback.apply(this), wait ? wait : REQUEST_DEBOUNCE_TIMEOUT_IN_MS);
}

export { debounce };