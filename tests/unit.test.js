import { describe, expect, test } from "vitest";

import { normalize, parse } from "../src/options.js";

describe("parse", () => {
    test("returns {} for empty string", () => {
        expect(parse("")).toEqual({});
    });

    test("returns {} for undefined", () => {
        expect(parse(undefined)).toEqual({});
    });

    test("parses simple JSON", () => {
        expect(parse('{"theme": "vue"}')).toEqual({ theme: "vue" });
    });

    test("stringifies number and boolean values from JSON", () => {
        expect(parse('{"days": 30, "hide": true}')).toEqual({ days: "30", hide: "true" });
    });

    test("skips null values in JSON", () => {
        expect(parse('{"a": "keep", "b": null}')).toEqual({ a: "keep" });
    });

    test("joins array values from JSON", () => {
        expect(parse('{"langs": ["js", "ts"]}')).toEqual({ langs: "js,ts" });
    });

    test("throws on invalid JSON", () => {
        expect(() => parse("{not valid")).toThrow("Invalid JSON in options.");
    });

    test("parses query string", () => {
        expect(parse("theme=vue&custom_title=Hello")).toEqual({
            theme: "vue",
            custom_title: "Hello",
        });
    });

    test("strips leading '?' from query string", () => {
        expect(parse("?theme=vue")).toEqual({ theme: "vue" });
    });

    test("merges duplicate keys in query string", () => {
        expect(parse("hide=a&hide=b")).toEqual({ hide: "a,b" });
    });
});

describe("normalize", () => {
    test("returns {} for empty object", () => {
        expect(normalize({})).toEqual({});
    });

    test("keeps string values unchanged", () => {
        expect(normalize({ a: "1", b: "x" })).toEqual({ a: "1", b: "x" });
    });

    test("stringifies number and boolean values", () => {
        expect(normalize({ n: 42, b: false })).toEqual({ n: "42", b: "false" });
    });

    test("joins array values with comma", () => {
        expect(normalize({ xs: ["a", "b", "c"] })).toEqual({ xs: "a,b,c" });
    });

    test("skips null and undefined values", () => {
        expect(normalize({ a: null, b: undefined, c: "ok" })).toEqual({ c: "ok" });
    });
});
