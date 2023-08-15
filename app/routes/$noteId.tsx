import { json } from '@remix-run/node';
import type { LoaderArgs } from "@remix-run/node";
import { Link, useLoaderData } from '@remix-run/react';
import { getStoredNotes } from '~/data/note';

import styles from '~/styles/note-details.css';

export default function NoteDetailsPage() {
  const note = useLoaderData()
  console.log(note)

  return (
    <main id="note-details">
      <header>
        <nav>
          <Link to="/notes">Back to all Notes</Link>
        </nav>
        <h1>{note.title}</h1>
      </header>
      <p id="note-details-content">{note.content}</p>
    </main>
  );
}

export async function loader ({params} : LoaderArgs ) {
  const notes = await getStoredNotes ()
  const noteId = params.noteId
  const selectedNote = notes.find(note => note.id === noteId)

  if (!selectedNote) {
    throw json(
      {message: 'could found note' + noteId},
      {
        status: 404,
        statusText: "Not Found"
      }
    )
  }
  return selectedNote
}

export function links() {
  return [{ rel: 'stylesheet', href: styles }];
}