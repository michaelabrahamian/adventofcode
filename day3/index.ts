import { readFileSync } from 'fs';

const INPUT_FILE_PATH = 'day3/input.txt';

type PartNumber = {
    value: number;
    lineNumber: number;
    startIndex: number;
    endIndex: number;
};

type SchematicSymbol = {
    lineNumber: number;
    value: string;
    index: number;
};

type SchematicForLine = {
    parts: PartNumber[];
    symbols: SchematicSymbol[];
};

type EngineSchematic = {
    [lineNumber: number]: SchematicForLine;
};

const REGEX_JUST_NUMBER_DIGITS = /\d+/g;
const REGEX_ANY_SYMBOL_NOT_WORD_CHAR_OR_PERIOD = /[^.\w]/g;
// Go through the input, and create an EngineSchematic object

const getSchematicForLine = (
    line: string,
    lineNumber: number
): SchematicForLine => {
    const numbers = line.matchAll(REGEX_JUST_NUMBER_DIGITS);

    const numbersInLine: PartNumber[] = Array.from(
        numbers,
        (match): PartNumber => ({
            lineNumber,
            value: parseInt(match[0]),
            startIndex: match.index ?? 0,
            endIndex: (match.index ?? 0) + match[0].length - 1,
        })
    );

    const symbols = line.matchAll(REGEX_ANY_SYMBOL_NOT_WORD_CHAR_OR_PERIOD);

    const symbolsInLine: SchematicSymbol[] = Array.from(
        symbols,
        (match): SchematicSymbol => ({
            value: match[0],
            lineNumber,
            index: match.index ?? 0,
        })
    );

    return {
        parts: numbersInLine,
        symbols: symbolsInLine,
    };
};

const createEngineSchematicFromInputFile = (
    fileName: string
): EngineSchematic => {
    const fileContents = readFileSync(fileName, 'utf8');

    const lines = fileContents.split('\n');

    return Object.fromEntries(
        lines.map((line, lineNumber) => [
            lineNumber,
            getSchematicForLine(line, lineNumber),
        ])
    );
};

const getSumOfEnginePartNumbers = (): number => {
    const engineSchematic = createEngineSchematicFromInputFile(INPUT_FILE_PATH);

    const engineSchematicContainingOnlyPartsAdjacentToSymbol = Object.values(
        engineSchematic
    ).map((schematicForLine, lineIndex) => {
        const { parts, symbols } = schematicForLine;

        const partsAdjacentToSymbol = parts.filter((part) => {
            const isSymbolToTheLeft = (symbol: SchematicSymbol): boolean =>
                symbol.index === part.startIndex - 1;

            const isSymbolToTheRight = (symbol: SchematicSymbol): boolean =>
                symbol.index === part.endIndex + 1;

            const isThereASymbolToTheLeftOrRight = symbols.some(
                (symbol) =>
                    isSymbolToTheLeft(symbol) || isSymbolToTheRight(symbol)
            );

            const isThereASymbolAdjacentOnLineAbove = engineSchematic[
                lineIndex - 1
            ]?.symbols.some(
                (symbol) =>
                    symbol.index >= part.startIndex - 1 &&
                    symbol.index <= part.endIndex + 1
            );

            const isThereASymbolAdjacentOnLineBelow = engineSchematic[
                lineIndex + 1
            ]?.symbols.some(
                (symbol) =>
                    symbol.index >= part.startIndex - 1 &&
                    symbol.index <= part.endIndex + 1
            );

            return (
                isThereASymbolToTheLeftOrRight ||
                isThereASymbolAdjacentOnLineAbove ||
                isThereASymbolAdjacentOnLineBelow
            );
        });

        return {
            parts: partsAdjacentToSymbol,
            symbols,
        };
    });

    const sum = engineSchematicContainingOnlyPartsAdjacentToSymbol.reduce(
        (acc, schematicForLine) => {
            const { parts } = schematicForLine;

            return acc + parts.reduce((acc, part) => acc + part.value, 0);
        },
        0
    );

    return sum;
};

console.log('Sum:', getSumOfEnginePartNumbers());
