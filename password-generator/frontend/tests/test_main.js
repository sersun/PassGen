/**
 * @jest-environment jsdom
 */

describe('Password Generator Frontend', () => {
    let container;

    beforeEach(() => {
        document.body.innerHTML = `
            <form id="password-generator-form">
                <input type="number" id="length" value="12">
                <input type="checkbox" id="uppercase" checked>
                <input type="checkbox" id="lowercase" checked>
                <input type="checkbox" id="numbers" checked>
                <input type="checkbox" id="symbols">
            </form>
            <input type="text" id="generated-password">
            <button id="copy-button">Copy</button>
            <div id="password-list"></div>
        `;
    });

    test('password history should be updated correctly', () => {
        const passwordList = document.getElementById('password-list');
        const newPassword = 'TestPassword123!';
        
        updatePasswordHistory(newPassword);
        
        expect(passwordList.children.length).toBeLessThanOrEqual(3);
        expect(passwordList.innerHTML).toContain(newPassword);
    });

    test('word-based password generation', () => {
        const words = ['cat', 'dog', 'book'];
        const password = generateWordPassword(words, true, true);
        
        expect(password).toMatch(/^[A-Z][a-z]+[A-Z][a-z]+\d{3}[!@#$%^&*]$/);
    });

    test('copy button functionality', () => {
        const copyButton = document.getElementById('copy-button');
        const generatedPassword = document.getElementById('generated-password');
        
        document.execCommand = jest.fn();
        generatedPassword.value = 'TestPassword123';
        
        copyButton.click();
        
        expect(document.execCommand).toHaveBeenCalledWith('copy');
        expect(copyButton.textContent).toBe('Copied!');
    });
});