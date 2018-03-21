/**
* @param {object} xlsx Обьект, созданный при помощи функции sheet_to_json
* @return {object} parsedArray
*/
const parseXLSJSONToObject = (xlsx) => {
  let parsedArray = [];
  for (let i = 1; i < xlsx.length; i++) {
    let parsedObject = {};
    for (let j in xlsx[i]) {
      Object.defineProperty(parsedObject, xlsx[0][j], {
        get() {
          return xlsx[i][j];
        }
      })
    }
    parsedArray.push(parsedObject)
  }

  return parsedArray;
}

export {
  parseXLSJSONToObject
}
