<template>
  <div className="flex flex-col w-full h-full items-center justify-center">
    <img alt="Vue logo" class="w-fit" src="./assets/logo.png">
    <h1>Project name</h1>
    <h1 class="text-xl font-bold">{{AppName}}</h1>

    <div class="flex flex-col space-y-4 my-4">
      <button class="bg-green-500 text-white px-4 py-2 rounded-lg">Learn about Vue 3</button>
      <button class="bg-cyan-500 text-white px-4 py-2 rounded-lg">Learn about Electron</button>
    </div>

    <p>If you Elecrue help you, then please consider starring it on <a className="underline font-bold text-green-500" href="https://github.com/RajvirSingh1313/Elecrue">github</a></p>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      AppName: []
    }
  },
  methods: {
    async getAppDetail() {
      this.AppName = await window.electronAPI.getAppDetails();
    }
  },
  mounted() {
    this.getAppDetail()
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
