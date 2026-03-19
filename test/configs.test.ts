import { describe, expect, it } from "vitest";

import plugin from "../src/plugin.js";

describe("exported presets", () => {
    it("exports the expected preset names", () => {
        expect(Object.keys(plugin.configs).sort()).toEqual([
            "all",
            "recommended",
            "security",
            "strict",
        ]);
    });

    it("scopes presets to workflow YAML files", () => {
        expect(plugin.configs.recommended.files).toEqual([
            ".github/workflows/*.{yml,yaml}",
        ]);
    });

    it("wires rule membership by preset", () => {
        expect(Object.keys(plugin.configs.recommended.rules).sort()).toEqual([
            "github-actions/require-job-timeout-minutes",
            "github-actions/require-workflow-permissions",
        ]);
        expect(Object.keys(plugin.configs.security.rules).sort()).toEqual([
            "github-actions/pin-action-shas",
            "github-actions/require-workflow-permissions",
        ]);
        expect(Object.keys(plugin.configs.strict.rules).sort()).toEqual([
            "github-actions/pin-action-shas",
            "github-actions/require-job-timeout-minutes",
            "github-actions/require-workflow-concurrency",
            "github-actions/require-workflow-permissions",
        ]);
    });
});
