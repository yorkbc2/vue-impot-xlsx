/**
* @param {number} fileSize Размер файла
* @return {number} Размер файла уже в МБ
*/
const calculateFileSize = (fileSize) => {
  return (fileSize / 1024) / 1024;
}
/**
* @param {File} file Файл для получения данных
* @return {*}
*/
const readDataFromFile = (file) => {
  return new Promise((resolve, reject) => {
    var fileReader = new FileReader();

    fileReader.onload = function (event) {
      if (event.target.readyState === 2) {
        resolve(event.target.result);
      }
    }

    fileReader.readAsBinaryString(file)
  })
}

export {
  calculateFileSize,
  readDataFromFile
};
