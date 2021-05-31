export function readFile(file, cb) {
  // eslint-disable-next-line no-undef
  var reader = new FileReader();
  reader.onload = () => {
    try {
      cb(JSON.parse(reader.result), file.name);
    } catch (e) {
      cb(undefined, undefined, e.message);
    }
  };
  return reader.readAsText(file);
}

export function uploadFile(items, index) {
  const file = items[index].getAsFile();
  readFile(file, this.printFile);
}

export function uploadDirectory(item) {
  var dirReader = item.createReader();
  const print = this.printFile;
  dirReader.readEntries(function (entries) {
    for (let j = 0; j < entries.length; j++) {
      let subItem = entries[j];
      if (subItem.isFile) {
        subItem.file((file) => {
          readFile(file, print);
        });
      }
    }
  });
}

export function chooseDirectory(e) {
  const files = e.target.files;
  if (files) {
    for (let i = 0; i < files.length; i++) {
      if (files[i].type === "application/json") {
        readFile(files[i], this.printFile);
      }
    }
  }
}
