// This script simplifies complex data.
// CustomEvent doesn't support objects which more complex that JSON objects.
import { adaptDataToStringPreview } from '../../core/helpers/adapt-data-to-string-preview.helper';
import { isObject } from '../../core/helpers/methods.helpers';

export function processUnknownData(data: unknown): unknown {
    if (Array.isArray(data)) {
        return proccessArray(data);
    } else if (isObject(data)) {
        return processObject(data);
    } else if (typeof data === 'function') {
        return adaptDataToStringPreview(data);
    }

    return data;
}

function proccessArray(array: unknown[]): unknown {
    return array.map((item) => processUnknownData(item));
}

function processObject(data: object): unknown {
    if (data.constructor.name === 'Object') {
        return simplifyObject(data);
    } else {
        return adaptDataToStringPreview(data);
    }
}

function simplifyObject(data: object): object {
    return Object.entries(data).reduce((output, [key, value]) => {
        output[key] = processUnknownData(value);

        return output;
    }, {} as any);
}
