const fs  = require('fs')
const chalk = require('chalk')

const getNotes = ()=> { 
    console.log(chalk.blue.inverse('Notes boi!!'))
    loadNotes().forEach(note => {
        console.log(note.title)
    });
}

const readNote = (title)=> { 
    const notes = loadNotes()
    const Note = notes.filter((note)=>note.title === title)

    if(Note.length !== 0){
        Note.forEach(note=>{
            console.log('Title: ' + note.title)
            console.log('Body: ' + note.body)
        })
    }
    else{
        console.log(chalk.red.inverse('no note'))
    }
}

const addNote = (title, body)=>{
    const notes = loadNotes()
    //const duplicateNotes = notes.filter((note) => note.title === title)
    const duplicateNote = notes.find((note) => note.title === title)

    debugger

    if(!duplicateNote){
        notes.push({
            title : title,
            body : body
        })
        saveNotes(notes)
        console.log(chalk.green.inverse('success'))
    }
    else{
        console.log(chalk.red.inverse('duplicate'))
    }
}

const removeNote = (title)=>{

    // or use attay.filter to get all the notes whose titles dont match the title and then save that object
    // can check if a notes i removed by comparing the arrray sizre of the new object with the loaded notes

    const notes = loadNotes()
    let idx = -1
    for(let i=0;i<notes.length;i++){
        if(notes[i].title===title){
            idx = i;
            break;
        }
    }

    if(idx != -1 ){
        notes.splice(idx)
        saveNotes(notes)
        console.log(chalk.green.inverse('success'))
    }
    else{
        console.log(chalk.red.inverse('no key'))
    }

}

const saveNotes = (notes)=>{
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json',dataJSON)
}

const loadNotes = ()=>{
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (e) {
        return []
    }

}

module.exports = {
    getNotes : getNotes,
    addNote: addNote,
    removeNote : removeNote,
    readNote : readNote
}