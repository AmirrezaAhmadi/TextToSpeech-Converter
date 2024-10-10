document.getElementById('speak-btn').addEventListener('click', function() {
    const text = document.getElementById('text-input').value;

    const nonEnglishPattern = /[^a-zA-Z\s]/;

    if (text.trim() === '') {
        displayMessage('Please enter some text.', 'error');
        return;
    }

    if (nonEnglishPattern.test(text)) {
        displayMessage('Please enter the text in English only.', 'error');
        return;
    }

    const speech = new SpeechSynthesisUtterance();
    speech.text = text;
    speech.lang = 'en-US';

    window.speechSynthesis.speak(speech);
    displayMessage('Speaking...', 'success');
});


document.getElementById('paste-icon').addEventListener('click', function() {
    navigator.clipboard.readText().then(text => {
        document.getElementById('text-input').value = text;
        displayMessage('Text pasted from clipboard!', 'success');
    }).catch(() => {
        displayMessage('Failed to paste text.', 'error');
    });
});

function displayMessage(message, type) {
    const messageElement = document.getElementById('message');
    messageElement.textContent = message;
    messageElement.style.color = type === 'error' ? 'red' : 'green';

    setTimeout(() => {
        messageElement.textContent = '';
    }, 3000);
}
