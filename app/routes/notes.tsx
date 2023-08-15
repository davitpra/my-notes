import { redirect } from '@remix-run/node';
import NewNote, {links as NewNoteLinks} from '../components/NewNote'
import {getStoredNotes, storeNotes} from "../data/note.js"
import NoteList, {links as noteListLinks} from '~/components/NoteList';
import { useLoaderData } from '@remix-run/react';

export async function loader() {
  const notes = await getStoredNotes();
  return notes;
}

export async function action({request}) {
    const formData = await request.formData();
    const noteData = {
        title: formData.get('title'),
        content: formData.get('content')
    }

    if (noteData.title.trim().length < 5) {
      return { message: 'Invalid title - must be at least 5 characters long.'}
    }

    const existingNotes = await getStoredNotes()
    noteData.id =  new Date().toISOString();
    const updatedNotes = existingNotes.concat(noteData)
    await storeNotes(updatedNotes)
    return redirect('/notes');
}

export function links() {
    return [...NewNoteLinks(), ...noteListLinks()];
  }

export default function notes() {

  const notes = useLoaderData ()

  return (
    <main>
        <NewNote/>
        <NoteList notes={notes}/>
    </main>
  )
}
