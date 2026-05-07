/**
* Normalize option values to strings.
* @param {Record<string, unknown>} options Input options.
* @returns {Record<string, string>} Normalized options.
*/
export function normalize(options) {
    return Object.fromEntries(
        Object.entries(options)
            .filter(([, val]) => val !== null && val !== undefined)
            .map(([key, val]) => [key, Array.isArray(val) ? val.join(",") : String(val)])
    );
}

/**
* Parse options from query string or JSON and normalize values to strings.
* @param {string} value Input value.
* @returns {Record<string, string>} Parsed options.
*/
export function parse(value) {
    if (!value) return {};

    const trimmed = value.trim();
    const options = {};

    if (trimmed.startsWith("{")) {
        try {
            Object.assign(options, JSON.parse(trimmed));
        } catch {
            throw new Error("Invalid JSON in options.");
        }
    } else {
        const queryString = trimmed.startsWith("?") ? trimmed.slice(1) : trimmed;
        const params = new URLSearchParams(queryString);

        for (const [key, val] of params.entries()) {
            if (options[key]) options[key] = `${options[key]},${val}`;
            else options[key] = val;
        }
    }

    return normalize(options);
}
