/** @type {import("dependency-cruiser").IConfiguration} */
const dependencyCruiserConfig = {
    forbidden: [
        {
            comment: "Keep production modules free of circular dependencies.",
            from: {
                path: "^src/",
            },
            name: "no-circular",
            severity: "error",
            to: {
                circular: true,
                path: "^src/",
            },
        },
    ],
    options: {
        doNotFollow: {
            path: "node_modules",
        },
        tsConfig: {
            fileName: "tsconfig.json",
        },
    },
};

export default dependencyCruiserConfig;
