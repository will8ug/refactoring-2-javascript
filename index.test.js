import statement from './index';

import plays from './plays.json';
import invoices from './invoices.json';

describe('Tests of tests', () => {
    test('1 should equal 1', () => {
        expect(1).toBe(1);
    });
});

describe('Tests of statement()', () => {
    console.log(statement(invoices[0], plays))
    
    test('basic start', () => {
        expect(statement(invoices[0], plays)).toBeDefined();
    });
});
