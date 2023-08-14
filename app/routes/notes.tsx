import NewNote, {links as NewNoteLinks} from '../components/NewNote'

export default function notes() {
  return (
    <main>
        <NewNote/>
    </main>
  )
}

export function links() {
    return [...NewNoteLinks()];
  }