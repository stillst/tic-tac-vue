<template lang="pug">
  #app
    .details
      h1 Tic Tac Toe
      .scoreBoard
        span 0 победил {{ wins.O }} раз
        span X победил {{ wins.X }} раз
        span Матч №{{ matches }}
    board

</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      matches: 0,
      wins: {
        O: 0,
        X: 0,
      }
    }
  },
  created(){
    Event.$on('gameEnd', (winner) => {
      this.matches++;
      if (winner != 'draw') {
        this.wins[winner]++
      }
    })
  }
}
</script>

<style lang="scss">
  #app {
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
