import { themes as prismThemes } from "prism-react-renderer";

import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

/** GitHub Pages base URL for the docs site. */
const baseUrl =
    process.env["DOCUSAURUS_BASE_URL"] ?? "/eslint-plugin-github-actions/";

/** Repository owner used for edit links. */
const organizationName = "Nick2bad4u";
/** Repository name used for edit links and project metadata. */
const projectName = "eslint-plugin-github-actions";

/** Full Docusaurus site configuration. */
const config: Config = {
    baseUrl,
    deploymentBranch: "gh-pages",
    favicon: "img/logo.svg",
    i18n: {
        defaultLocale: "en",
        locales: ["en"],
    },
    markdown: {
        mermaid: true,
    },
    onBrokenAnchors: "warn",
    onBrokenLinks: "warn",
    onBrokenMarkdownLinks: "warn",
    organizationName,
    plugins: [
        [
            "@docusaurus/plugin-content-docs",
            {
                editUrl: `https://github.com/${organizationName}/${projectName}/blob/main/docs/`,
                id: "rules",
                path: "../rules",
                routeBasePath: "docs/rules",
                sidebarPath: "./sidebars.rules.ts",
            },
        ],
    ],
    presets: [
        [
            "classic",
            {
                blog: false,
                docs: {
                    editUrl: `https://github.com/${organizationName}/${projectName}/blob/main/docs/docusaurus/`,
                    path: "site-docs",
                    routeBasePath: "docs",
                    sidebarPath: "./sidebars.ts",
                },
                theme: {
                    customCss: "./src/css/custom.css",
                },
            } satisfies Preset.Options,
        ],
    ],
    projectName,
    tagline: "Workflow lint rules for GitHub Actions YAML.",
    themeConfig: {
        colorMode: {
            respectPrefersColorScheme: true,
        },
        footer: {
            copyright: `© ${new Date().getFullYear()} Nick2bad4u`,
            links: [
                {
                    items: [
                        {
                            label: "Rule docs",
                            to: "/docs/rules/overview",
                        },
                        {
                            label: "Getting started",
                            to: "/docs/rules/getting-started",
                        },
                    ],
                    title: "Docs",
                },
                {
                    items: [
                        {
                            href: `https://github.com/${organizationName}/${projectName}`,
                            label: "GitHub",
                        },
                        {
                            href: `https://github.com/${organizationName}/${projectName}/issues`,
                            label: "Issues",
                        },
                    ],
                    title: "Community",
                },
            ],
            style: "dark",
        },
        navbar: {
            items: [
                {
                    label: "Overview",
                    to: "/docs/rules/overview",
                },
                {
                    label: "Rules",
                    to: "/docs/rules/require-workflow-permissions",
                },
                {
                    href: `https://github.com/${organizationName}/${projectName}`,
                    label: "GitHub",
                    position: "right",
                },
            ],
            title: "eslint-plugin-github-actions",
        },
        prism: {
            darkTheme: prismThemes.dracula,
            theme: prismThemes.github,
        },
    },
    themes: ["@docusaurus/theme-mermaid"],
    title: "eslint-plugin-github-actions",
    url: "https://nick2bad4u.github.io",
};

export default config;
