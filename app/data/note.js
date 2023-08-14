import fs from 'fs/promises';

// funtion to read data fiels from note.json
export async function getStoredNotes() {
  const rawFileContent = await fs.readFile('notes.json', { encoding: 'utf-8' });
  const data = JSON.parse(rawFileContent);
  const storedNotes = data.notes ?? [];
  return storedNotes;
}

// funtion to post data fiels in note.json
export function storeNotes(notes) {
  return fs.writeFile('notes.json', JSON.stringify({ notes: notes || [] }));
}