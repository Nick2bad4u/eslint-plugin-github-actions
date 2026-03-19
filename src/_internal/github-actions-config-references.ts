/**
 * @packageDocumentation
 * Canonical preset names and docs references used by eslint-plugin-github-actions.
 */

/** Ordered preset names exposed through `plugin.configs`. */
export const githubActionsConfigNames = [
    "recommended",
    "security",
    "strict",
    "all",
] as const;

/** Supported flat-config preset names exported by the plugin. */
export type GithubActionsConfigName = (typeof githubActionsConfigNames)[number];

/** String references used in rule docs metadata and generated docs tables. */
export const githubActionsConfigReferenceToName: Readonly<
    Record<string, GithubActionsConfigName>
> = {
    "github-actions.configs.all": "all",
    "github-actions.configs.recommended": "recommended",
    "github-actions.configs.security": "security",
    "github-actions.configs.strict": "strict",
} as const satisfies Record<string, GithubActionsConfigName>;

/** Valid config reference strings accepted in rule metadata. */
export type GithubActionsConfigReference =
    keyof typeof githubActionsConfigReferenceToName;

/** Display metadata for each preset used in README and docs surfaces. */
export const githubActionsConfigMetadataByName: Readonly<
    Record<
        GithubActionsConfigName,
        {
            description: string;
            icon: string;
            presetName: string;
        }
    >
> = {
    all: {
        description:
            "Enables every available GitHub Actions workflow rule published by this plugin.",
        icon: "🟣",
        presetName: "github-actions:all",
    },
    recommended: {
        description:
            "Balanced defaults for most repositories authoring GitHub Actions workflows.",
        icon: "🟡",
        presetName: "github-actions:recommended",
    },
    security: {
        description:
            "Security-focused workflow hardening checks for action usage and token scope.",
        icon: "🛡️",
        presetName: "github-actions:security",
    },
    strict: {
        description:
            "Opinionated operational guardrails for mature workflow estates.",
        icon: "🔴",
        presetName: "github-actions:strict",
    },
} as const;
