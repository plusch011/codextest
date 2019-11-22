export default class FileManager extends FileReader {
  constructor(cb) {
    super();
    this.onload = cb;
  }

  saveFileAsTxt(text) {
    const file = new Blob([text], {type: 'txt'});

    const a = document.createElement("a"),

    url = URL.createObjectURL(file);
    a.href = url;
    a.download = 'output';
    document.body.appendChild(a);
    a.click();

    setTimeout(function() {
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }, 0);
  }
}