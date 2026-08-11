#!/usr/bin/env node

/**
 * Read the generated tarball filename from npm 11 or npm 12 `npm pack --json`
 * metadata.
 */

import { readFile } from "node:fs/promises";
import { pathToFileURL } from "node:url";

/**
 * Check whether a value is a non-null object record.
 *
 * @param {unknown} value
 *
 * @returns {value is Record<string, unknown>}
 */
const isRecord = (value) => typeof value === "object" && value !== null;

/**
 * Extract one generated tarball filename from npm pack metadata.
 *
 * Npm 11 returns an array of package records. npm 12 returns an object whose
 * values are package records.
 *
 * @param {unknown} packMetadata
 *
 * @returns {string}
 *
 * @throws {TypeError} When the metadata shape is invalid or ambiguous.
 */
export const getNpmPackFilename = (packMetadata) => {
    const packageRecords = Array.isArray(packMetadata)
        ? packMetadata
        : isRecord(packMetadata)
          ? Object.values(packMetadata)
          : [];

    if (packageRecords.length !== 1) {
        throw new TypeError(
            `Expected npm pack metadata for exactly one package, received ${packageRecords.length}.`
        );
    }

    const [packageRecord] = packageRecords;

    if (!isRecord(packageRecord)) {
        throw new TypeError("Expected npm pack metadata to contain an object.");
    }

    const { filename } = packageRecord;

    if (typeof filename !== "string" || filename.trim().length === 0) {
        throw new TypeError(
            "Expected npm pack metadata to contain a non-empty filename."
        );
    }

    return filename;
};

const main = async () => {
    const [metadataPath, ...unexpectedArguments] = process.argv.slice(2);

    if (metadataPath === undefined || unexpectedArguments.length > 0) {
        throw new TypeError(
            "Usage: node scripts/read-npm-pack-filename.mjs <npm-pack-json-path>"
        );
    }

    const metadataText = await readFile(metadataPath, "utf8");
    const packMetadata = JSON.parse(metadataText);
    process.stdout.write(getNpmPackFilename(packMetadata));
};

if (
    process.argv[1] !== undefined &&
    import.meta.url === pathToFileURL(process.argv[1]).href
) {
    try {
        await main();
    } catch (error) {
        console.error("Unable to read npm pack filename:", error);
        process.exitCode = 1;
    }
}
