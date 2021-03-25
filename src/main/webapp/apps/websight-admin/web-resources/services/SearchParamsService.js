export const getUrlParamValue = (paramName, config = {}) => {
    return getUrlParamValues([paramName], { [paramName]: config })[paramName];
}

export const getUrlParamValues = (paramNames = [], config = {}) => {
    if (paramNames.length === 0) {
        return {};
    }
    const urlParams = window.location.hash;
    const queryParams = urlParams.split('?')[1];

    const parsedSearchParams = new URLSearchParams(queryParams);

    let paramValues = {};
    paramNames.forEach(paramName => {
        let paramValue;
        const paramConfig = config[paramName] || {};
        if (paramConfig.isArray) {
            let valuesArray = parsedSearchParams.getAll(paramName);
            valuesArray = valuesArray.map(arrayValue => parseValue(arrayValue, paramConfig));
            paramValue = valuesArray.filter(arrayValue => arrayValue !== undefined);
        } else {
            paramValue = parsedSearchParams.get(paramName);
            paramValue = parseValue(paramValue, paramConfig);
        }

        paramValues = {
            ...paramValues,
            [paramName]: paramValue
        }
    })

    return paramValues;
}

const parseValue = (value, config = {}) => {
    if (config.separator) {
        const array = value.split(config.separator);
        return array.map(arrayValue => parseValueWithType(arrayValue, config.type));
    }
    return parseValueWithType(value, config.type);
}

const parseValueWithType = (stringValue, type) => {
    if (stringValue === null || stringValue === undefined) {
        return undefined;
    }
    if (type === 'number') {
        const value = parseInt(stringValue);
        return value ? value : undefined;
    }
    if (type === 'boolean') {
        return stringValue === 'true';
    }
    return decodeURIComponent(stringValue);
}

export const setUrlParamValues = (params = {}, config = {}) => {
    const urlParams = window.location.hash;
    const hash = urlParams.split('?')[0];
    const queryParams = urlParams.split('?')[1];

    const parsedSearchParams = new URLSearchParams(queryParams);

    Object.keys(params).forEach(key => {
        const value = params[key];
        const paramConfig = config[key] || {};
        if (value instanceof Array) {
            parsedSearchParams.delete(key);
            params[key].forEach(arrayValue => parsedSearchParams.append(key, encodeValue(arrayValue, paramConfig)));
        } else if (value !== undefined && value !== null && value !== '') {
            parsedSearchParams.set(key, encodeValue(value, paramConfig));
        } else {
            parsedSearchParams.delete(key);
        }
    })

    let searchParamsString = parsedSearchParams.toString();
    searchParamsString = searchParamsString ?
        `?${searchParamsString}` : '';

    const hashString = hash && hash.length > 1
        ? hash
        : searchParamsString ? '#' : '';

    window.history.replaceState(
        {},
        document.title,
        `${window.location.pathname}${hashString}${searchParamsString}`
    );
}

const encodeValue = (value, config = {}) => {
    if (value instanceof Array && config.separator) {
        const array = value.map(arrayValue => encodeURIComponent(arrayValue));
        return array.join(config.separator);
    }
    return encodeURIComponent(value);
}

export const getUrlHashValue = () => {
    const urlParams = window.location.hash;
    const hash = urlParams.split('?')[0];

    return decodeURIComponent(hash.substr(1));
}

export const setUrlHashValue = (hashValue) => {
    const urlParams = window.location.hash;
    const queryParams = urlParams.split('?')[1];

    const queryParamsString = queryParams ? `?${queryParams}` : '';

    const hashString = hashValue
        ? `#${hashValue}`
        : queryParamsString ? '#' : '';

    window.history.replaceState(
        {},
        document.title,
        `${window.location.pathname}${hashString}${queryParamsString}`
    );
}

export const deleteUrlHashValue = () => {
    setUrlHashValue('');
}