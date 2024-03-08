import { statement, htmlStatement } from './index';

import plays from './plays.json';
import invoices from './invoices.json';

describe('Tests of tests', () => {
    test('1 should equal 1', () => {
        expect(1).toBe(1);
    });
});

describe('Tests of statement() with full set of test data', () => {
    const sttResult = statement(invoices[0], plays);
    console.log(sttResult)
    
    test('verify the full output', () => {
        expect(sttResult).toBeDefined();
        expect(sttResult).toMatch(/Statement for BigCo/);
        expect(sttResult).toMatch(/Hamlet: \$650.00 \(55 seats\)/);
        expect(sttResult).toMatch(/As You Like It: \$580.00 \(35 seats\)/);
        expect(sttResult).toMatch(/Othello: \$500.00 \(40 seats\)/);
        expect(sttResult).toMatch(/Amount owed is \$1,730.00/);
        expect(sttResult).toMatch(/You earned 47 credits/);
    });
});

describe('Tests of statement() with only one tragedy play', () => {
    test('verify tragedy with 30 audience', () => {
        const playTragedy = {
            "customer": "BigCo",
            "performances": [
                {
                    "playID": "hamlet",
                    "audience": 30
                }
            ]
        };

        const sttResult = statement(playTragedy, plays);
        expect(sttResult).toMatch(/Statement for BigCo/);
        expect(sttResult).toMatch(/Hamlet: \$400.00 \(30 seats\)/);
        expect(sttResult).toMatch(/Amount owed is \$400.00/);
        expect(sttResult).toMatch(/You earned 0 credits/);
    });
    
    test('verify tragedy with 31 audience', () => {
        const playTragedy = {
            "customer": "BigCo",
            "performances": [
                {
                    "playID": "hamlet",
                    "audience": 31
                }
            ]
        };

        const sttResult = statement(playTragedy, plays);
        expect(sttResult).toMatch(/Statement for BigCo/);
        expect(sttResult).toMatch(/Hamlet: \$410.00 \(31 seats\)/);
        expect(sttResult).toMatch(/Amount owed is \$410.00/);
        expect(sttResult).toMatch(/You earned 1 credits/);
    });
});

describe('Tests of statement() with only one comedy play', () => {
    test('verify comedy with 20 audience', () => {
        const playComedy = {
            "customer": "BigCo",
            "performances": [
                {
                    "playID": "as-like",
                    "audience": 20
                }
            ]
        };

        const sttResult = statement(playComedy, plays);
        expect(sttResult).toMatch(/Statement for BigCo/);
        expect(sttResult).toMatch(/As You Like It: \$360.00 \(20 seats\)/);
        expect(sttResult).toMatch(/Amount owed is \$360.00/);
        expect(sttResult).toMatch(/You earned 4 credits/);
    });
    
    test('verify comedy with 21 audience', () => {
        const playComedy = {
            "customer": "BigCo",
            "performances": [
                {
                    "playID": "as-like",
                    "audience": 21
                }
            ]
        };

        const sttResult = statement(playComedy, plays);
        expect(sttResult).toMatch(/Statement for BigCo/);
        expect(sttResult).toMatch(/As You Like It: \$468.00 \(21 seats\)/);
        expect(sttResult).toMatch(/Amount owed is \$468.00/);
        expect(sttResult).toMatch(/You earned 4 credits/);
    });
    
    test('verify comedy with 31 audience', () => {
        const playComedy = {
            "customer": "BigCo",
            "performances": [
                {
                    "playID": "as-like",
                    "audience": 31
                }
            ]
        };

        const sttResult = statement(playComedy, plays);
        expect(sttResult).toMatch(/Statement for BigCo/);
        expect(sttResult).toMatch(/As You Like It: \$548.00 \(31 seats\)/);
        expect(sttResult).toMatch(/Amount owed is \$548.00/);
        expect(sttResult).toMatch(/You earned 7 credits/);
    });
});

describe('Tests of statement() with invalid play type', () => {
    test('invalid play type should cause Error', () => {
        const playUnknown = {
            "customer": "BigCo",
            "performances": [
                {
                    "playID": "unknownId",
                    "audience": 1
                }
            ]
        };
        const mockPlays = {
            "unknownId": {"name": "unknownName", "type": "unknownType"},
        }

        expect(() => statement(playUnknown, mockPlays)).toThrow(Error);
    });
});

describe('Tests of htmlStatement() with full set of test data', () => {
    const sttResult = htmlStatement(invoices[0], plays);
    console.log(sttResult)
    
    test('verify the full output', () => {
        expect(sttResult).toBeDefined();
        expect(sttResult).toMatch(/Statement for BigCo/);
        expect(sttResult).toMatch(/<td>Hamlet<\/td><td>55<\/td><td>\$650.00<\/td>/);
        expect(sttResult).toMatch(/<td>As You Like It<\/td><td>35<\/td><td>\$580.00<\/td>/);
        expect(sttResult).toMatch(/<td>Othello<\/td><td>40<\/td><td>\$500.00<\/td>/);
        expect(sttResult).toMatch(/Amount owed is <em>\$1,730.00<\/em>/);
        expect(sttResult).toMatch(/You earned <em>47<\/em> credits/);
    });
});

describe('Tests of htmlStatement() with only one comedy play', () => {
    test('verify comedy with 1 audience', () => {
        const playComedy = {
            "customer": "BigCo",
            "performances": [
                {
                    "playID": "as-like",
                    "audience": 1
                }
            ]
        };

        const sttResult = htmlStatement(playComedy, plays);
        expect(sttResult).toMatch(/Statement for BigCo/);
        expect(sttResult).toMatch(/<td>As You Like It<\/td><td>1<\/td><td>\$303.00<\/td>/);
        expect(sttResult).toMatch(/Amount owed is <em>\$303.00<\/em>/);
        expect(sttResult).toMatch(/You earned <em>0<\/em> credits/);
    });

    test('verify comedy with 5 audience', () => {
        const playComedy = {
            "customer": "BigCo",
            "performances": [
                {
                    "playID": "as-like",
                    "audience": 5
                }
            ]
        };

        const sttResult = htmlStatement(playComedy, plays);
        expect(sttResult).toMatch(/Statement for BigCo/);
        expect(sttResult).toMatch(/<td>As You Like It<\/td><td>5<\/td><td>\$315.00<\/td>/);
        expect(sttResult).toMatch(/Amount owed is <em>\$315.00<\/em>/);
        expect(sttResult).toMatch(/You earned <em>1<\/em> credits/);
    });
});

describe('Tests of htmlStatement() with only one tragedy play', () => {
    test('verify tragedy with 1 audience', () => {
        const playTragedy = {
            "customer": "BigCo",
            "performances": [
                {
                    "playID": "othello",
                    "audience": 1
                }
            ]
        };

        const sttResult = htmlStatement(playTragedy, plays);
        expect(sttResult).toMatch(/Statement for BigCo/);
        expect(sttResult).toMatch(/<td>Othello<\/td><td>1<\/td><td>\$400.00<\/td>/);
        expect(sttResult).toMatch(/Amount owed is <em>\$400.00<\/em>/);
        expect(sttResult).toMatch(/You earned <em>0<\/em> credits/);
    });
    
    test('verify tragedy with 5 audience', () => {
        const playTragedy = {
            "customer": "BigCo",
            "performances": [
                {
                    "playID": "othello",
                    "audience": 5
                }
            ]
        };

        const sttResult = htmlStatement(playTragedy, plays);
        expect(sttResult).toMatch(/Statement for BigCo/);
        expect(sttResult).toMatch(/<td>Othello<\/td><td>5<\/td><td>\$400.00<\/td>/);
        expect(sttResult).toMatch(/Amount owed is <em>\$400.00<\/em>/);
        expect(sttResult).toMatch(/You earned <em>0<\/em> credits/);
    });
});