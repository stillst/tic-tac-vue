<template lang="pug">
  td.cell
    button.btn(@click="strike") {{ mark }}

</template>

<script>
export default {
  props: ['name'],
  data () {
    return {
      frozen: false,
      mark: ''
    }
  },
  methods: {
    strike(){
      if(!this.frozen){
        this.mark = this.$parent.activePlayer;
        this.frozen = true;
        Event.$emit('strike', this.name)
      }
    }
  },
  created(){
    Event.$on('gameEnd', () => this.frozen = true)
    Event.$on('clearCells', () => {
      this.frozen = false;
      this.mark = '';
      console.log("Htcnfhn!")
    })
  }
}
</script>

<style lang="scss">
  .cell {
    width: 33.33%;
  }

  .btn {
      width: 100%;
      height: 100%;

      border: 1px solid #000;
      cursor: pointer;
      transition: background-color 0.4s;

      &:hover {
        background-color: rgba(0,0,0,0.3);
      }
  }
</style>
