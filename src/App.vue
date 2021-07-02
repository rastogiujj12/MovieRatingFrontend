<template>
  <div id="app">
    <b-loading :is-full-page="true" v-model="isLoading" :can-cancel="false"></b-loading>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  created() {
    this.$store.dispatch('autoLogin');
  },
  computed:{
    isLoading(){
      return this.$store.getters.isLoading || false;
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 20px;
}
.field{
  min-width: 250px;
}
</style>
