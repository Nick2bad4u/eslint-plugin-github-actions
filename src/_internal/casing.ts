/**
 * @packageDocumentation
 * Shared casing helpers for naming-oriented GitHub Actions rules.
 */

/** Supported naming conventions used by workflow naming rules. */
export const githubActionsCasingKinds = [
    "camelCase",
    "kebab-case",
    "PascalCase",
    "snake_case",
    "Title Case",
    "Train-Case",
    "SCREAMING_SNAKE_CASE",
] as const;

/** String literal union of supported naming conventions. */
export type GithubActionsCasingKind = (typeof githubActionsCasingKinds)[number];

/** Casing variants that exclude title-cased words with spaces. */
export const githubActionsNonTitleCasingKinds = [
    "camelCase",
    "kebab-case",
    "PascalCase",
    "snake_case",
    "Train-Case",
    "SCREAMING_SNAKE_CASE",
] as const;

/** String literal union of supported non-title casing conventions. */
export type GithubActionsNonTitleCasingKind =
    (typeof githubActionsNonTitleCasingKinds)[number];

/** Determine whether a character is an ASCII letter or digit. */
const isAlphaNumericCharacter = (character: string): boolean => {
    const codePoint = character.codePointAt(0) ?? -1;

    return (
        (codePoint >= 48 && codePoint <= 57) ||
        (codePoint >= 65 && codePoint <= 90) ||
        (codePoint >= 97 && codePoint <= 122)
    );
};

/** Determine whether a character is an ASCII uppercase letter. */
const isUppercaseCharacter = (character: string): boolean => {
    const codePoint = character.codePointAt(0) ?? -1;

    return codePoint >= 65 && codePoint <= 90;
};

/** Determine whether a character is an ASCII lowercase letter. */
const isLowercaseCharacter = (character: string): boolean => {
    const codePoint = character.codePointAt(0) ?? -1;

    return codePoint >= 97 && codePoint <= 122;
};

/** Normalize a free-form identifier or label into lowercase word tokens. */
const splitIntoWords = (value: string): readonly string[] => {
    const words: string[] = [];
    let currentWord = "";

    for (let index = 0; index < value.length; index += 1) {
        const character = value[index];

        if (character === undefined) {
            continue;
        }

        if (!isAlphaNumericCharacter(character)) {
            if (currentWord.length > 0) {
                words.push(currentWord.toLowerCase());
                currentWord = "";
            }

            continue;
        }

        const previousCharacter = index > 0 ? value[index - 1] : undefined;
        const nextCharacter =
            index + 1 < value.length ? value[index + 1] : undefined;
        const startsNewWord =
            currentWord.length > 0 &&
            previousCharacter !== undefined &&
            ((isLowercaseCharacter(previousCharacter) &&
                isUppercaseCharacter(character)) ||
                (isUppercaseCharacter(previousCharacter) &&
                    isUppercaseCharacter(character) &&
                    nextCharacter !== undefined &&
                    isLowercaseCharacter(nextCharacter)));

        if (startsNewWord) {
            words.push(currentWord.toLowerCase());
            currentWord = character;

            continue;
        }

        currentWord += character;
    }

    if (currentWord.length > 0) {
        words.push(currentWord.toLowerCase());
    }

    return words;
};

/** Uppercase the first character of a normalized word token. */
const capitalizeWord = (word: string): string =>
    word.length === 0
        ? word
        : `${word[0]?.toUpperCase() ?? ""}${word.slice(1)}`;

/** Convert a value into the exact requested casing convention. */
export const convertToGithubActionsCasing = (
    value: string,
    casingKind: GithubActionsCasingKind
): string => {
    const words = splitIntoWords(value);

    if (words.length === 0) {
        return value;
    }

    switch (casingKind) {
        case "camelCase": {
            const [firstWord = "", ...remainingWords] = words;

            return `${firstWord}${remainingWords.map((word) => capitalizeWord(word)).join("")}`;
        }

        case "kebab-case": {
            return words.join("-");
        }

        case "PascalCase": {
            return words.map((word) => capitalizeWord(word)).join("");
        }

        case "SCREAMING_SNAKE_CASE": {
            return words.map((word) => word.toUpperCase()).join("_");
        }

        case "snake_case": {
            return words.join("_");
        }

        case "Title Case": {
            return words.map((word) => capitalizeWord(word)).join(" ");
        }

        case "Train-Case": {
            return words.map((word) => capitalizeWord(word)).join("-");
        }

        default: {
            return value;
        }
    }
};

/** Determine whether a value already satisfies a requested casing convention. */
export const matchesGithubActionsCasing = (
    value: string,
    casingKind: GithubActionsCasingKind
): boolean => convertToGithubActionsCasing(value, casingKind) === value;
