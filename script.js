const STORAGE_KEY = 'carnet-note-eleves';

const form = document.getElementById('note-form');
const notesBody = document.getElementById('notes-body');
const studentCount = document.getElementById('student-count');
const overallAverage = document.getElementById('overall-average');
const bestScore = document.getElementById('best-score');
const clearAllBtn = document.getElementById('clear-all');

function loadNotes() {
  const savedNotes = localStorage.getItem(STORAGE_KEY);
  return savedNotes ? JSON.parse(savedNotes) : [];
}

function saveNotes(notes) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
}

function calculateAverage(notes) {
  if (!notes.length) return 0;

  const weightedTotal = notes.reduce((sum, entry) => sum + Number(entry.score) * Number(entry.coefficient), 0);
  const coefficientTotal = notes.reduce((sum, entry) => sum + Number(entry.coefficient), 0);

  return coefficientTotal ? weightedTotal / coefficientTotal : 0;
}

function renderStats(notes) {
  const uniqueStudents = new Set(notes.map((entry) => entry.studentName.trim().toLowerCase())).size;
  const average = calculateAverage(notes);
  const maxScore = notes.length ? Math.max(...notes.map((entry) => Number(entry.score))) : 0;

  studentCount.textContent = String(uniqueStudents);
  overallAverage.textContent = average.toFixed(1);
  bestScore.textContent = maxScore.toFixed(1);
}

function renderTable(notes) {
  notesBody.innerHTML = '';

  if (!notes.length) {
    const emptyTemplate = document.getElementById('empty-state-template');
    notesBody.appendChild(emptyTemplate.content.cloneNode(true));
    return;
  }

  notes.forEach((entry, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${entry.studentName}</td>
      <td>${entry.studentClass}</td>
      <td>${entry.subject}</td>
      <td>${Number(entry.score).toFixed(1)} / 20</td>
      <td>${entry.coefficient}</td>
      <td>
        <button type="button" class="delete-btn" data-index="${index}">Supprimer</button>
      </td>
    `;
    notesBody.appendChild(row);
  });

  notesBody.querySelectorAll('.delete-btn').forEach((button) => {
    button.addEventListener('click', (event) => {
      const index = Number(event.currentTarget.dataset.index);
      const updatedNotes = loadNotes();
      updatedNotes.splice(index, 1);
      saveNotes(updatedNotes);
      render();
    });
  });
}

function render() {
  const notes = loadNotes();
  renderStats(notes);
  renderTable(notes);
}

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const formData = new FormData(form);
  const newEntry = {
    studentName: formData.get('studentName').toString().trim(),
    studentClass: formData.get('studentClass').toString().trim(),
    subject: formData.get('subject').toString().trim(),
    score: Number(formData.get('score')),
    coefficient: Number(formData.get('coefficient')),
  };

  if (!newEntry.studentName || !newEntry.studentClass || !newEntry.subject) {
    return;
  }

  if (Number.isNaN(newEntry.score) || Number.isNaN(newEntry.coefficient)) {
    return;
  }

  const notes = loadNotes();
  notes.push(newEntry);
  saveNotes(notes);
  form.reset();
  render();
});

clearAllBtn.addEventListener('click', () => {
  if (window.confirm('Voulez-vous vraiment supprimer toutes les notes ?')) {
    saveNotes([]);
    render();
  }
});

render();
