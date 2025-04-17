document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('password-generator-form');
    const generatedPasswordInput = document.getElementById('generated-password');
    const copyButton = document.getElementById('copy-button');
    const passwordList = document.getElementById('password-list');
    let passwordHistory = [];

    function savePassword(password) {
        // Copy to clipboard
        const tempInput = document.createElement('textarea');
        tempInput.value = password;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);

        // Show feedback on the clicked save button
        const saveBtn = document.querySelector(`.save-btn[data-password="${password}"]`);
        if (saveBtn) {
            saveBtn.textContent = 'Copied!';
            saveBtn.classList.remove('btn-outline-primary');
            saveBtn.classList.add('btn-success');
            
            setTimeout(() => {
                saveBtn.textContent = 'Save';
                saveBtn.classList.remove('btn-success');
                saveBtn.classList.add('btn-outline-primary');
            }, 2000);
        }

        // Save to localStorage
        const savedPasswords = JSON.parse(localStorage.getItem('savedPasswords') || '[]');
        if (!savedPasswords.includes(password)) {
            savedPasswords.push(password);
            localStorage.setItem('savedPasswords', JSON.stringify(savedPasswords));
        }
    }

    function updatePasswordHistory(newPassword) {
        // Add new password to history if it's not already present
        if (!passwordHistory.includes(newPassword)) {
            passwordHistory.unshift(newPassword);
        }
        
        // Keep only the last 4 passwords (current + 3 history)
        passwordHistory = passwordHistory.slice(0, 4);
        
        // Display only the previous 3 passwords (exclude current)
        const displayHistory = passwordHistory.slice(1, 4);
        
        // Update the display with data-password attribute
        passwordList.innerHTML = displayHistory.map(password => `
            <div class="password-history-item">
                <span class="password-text">${password}</span>
                <button class="btn btn-outline-primary btn-sm save-btn" data-password="${password}">Save</button>
            </div>
        `).join('');

        // Add event listeners to save buttons
        document.querySelectorAll('.save-btn').forEach((btn, index) => {
            btn.addEventListener('click', () => {
                savePassword(displayHistory[index]);
            });
        });
    }

    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const params = {
            length: document.getElementById('length').value,
            uppercase: document.getElementById('uppercase').checked,
            lowercase: document.getElementById('lowercase').checked,
            numbers: document.getElementById('numbers').checked,
            symbols: document.getElementById('symbols').checked
        };

        try {
            const response = await fetch('/generate-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(params)
            });

            const data = await response.json();
            generatedPasswordInput.value = data.password;
            updatePasswordHistory(data.password);
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to generate password');
        }
    });

    copyButton.addEventListener('click', function() {
        generatedPasswordInput.select();
        document.execCommand('copy');
        
        // Show feedback
        copyButton.textContent = 'Copied!';
        setTimeout(() => {
            copyButton.textContent = 'Copy';
        }, 2000);
    });

    function generateWordPassword(words, addNumbers, addSymbols) {
        if (!words || words.length < 2) return null;
        
        // Randomly select two different words
        const word1 = words[Math.floor(Math.random() * words.length)];
        let word2;
        do {
            word2 = words[Math.floor(Math.random() * words.length)];
        } while (word2 === word1 && words.length > 1);
        
        // Capitalize first letters
        const formattedWord1 = word1.charAt(0).toUpperCase() + word1.slice(1);
        const formattedWord2 = word2.charAt(0).toUpperCase() + word2.slice(1);
        
        let password = `${formattedWord1}${formattedWord2}`;
        
        // Add random number if selected
        if (addNumbers) {
            password += Math.floor(Math.random() * 900 + 100); // Add 3-digit number
        }
        
        // Add random symbol if selected
        if (addSymbols) {
            const symbols = '!@#$%^&*';
            password += symbols.charAt(Math.floor(Math.random() * symbols.length));
        }
        
        return password;
    }

    document.getElementById('words-generator-form').addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const wordsList = document.getElementById('wordsList').value
            .split(',')
            .map(word => word.trim())
            .filter(word => word.length > 0);
            
        const addNumbers = document.getElementById('addNumbers').checked;
        const addSymbols = document.getElementById('addSymbols').checked;
        
        const password = generateWordPassword(wordsList, addNumbers, addSymbols);
        
        if (password) {
            document.getElementById('generated-password').value = password;
            updatePasswordHistory(password);
        } else {
            alert('Please enter at least two words separated by commas');
        }
    });
});

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        generatePassword,
        updatePasswordHistory
    };
}