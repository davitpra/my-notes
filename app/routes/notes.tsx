import { json, redirect } from '@remix-run/node';
import NewNote, {links as NewNoteLinks} from '../components/NewNote'
import {getStoredNotes, storeNotes} from "../data/note.js"
import NoteList, {links as noteListLinks} from '~/components/NoteList';
import { Link, useCatch, useLoaderData } from '@remix-run/react';

export async function loader() {
  const notes = await getStoredNotes();
  if (!note || notes.lenght === 0) {
    throw json(
      {message: "Could not find any note."},
      {
        status: 404,
        statusText: 'Not Foundito' 
      },
    )
  }
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

export function ErrorBoundary({error}) {
  return (
    <main className = 'error'>
      <h1> An Error releted to your notes Ocurred! </h1>
      <p> {error.message}</p>
      <p> Back to <Link to='/' > safety</Link>! </p>
    </main>
  )
}

export function CatchBoundary () {
  const caughtResponse = useCatch ()

  const message = caughtResponse.data?.message || 'data not found'

  return (
    <main>
      <NewNote />
      <p className='info-message'>{message}</p>
    </main>
  )
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
