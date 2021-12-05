const fs = require('fs');

const loadNotes = function () {
  try {
    let fileBuffer = fs.readFileSync('./data/notes.json');
    let parsedData = fileBuffer.toString();
    let json = JSON.parse(parsedData);
    return json;
  } catch (error) {
    if (error.code === 'ENOENT') {
      console.log('Erro: O arquivo está vazio, ou não existe');
      return [];
    }

    console.log(error);
  }
}

const saveNotes = function (data) {
  try {
    let parsedData = JSON.stringify(data, null, 2);
    fs.writeFileSync('./data/notes.json', parsedData, { flag: 'w'} );
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  loadNotes,
  saveNotes
}