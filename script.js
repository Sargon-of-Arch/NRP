const API_URL = "http://localhost:3001";

async function loadDictionary() {
  try {
    const response = await fetch(`${API_URL}/words`);
    const words = await response.json();
    document.querySelector('#dictionary-table tbody').innerHTML = words.map((word, index) => `
      <tr>
        <td>${word.word || ''}</td>
        <td>${word.meaning || ''}</td>
        <td>${word.origin || ''}</td>
        <td>${word.ipa || ''}</td>
        <td><button onclick="deleteWord(${index})">Delete</button></td>
      </tr>
    `).join('');
  } catch (error) {
    console.error("Failed to load dictionary:", error);
  }
}

async function addWord() {
  try {
    await fetch(`${API_URL}/words`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        word: document.getElementById('word-input').value,
        meaning: document.getElementById('meaning-input').value,
        origin: document.getElementById('origin-input').value,
        ipa: document.getElementById('ipa-input').value
      })
    });
    loadDictionary();
  } catch (error) {
    console.error("Failed to add word:", error);
  }
}

async function deleteWord(index) {
  try {
    await fetch(`${API_URL}/words/${index}`, { method: 'DELETE' });
    loadDictionary();
  } catch (error) {
    console.error("Failed to delete word:", error);
  }
}

document.addEventListener('DOMContentLoaded', loadDictionary);
