export type ReleaseType =
    | "major"
    | "minor"
    | "patch";

export interface ReleaseRecoveryState {
    readonly changedFiles: readonly string[];
    readonly commitSubject: string;
    readonly explicitVersion?: string;
    readonly headTags: readonly string[];
    readonly parentVersion: string;
    readonly releaseType: ReleaseType;
    readonly releaseVersion: string;
}

export declare const getExpectedReleaseVersion: (
    parentVersion: string,
    releaseType: ReleaseType,
    explicitVersion: string | undefined
) => string;

export declare const validateReleaseRecovery: (
    state: Readonly<ReleaseRecoveryState>
) => void;
