<template>
  <div id="app">
    <my-canvas/>
  </div>
</template>

<script>
import MyCanvas from '@/components/MyCanvas';
export default {
  name: 'app',
  components: {
    MyCanvas
  }
};
</script>

<style>
#app {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
