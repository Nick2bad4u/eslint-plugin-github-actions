/**
 * @packageDocumentation
 * Workflow display-name title casing helpers.
 */
import {
    arrayFirst,
    arrayJoin,
    isDefined,
    isEmpty,
    objectEntries,
    setHas,
} from "ts-extras";

import { casePoliceDictionary } from "./case-police-dictionary.js";

/** Common short words that stay lowercase inside title-style names. */
const titleCaseSmallWords: ReadonlySet<string> = new Set([
    "a",
    "an",
    "and",
    "as",
    "at",
    "but",
    "by",
    "for",
    "from",
    "in",
    "into",
    "nor",
    "of",
    "on",
    "onto",
    "or",
    "per",
    "the",
    "to",
    "via",
    "vs",
    "with",
]);

/** Workflow-domain acronym overrides missing from the generic dictionary. */
const workflowTitleCaseDictionary: Readonly<Record<string, string>> = {
    ...casePoliceDictionary,
    ai: "AI",
    cd: "CD",
    ci: "CI",
};

type AppendTitleCaseToken = (token: TitleCaseToken) => void;

interface CaseDictionaryMatch {
    readonly canonical: string;
    readonly tokenCount: number;
}

type TitleCaseToken =
    | {
          readonly kind: "symbol";
          readonly value: string;
      }
    | {
          readonly kind: "word";
          readonly value: string;
      };

const isAlphaNumericCharacter = (character: string): boolean => {
    const codePoint = character.codePointAt(0) ?? -1;

    return (
        (codePoint >= 48 && codePoint <= 57) ||
        (codePoint >= 65 && codePoint <= 90) ||
        (codePoint >= 97 && codePoint <= 122)
    );
};

const isUppercaseCharacter = (character: string): boolean => {
    const codePoint = character.codePointAt(0) ?? -1;

    return codePoint >= 65 && codePoint <= 90;
};

const isLowercaseCharacter = (character: string): boolean => {
    const codePoint = character.codePointAt(0) ?? -1;

    return codePoint >= 97 && codePoint <= 122;
};

const startsNewTitleCaseWord = (
    value: string,
    index: number,
    currentWord: string,
    character: string
): boolean => {
    if (index === 0 || currentWord.length === 0) {
        return false;
    }

    const previousCharacter = value[index - 1];

    if (!isDefined(previousCharacter)) {
        return false;
    }

    if (
        isLowercaseCharacter(previousCharacter) &&
        isUppercaseCharacter(character)
    ) {
        return true;
    }

    const nextCharacter = value[index + 1];

    return (
        isUppercaseCharacter(previousCharacter) &&
        isUppercaseCharacter(character) &&
        isDefined(nextCharacter) &&
        isLowercaseCharacter(nextCharacter)
    );
};

const appendTitleCaseWord = (
    appendToken: AppendTitleCaseToken,
    currentWord: string
): void => {
    if (currentWord.length > 0) {
        appendToken({
            kind: "word",
            value: currentWord.toLowerCase(),
        });
    }
};

const consumeTitleCaseCharacter = (
    appendToken: AppendTitleCaseToken,
    value: string,
    index: number,
    currentWord: string,
    character: string
): string => {
    if (isAlphaNumericCharacter(character)) {
        if (startsNewTitleCaseWord(value, index, currentWord, character)) {
            appendTitleCaseWord(appendToken, currentWord);

            return character;
        }

        return currentWord + character;
    }

    appendTitleCaseWord(appendToken, currentWord);

    if (character === "&") {
        appendToken({
            kind: "symbol",
            value: character,
        });
    }

    return "";
};

const splitIntoTitleCaseTokens = (value: string): readonly TitleCaseToken[] => {
    const tokens: TitleCaseToken[] = [];
    const appendToken: AppendTitleCaseToken = (token) => {
        tokens.push(token);
    };
    let currentWord = "";

    for (let index = 0; index < value.length; index += 1) {
        const character = value[index];

        if (isDefined(character)) {
            currentWord = consumeTitleCaseCharacter(
                appendToken,
                value,
                index,
                currentWord,
                character
            );
        }
    }

    appendTitleCaseWord(appendToken, currentWord);

    return tokens;
};

const splitDictionaryKeyIntoWords = (value: string): readonly string[] =>
    splitIntoTitleCaseTokens(value)
        .filter((token) => token.kind === "word")
        .map((token) => token.value);

const capitalizeWord = (word: string): string =>
    word.length === 0
        ? word
        : `${word.at(0)?.toUpperCase() ?? ""}${word.slice(1)}`;

const buildCaseDictionaryIndex = (): {
    readonly matchesByCollapsedKey: ReadonlyMap<
        string,
        readonly CaseDictionaryMatch[]
    >;
    readonly maxTokenSpan: number;
} => {
    const matchesByCollapsedKey = new Map<string, CaseDictionaryMatch[]>();
    let maxTokenSpan = 1;

    for (const [dictionaryKey, canonical] of objectEntries(
        workflowTitleCaseDictionary
    )) {
        const keyWords = splitDictionaryKeyIntoWords(dictionaryKey);

        if (isEmpty(keyWords)) {
            continue;
        }

        const tokenCount = keyWords.length;
        const collapsedKey = arrayJoin(keyWords, "");
        const existingMatches = matchesByCollapsedKey.get(collapsedKey) ?? [];
        const isDuplicateMatch = existingMatches.some(
            (existingMatch) =>
                existingMatch.canonical === canonical &&
                existingMatch.tokenCount === tokenCount
        );

        if (!isDuplicateMatch) {
            existingMatches.push({
                canonical,
                tokenCount,
            });
            matchesByCollapsedKey.set(collapsedKey, existingMatches);
        }

        if (tokenCount > maxTokenSpan) {
            maxTokenSpan = tokenCount;
        }
    }

    return {
        matchesByCollapsedKey,
        maxTokenSpan,
    };
};

const caseDictionaryIndex = buildCaseDictionaryIndex();

const findCaseDictionaryMatch = (
    words: readonly string[],
    startIndex: number
): CaseDictionaryMatch | undefined => {
    const remainingWordCount = words.length - startIndex;
    const maxSpan = Math.min(
        caseDictionaryIndex.maxTokenSpan,
        remainingWordCount
    );

    for (let tokenCount = maxSpan; tokenCount >= 1; tokenCount -= 1) {
        const collapsedCandidate = arrayJoin(
            words.slice(startIndex, startIndex + tokenCount),
            ""
        );
        const candidateMatches =
            caseDictionaryIndex.matchesByCollapsedKey.get(collapsedCandidate);

        if (!isDefined(candidateMatches)) {
            continue;
        }

        const selectedMatch =
            candidateMatches.find(
                (candidateMatch) => candidateMatch.tokenCount === tokenCount
            ) ?? arrayFirst(candidateMatches);

        if (isDefined(selectedMatch)) {
            return {
                canonical: selectedMatch.canonical,
                tokenCount,
            };
        }
    }

    return undefined;
};

const resolveTitleSegments = (
    words: readonly string[],
    startWordIndex: number,
    totalWordCount: number
): readonly string[] => {
    const segments: string[] = [];

    for (let index = 0; index < words.length;) {
        const dictionaryMatch = findCaseDictionaryMatch(words, index);

        if (isDefined(dictionaryMatch)) {
            segments.push(dictionaryMatch.canonical);
        } else {
            const currentWord = words[index];

            if (isDefined(currentWord)) {
                const absoluteWordIndex = startWordIndex + index;

                segments.push(
                    setHas(titleCaseSmallWords, currentWord) &&
                        absoluteWordIndex > 0 &&
                        absoluteWordIndex < totalWordCount - 1
                        ? currentWord
                        : capitalizeWord(currentWord)
                );
            }
        }

        index += dictionaryMatch?.tokenCount ?? 1;
    }

    return segments;
};

/** Convert a workflow display name to title case while preserving `&`. */
export const convertWorkflowNameToTitleCase = (value: string): string => {
    const tokens = splitIntoTitleCaseTokens(value);
    const totalWordCount = tokens.filter(
        (token) => token.kind === "word"
    ).length;
    const segments: string[] = [];
    let currentWordRun: string[] = [];
    let consumedWordCount = 0;

    const flushCurrentWordRun = (): void => {
        if (isEmpty(currentWordRun)) {
            return;
        }

        segments.push(
            ...resolveTitleSegments(
                currentWordRun,
                consumedWordCount,
                totalWordCount
            )
        );
        consumedWordCount += currentWordRun.length;
        currentWordRun = [];
    };

    for (const token of tokens) {
        if (token.kind === "word") {
            currentWordRun.push(token.value);
            continue;
        }

        flushCurrentWordRun();
        segments.push(token.value);
    }

    flushCurrentWordRun();

    return isEmpty(segments) ? value : arrayJoin(segments, " ");
};
