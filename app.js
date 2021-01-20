const chalk = require('chalk')
//const { command, describe, demandOption, string } = require('yargs')
const yargs = require('yargs')
const notes = require('./notes.js')

//console.log(process.argv)

yargs.version('1.1.0')
//Add, remove, read and list out notes

//Create add command
yargs.command({
    command : 'add',
    describe : 'add a new note',
    builder : {
        title : {
            description : 'note title',
            demandOption : true,
            type : 'string'
        },
        body : {
            description : 'note body',
            demandOption : true,
            type : 'string'
        }
    },
    handler(argv){
        notes.addNote(argv.title,argv.body)
    }
})

//Create remove command
yargs.command({
    command : 'remove',
    describe : 'remove a note',
    builder : {
        title : {
            description : 'note title',
            demandOption : true,
            type : 'string'
        }
    },
    handler(argv){
        notes.removeNote(argv.title)
    }
})

//Create read command
yargs.command({
    command : 'read',
    describe : 'read a note',
    builder : {
        title : {
            description : 'note title',
            demandOption : true,
            type : 'string'
        }
    },
    handler(argv){
        notes.readNote(argv.title);
    }
})

//Create list command
yargs.command({
    command : 'list',
    describe : 'listing the notes',
    handler(){
        notes.getNotes();
    }
})

yargs.parse()

//console.log(yargs.argv)