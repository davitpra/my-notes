import { json, redirect } from '@remix-run/node';
import NewNote, {links as NewNoteLinks} from '../components/NewNote'
import {getStoredNotes, storeNotes} from "../data/note.js"
import NoteList, {links as noteListLinks} from '~/components/NoteList';
import { Link, useLoaderData, useRouteError } from '@remix-run/react';

// export function meta () {
//   return {
//     title: 'All Notes',
//     description: 'Manage your notes with ease'
//   }
// }

export async function loader() {
  const notes = await getStoredNotes();
  if (!notes || notes.lenght === 0) {
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
  const responseError = useRouteError()
  const message = responseError.data?.message || 'data not found'

  if (message) {
    return (
      <main>
        <NewNote />
        <p className='info-message'>{message}</p>
      </main>
    )
  }

  return (
    <main className = 'error'>
      <h1> An Error releted to your notes Ocurred! </h1>
      <p> {error.message}</p>
      <p> Back to <Link to='/' > safety</Link>! </p>
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
