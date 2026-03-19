import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

/** Sidebar structure for rule and preset documentation. */
const sidebars: SidebarsConfig = {
    rules: [
        "overview",
        "getting-started",
        {
            items: [
                "presets/index",
                "presets/recommended",
                "presets/security",
                "presets/strict",
                "presets/all",
            ],
            label: "Presets",
            type: "category",
        },
        {
            items: [
                "require-workflow-permissions",
                "require-job-timeout-minutes",
                "pin-action-shas",
                "require-workflow-concurrency",
            ],
            label: "Rules",
            type: "category",
        },
    ],
};

export default sidebars;
