import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/storage.service.js'
import { asyncStorageService } from '../../../services/async-storage.service.js'

const NOTE_KEY = 'noteDB'
_createNotes()

export const noteService = {
    query,
    get,
    remove,
    save,
    getEmptynote,
    getDefaultFilter,
    getFilterFromSearchParams,
    togglePin,
    duplicate,
    saveMailNote
}
// For Debug (easy access from console):
// window.cs = noteService

function query(filterBy = { folder: 'note' }) {
    // console.log(filterBy)
    return asyncStorageService.query(NOTE_KEY)
        .then(notes => {
            if (filterBy.search) {
                const regExp = new RegExp(filterBy.search, 'i')
                notes = notes.filter(note => regExp.test(note.info.txt || note.info.title))

            }

            if (filterBy.type) {
                notes = notes.filter(note => note.type === filterBy.type);
            }

            if (filterBy.folder === 'trash') {
                notes = notes.filter(note => note.isTrash === true)
            }
            if (filterBy.folder === 'notes') {
                notes = notes.filter(note => note.isTrash !== true)
            }

            notes.sort((a, b) => b.isPinned - a.isPinned)



            return notes
        })
}

function get(noteId) {
    return asyncStorageService.get(NOTE_KEY, noteId)
        .then(note => {
            note = _setNextPrevnoteId(note)
            return note
        })
}

function remove(noteId) {
    return asyncStorageService.remove(NOTE_KEY, noteId)
}

function save(note) {
    if (note.id) {
        return asyncStorageService.put(NOTE_KEY, note)
    } else {
        return asyncStorageService.post(NOTE_KEY, note)
    }
}

function getEmptynote(vendor = '', maxSpeed = '') {
    return { vendor, maxSpeed }
}

function getDefaultFilter(filterBy = { txt: '', minSpeed: 0 }) {
    return { txt: filterBy.txt, minSpeed: filterBy.minSpeed }
}

function getFilterFromSearchParams(searchParams) {
    return {
        // txt: searchParams.get('txt') || '',
        // minSpeed: +searchParams.get('minSpeed') || '',
        folder: searchParams.get('folder') || 'note',
        type: searchParams.get('type') || '',
        search: searchParams.get('search') || '',
    }
}


function _setNextPrevnoteId(note) {
    return asyncStorageService.query(NOTE_KEY).then((notes) => {
        const noteIdx = notes.findIndex((currnote) => currnote.id === note.id)
        const nextnote = notes[noteIdx + 1] ? notes[noteIdx + 1] : notes[0]
        const prevnote = notes[noteIdx - 1] ? notes[noteIdx - 1] : notes[notes.length - 1]
        note.nextnoteId = nextnote.id
        note.prevnoteId = prevnote.id
        return note
    })
}


function _createNotes() {
    let notes = storageService.loadFromStorage(NOTE_KEY)
    if (!notes || !notes.length) {
        // console.log('hi');
        const notes = [
            {
                id: 'n101',
                type: 'NoteVideo',
                isPinned: true,
                info: {
                    url: 'https://www.youtube.com/watch?v=izGwDsrQ1eQ',
                    title: 'Careless Whisper 🥵'
                },
                style: {
                    backgroundColor: '#f8d0cc'
                }
            },
            {
                id: 'n102',
                type: 'NoteImg',
                isPinned: false,
                info: {
                    url: 'https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg',
                    title: 'Steve'
                },
                style: {
                    backgroundColor: '#f8f9da'
                }
            },
            {
                id: 'n103',
                type: 'NoteImg',
                isPinned: true,
                info: {
                    url: 'https://ca-times.brightspotcdn.com/dims4/default/d4248e0/2147483647/strip/true/crop/7510x4535+0+0/resize/2000x1208!/quality/75/?url=https%3A%2F%2Fcalifornia-times-brightspot.s3.amazonaws.com%2F67%2Fdd%2Fca48944f4fa7bf1c3910ca9d7982%2F1362404-sp-1027-string-bowling4-wjs.jpg',
                    title: 'Alon and Idan after sprint'
                },
                style: {
                    backgroundColor: '#c4d6e4'
                }
            },
            {
                id: 'n104',
                createdAt: 1112222,
                type: 'NoteTxt',
                isPinned: false,
                isTrash: true,
                style: {
                    backgroundColor: '#c4d6e4'
                },
                info: {
                    title: 'Thank You',
                    txt: 'Thank You Morrrr!'
                }
            },
            {
                id: 'n105',
                type: 'NoteTodos',
                isPinned: false,
                info: {
                    title: 'Things to do after sprint',
                    todos: [
                        { txt: 'Eat', doneAt: 187111111, id: utilService.makeId(4) },
                        { txt: 'Sleep', doneAt: 187111111, id: utilService.makeId(4) },
                        { txt: 'Listen to careless whisper ;)', doneAt: null, id: utilService.makeId(4) }
                    ]
                }
            },
            {
                id: 'n106',
                type: 'NoteAudio',
                isPinned: false,
                isTrash: false,
                info: {
                    title: 'Some trance music',
                    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'
                }
            },
            {
                id: 'n107',
                type: 'NoteAudio',
                isPinned: false,
                isTrash: true,
                info: {
                    title: 'Some more trance music',
                    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3'
                }
            },
            // {
            //     id: 'n109',
            //     type: 'NoteMap',
            //     isPinned: false,
            //     isTrash: false,
            //     info: {
            //         title: 'New York',
            //         coords: { lat: 40.7128, lng: -74.0060 } // Coordinates for New York
            //     }
            // },
            // {
            //     id: 'n108',
            //     type: 'NoteRecording',
            //     isPinned: false,
            //     isTrash: false,
            //     info: {
            //         title: 'שמש 😎',
            //         url: 'https://on.soundcloud.com/PpofSQgpkVNAUa8Y6'
            //     }
            // },
            // {

        ]
        storageService.saveToStorage(NOTE_KEY, notes)
    }
}

function _createnote(vendor, maxSpeed = 250) {
    const note = getEmptynote(vendor, maxSpeed)
    note.id = utilService.makeId()
    return note
}




function getSpeedStats() {
    return asyncStorageService.query(NOTE_KEY)
        .then(notes => {
            const noteCountBySpeedMap = _getnoteCountBySpeedMap(notes)
            const data = Object.keys(noteCountBySpeedMap).map(speedName => ({ title: speedName, value: noteCountBySpeedMap[speedName] }))
            return data
        })

}

function getVendorStats() {
    return asyncStorageService.query(NOTE_KEY)
        .then(notes => {
            const noteCountByVendorMap = _getnoteCountByVendorMap(notes)
            const data = Object.keys(noteCountByVendorMap)
                .map(vendor =>
                ({
                    title: vendor,
                    value: Math.round((noteCountByVendorMap[vendor] / notes.length) * 100)
                }))
            return data
        })
}


function _getnoteCountBySpeedMap(notes) {
    const noteCountBySpeedMap = notes.reduce((map, note) => {
        if (note.maxSpeed < 120) map.slow++
        else if (note.maxSpeed < 200) map.normal++
        else map.fast++
        return map
    }, { slow: 0, normal: 0, fast: 0 })
    return noteCountBySpeedMap
}

function _getnoteCountByVendorMap(notes) {
    const noteCountByVendorMap = notes.reduce((map, note) => {
        if (!map[note.vendor]) map[note.vendor] = 0
        map[note.vendor]++
        return map
    }, {})
    return noteCountByVendorMap
}

function togglePin(noteId) {
    return get(noteId).then(note => {
        note.isPinned = !note.isPinned;
        return save(note);
    });
}

function duplicate(noteId) {
    return get(noteId).then(note => {
        const { id, ...noteWithoutId } = note;  // Destructure to exclude the `id` property
        const duplicatedNote = {
            ...noteWithoutId,
            createdAt: Date.now(),
            isPinned: false // Assuming you want the duplicated note to not be pinned by default
        };
        console.log(duplicatedNote);
        return save(duplicatedNote).then(savedDuplicatedNote => {
            return savedDuplicatedNote;
        });
    });
}

function saveMailNote(text, subject) {
    const note = {
        createdAt: Date.now(),
        type: 'NoteTxt',
        isPinned: false,
        style: {
            backgroundColor: '#c4d6e4'
        },
        info: {
            title: subject,
            txt: text
        }
    }

    save(note)
}