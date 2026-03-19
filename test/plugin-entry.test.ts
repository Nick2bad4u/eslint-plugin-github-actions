import { describe, expect, it } from "vitest";

import plugin from "../src/plugin.js";

describe("plugin entry", () => {
    it("exports GitHub Actions plugin metadata", () => {
        expect(plugin.meta).toMatchObject({
            name: "eslint-plugin-github-actions",
            namespace: "github-actions",
        });
    });

    it("exports the expected rule names", () => {
        expect(Object.keys(plugin.rules).sort()).toEqual([
            "pin-action-shas",
            "require-job-timeout-minutes",
            "require-workflow-concurrency",
            "require-workflow-permissions",
        ]);
    });
});
