/**
 * @jest-environment jsdom
 */

describe('Password Generator', () => {
    beforeEach(() => {
        document.body.innerHTML = `
            <div class="container">
                <form id="password-generator-form">
                    <input type="number" id="length" value="12">
                    <input type="checkbox" id="uppercase" checked>
                    <input type="checkbox" id="lowercase" checked>
                    <input type="checkbox" id="numbers" checked>
                    <input type="checkbox" id="symbols">
                </form>
                <input type="text" id="generated-password">
                <div id="password-list"></div>
            </div>
        `;
        require('./main.js');
    });

    test('form should exist', () => {
        const form = document.getElementById('password-generator-form');
        expect(form).toBeTruthy();
    });

    test('password length input should have default value', () => {
        const lengthInput = document.getElementById('length');
        expect(lengthInput.value).toBe('12');
    });

    test('checkboxes should have correct default states', () => {
        expect(document.getElementById('uppercase').checked).toBe(true);
        expect(document.getElementById('lowercase').checked).toBe(true);
        expect(document.getElementById('numbers').checked).toBe(true);
        expect(document.getElementById('symbols').checked).toBe(false);
    });
});