import { readFileSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

const docsRoot = join(process.cwd(), "docs", "rules");

describe("docs integrity", () => {
    it("contains markdown pages for every published rule", () => {
        const requiredRuleDocNames = [
            "require-workflow-permissions.md",
            "require-job-timeout-minutes.md",
            "pin-action-shas.md",
            "require-workflow-concurrency.md",
        ];

        for (const fileName of requiredRuleDocNames) {
            const contents = readFileSync(join(docsRoot, fileName), "utf8");
            expect(contents).toContain("## Further reading");
            expect(contents).toContain("> **Rule catalog ID:** R0");
        }
    });
});
