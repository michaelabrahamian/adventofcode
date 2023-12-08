import { Game, getMinimumSetOfCubesForGame } from './index';

describe('getMinimumSetOfCubesForGame', () => {
    test('should work', () => {
        const testGame: Game = {
            id: 1,
            subsets: [
                [
                    { colour: 'blue', amount: 3 },
                    { colour: 'red', amount: 4 },
                ],
                [
                    { colour: 'red', amount: 1 },
                    { colour: 'green', amount: 2 },
                    { colour: 'blue', amount: 6 },
                ],
                [{ colour: 'green', amount: 2 }],
            ],
        };

        expect(getMinimumSetOfCubesForGame(testGame)).toEqual({
            red: 4,
            green: 2,
            blue: 6,
        });
    });
});
