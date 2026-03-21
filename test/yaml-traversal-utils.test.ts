import type { AST } from "yaml-eslint-parser";

import { describe, expect, it } from "vitest";
import { parseForESLint } from "yaml-eslint-parser";

import {
    collectYamlStringScalars,
    visitYamlStringScalars,
} from "../src/_internal/yaml-traversal.js";

const parseYamlRoot = (
    yamlText: string
): AST.YAMLContent | AST.YAMLWithMeta => {
    const parsed = parseForESLint(yamlText);
    const program = parsed.ast;
    const root = program.body[0]?.content;

    if (root === undefined || root === null) {
        throw new Error("Expected parsed YAML to contain a document root.");
    }

    return root;
};

describe("yaml traversal helpers", () => {
    it("collects nested string scalars from mappings and sequences", () => {
        const root = parseYamlRoot(
            [
                "name: Build",
                "on:",
                "  push:",
                "meta:",
                "  labels:",
                "    - fast",
                "    - secure",
                "  description: nightly pipeline",
            ].join("\n")
        );

        expect(collectYamlStringScalars(root)).toEqual([
            "Build",
            "fast",
            "secure",
            "nightly pipeline",
        ]);
    });

    it("collects scalar string representations while omitting null scalar values", () => {
        const root = parseYamlRoot(
            [
                "count: 3",
                "enabled: true",
                "optional:",
                "notes:",
                "  - ready",
                "  - 42",
                "title: release",
            ].join("\n")
        );

        expect(collectYamlStringScalars(root)).toEqual([
            "3",
            "true",
            "ready",
            "42",
            "release",
        ]);
    });

    it("handles nullish and unsupported node types without visiting anything", () => {
        const visitedValues: string[] = [];

        visitYamlStringScalars(undefined, (_node, value) => {
            visitedValues.push(value);
        });

        visitYamlStringScalars(null, (_node, value) => {
            visitedValues.push(value);
        });

        expect(visitedValues).toEqual([]);
        expect(collectYamlStringScalars(null)).toEqual([]);
    });

    it("ignores YAML aliases that are not directly traversable string nodes", () => {
        const root = parseYamlRoot(
            [
                "labels: &labels",
                "  - release",
                "copied: *labels",
                "name: pipeline",
            ].join("\n")
        );

        expect(collectYamlStringScalars(root)).toEqual(["release", "pipeline"]);
    });
});
