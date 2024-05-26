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
    getSpeedStats,
    getVendorStats,
    getFilterFromSearchParams,
    togglePin,
    duplicate,
}
// For Debug (easy access from console):
// window.cs = noteService

function query(filterBy = {}) {
    console.log(filterBy)
    return asyncStorageService.query(NOTE_KEY)
        .then(notes => {
            if (filterBy.search) {
                const regExp = new RegExp(filterBy.search, 'i')
                notes = notes.filter(note => regExp.test(note.info.txt || note.info.title))

            }

            if (filterBy.type) {
                notes = notes.filter(note => note.type === filterBy.type);
            }



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
        search: searchParams.get('search') || '',
        type: searchParams.get('type') || '',
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
        console.log('hi');
        const notes = [
            {
                id: 'n105',
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
                id: 'n103',
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
                id: 'n102',
                createdAt: 1112222,
                type: 'NoteTxt',
                isPinned: false,
                style: {
                    backgroundColor: '#c4d6e4'
                },
                info: {
                    txt: 'Thank You Morrrr!'
                }
            },
            {
                id: 'n104',
                type: 'NoteTodos',
                isPinned: false,
                info: {
                    title: 'Things to do after sprint',
                    todos: [
                        { txt: 'Eat', doneAt: null },
                        { txt: 'Sleep', doneAt: 187111111 },
                        { txt: 'Listen to careless whisper', doneAt: null }
                    ]
                }
            }

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