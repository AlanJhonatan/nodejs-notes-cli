const repository = require('./repository');

const notesData = repository.loadNotes();
const notes = [ ...notesData ];

const add = {
  command: 'add',
  describe: 'Add a new note',
  builder: {
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string',
    },
    body: {
      describe: 'Note body',
      demandOption: true,
      type: 'string',
    },
  },
  handler: function (argv) {
    let { title, body } = argv;
    notes.push({ id: notes.length + 1, title, body });

    console.log("😀 New note created !");
    repository.saveNotes(notes);
  }
}

const remove = {
  command: 'remove',
  describe: 'Remove a note',
  builder: {
    id: {
      describe: 'Note Id to delete',
      demandOption: true,
      type: 'number'
    }
  },
  handler: function (argv) {
    let { id } = argv;

    let noteIdx = notes.findIndex(note => note.id === id)

    if(noteIdx <= 0) {
      console.log("🤒 This note Id wasn't found.");
      return;
    }

    notes.splice(noteIdx);
    console.log("😀 Notes was updated sucessfully !");

    repository.saveNotes(notes);
  }
}

const list = {
  command: 'list',
  describe: 'List all notes',
  handler: function () {
    console.log(`😎 All notes (${notes.length} in total):`);
    console.table(notes);
  }
}

const read = {
  command: 'read',
  describe: 'Read an choosen note',
  builder: {
    id: {
      describe: 'Id to read',
      demandOption: true,
      type: 'number',
    },
  },
  handler: function (argv) {
    let { id } = argv;

    let note = notes.find(note => note.id === id);

    if(!note) {
      console.log("🤨 This note wasn't found.")
      return;
    }

    console.log('Reading a note:');
    console.table(note);
  }
}

module.exports = { add, remove, list, read };