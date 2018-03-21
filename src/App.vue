<template>
  <div id="app">
    <InputFile v-bind:is-error="isError" v-bind:title="label" v-bind:onload="fileOnLoad" />
  </div>
</template>

<script>
import InputFile from "./components/InputFile.vue"
import XLSX from "xlsx"
import {calculateFileSize, readDataFromFile} from "./modules/fileModule.js"
import {parseXLSJSONToObject} from "./modules/xlsxModule.js"

export default {
  name: 'App',
  components: {
    InputFile
  },
  data: function () {
    return {
      label: "",
      labels: {
        startLabel: "Перетащите сюда файл или нажмите чтобы выбрать",
        successLabel: 'Файл - "?"',
        sizeError: "Допустимый размер файла 10Мб, выберите другой файл",
        extensionError: 'Недопустимый тип файла "?", выберите другой файл'
      },
      isError: false
    }
  },
  methods: {
    /**
    * @param {Event} event Событие, которое передает onChange
    */
    fileOnLoad(event) {
      // Берем файл, который загрузил клиент
      let uploadedFile = event.target.files[0];
      // Размер файла в МБ
      let size = calculateFileSize(uploadedFile.size);
      if (size > 10) {
        this.toggleIsError(true)
        this.label = this.labels.sizeError;
        return false;
      }
      // Розрываем название файла, чтобы получить его расширение
      let splittedName = uploadedFile.name.split('.'),
          // Получаем последний элемент массива
          splittedNameLastElement = splittedName[splittedName.length - 1];
      // Проверяем расширение файла
      if (splittedNameLastElement !== 'xls' && splittedNameLastElement !== 'xlsx') {
        this.toggleIsError(true)
        // Ошибка об неправильном расширении файла
        this.label = this.labels.extensionError
                            .replace('?', '.' + splittedNameLastElement.toLowerCase())
        return false;
      }
      this.toggleIsError(false)
      // Оповещение об успешной валидации файла
      this.label = this.labels.successLabel.replace("?", uploadedFile.name);
      // Прочитка файла с помощью функции с модуля fileModule
      readDataFromFile(uploadedFile).then((response /*:object*/) => {
        // Читаем данные, которые хранятся в файле
        let xlsxData = XLSX.read(response, {type: 'binary'});
        // Парсим в JSON формат
        let xlsxDataJSON = XLSX.utils.sheet_to_json(xlsxData.Sheets[xlsxData.SheetNames[0]], {header: 1});
        // Парсим JSON в тот формат, который нам нужен
        let parsedData = parseXLSJSONToObject(xlsxDataJSON)
        // Вывод данных
        console.log("import result", parsedData)
      })},
    // Изменяет значение свойства isError на указаное
    /**
    * @param {boolean} isError
    */
    toggleIsError(isError) {
      this.isError = isError || false;
    }
  },
  mounted() {
    this.label = this.labels.startLabel;
  }
}
</script>
