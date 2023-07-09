import React from "react"
import Sidebar from "./components/Sidebar"
import Editor from "./components/Editor"
import Split from "react-split"
import { nanoid } from "nanoid"
import {
    onSnapshot,
    addDoc,
    doc,
    deleteDoc,
    setDoc
} from "firebase/firestore"
import { notesCollection, db } from "./firebase"

export default function App() {
    //Notes State : an array of empty notes
    const [notes, setNotes] = React.useState([])
    //Current Note ID
    const [currentNoteId, setCurrentNoteId] = React.useState("")
    //Locating the current note, either the first note OR the note with currentNoteId
    const currentNote =
        notes.find(note => note.id === currentNoteId)
        || notes[0]
    // Using sort method update the note in the array
    const sortedNotes = notes.sort((a, b) => b.updatedAt - a.updatedAt)
    // Temporary placeholder for note text (to send to firestore database after)
    const [tempNoteText, setTempNoteText] = React.useState([]) 
    // When the current note changes, update the tempNoteText
    React.useEffect (() => {
        if (currentNote) {
            setTempNoteText(currentNote.body)// setting temporary note === current note body
        }
    }, [currentNote])
// if you keep typing then its gonna be less than 500ms then ill always clear the timeout and nerver update  the database.
//After 1st rendering, run this useEffect again when tempNoteText changes, this useEffect will run a setTimeout function
//The timeout is 3 seconds, which means, if a user stop typing for 3 seconds, then it first checks if
//if temporary note !== current note body, then it will update the note
    React.useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (tempNoteText !== currentNote.body){

                updateNote(tempNoteText)
            } 
            
        }, 3000)
        return () => clearTimeout(timeoutId)// if users keep typing in 3 second-interval then the funcition will keep reseting the timeout.
    }, [tempNoteText])

    React.useEffect(() => {
        const unsubscribe = onSnapshot(notesCollection, function (snapshot) {
            // Sync up our local notes array with the snapshot data(which is the data from the database)
            const notesArr = snapshot.docs.map(doc => ({
                ...doc.data(),
                id: doc.id
            }))
            setNotes(notesArr)
        })
        return unsubscribe
    }, [])
    // If there is no note, then set curent note to the first note
    React.useEffect(() => {
        if (!currentNoteId) {
            setCurrentNoteId(notes[0]?.id)
        }
    }, [notes])
    // Javascript will wait for the function to finish before moving on to the next line of code
    async function createNewNote() {
        const newNote = {
            body: "# Type your markdown note's title here",
            createdAt: Date.now(),
            updatedAt: Date.now()
        }
        const newNoteRef = await addDoc(notesCollection, newNote)// add new note to the database
        setCurrentNoteId(newNoteRef.id)// update the database note id to the current note id
    }

    async function updateNote(text) {
        const docRef = doc(db, "notes", currentNoteId)// declare the current note id
        await setDoc(docRef, { body: text , updatedAt: Date.now()}, { merge:true })
        return sortedNote
    }

    async function deleteNote(noteId) {
        const docRef = doc(db, "notes", noteId)
        await deleteDoc(docRef)
    }

    return (
        <main>
            {
                notes.length > 0
                    ?
                    <Split
                        sizes={[30, 70]}
                        direction="horizontal"
                        className="split"
                    >
                        <Sidebar
                            notes={sortedNotes}
                            currentNote={currentNote}
                            setCurrentNoteId={setCurrentNoteId}
                            newNote={createNewNote}
                            deleteNote={deleteNote}
                        />
                        <Editor
                            tempNoteText={tempNoteText}
                            setTempNoteText={setTempNoteText}
                        />
                    </Split>
                    :
                    <div className="no-notes">
                        <h1>You have no notes</h1>
                        <button
                            className="first-note"
                            onClick={createNewNote}
                        >
                            Create one now
                </button>
                    </div>

            }
        </main>
    )
}
