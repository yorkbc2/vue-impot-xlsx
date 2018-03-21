<template>
  <div :class="isError === true? 'input-file input-file--error': 'input-file'">
    <input type="file" id="input-file--control" class='input-file--control' v-on:change="onload">
    <label class='input-file--label' for="input-file--control">
      <span>{{title}}</span>
    </label>
  </div>
</template>

<script>
  export default {
    name: "InputFile",
    props: ['title', 'onload', 'isError']
  }
</script>

<style scoped>
  .input-file {
    position: relative;
    width: 640px;
    height: 100px;

    background-color: #e0ffff;
    padding: 15px;

    margin: 10px auto;
  }

  .input-file.input-file--error {
    background-color: #add6e5;
  }

  .input-file--control {
    position: absolute;
    opacity: 0;

    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    cursor: pointer;

    z-index: 2;
  }

  .input-file--label {
    position: relative;
    border: 2px dashed #777777;
    width: 100%;
    height: 100%;

    display: block;
  }

  .input-file--label span {
    position: absolute;
    left: 50%;
    top: 50%;

    font-family: "Helvetica", sans-serif;
    font-size: 16px;
    color: #777777;
    width: 280px;
    text-align: center;

    transform: translateY(-50%) translateX(-50%);
  }
</style>
