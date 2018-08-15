<template lang="pug">
  #app
    .scoreBoard
      span 0 победил {{ wins.O }} раз
      span Матч №{{ matches }}
      span X победил {{ wins.X }} раз
    h1 Крестики-нолики
    board

</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      matches: 1,
      wins: {
        O: 0,
        X: 0,
      }
    }
  },
  created(){
    Event.$on('gameEnd', (winner) => {
      this.isFinish = true;
      if (winner != 'draw') {
        this.wins[winner]++
      }
    })
    Event.$on('restart', () => {
      this.isFinish = false;
      this.matches++;
    })
  }
}
</script>

<style lang="scss">
  #app {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    color: #2c3e50;
    width: 400px;
    margin: 0 auto;
    padding-bottom: 30px;
    border: 1px solid #000;
  }

  .scoreBoard {
    display: flex;
    justify-content: space-around;
    background-color: #3498db;
    color: #fff;
    padding: 10px 0;
  }

</style>
