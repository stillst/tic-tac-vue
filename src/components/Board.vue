<template lang="pug">
  .grid
    p {{ gameStatusMessage }}
    p Ходы {{ moves }}
    table.board
      tr
        cell(name="1")
        cell(name="2")
        cell(name="3")
      tr
        cell(name="4")
        cell(name="5")
        cell(name="6")
      tr
        cell(name="7")
        cell(name="8")
        cell(name="9")
    button.restart(@click="restart") restart
</template>

<script>
export default {
  data () {
    return {
      activePlayer: 'O',
      gameStatus: 'begining',
      moves: 0,
      cells: {
        1: '', 2: '', 3: '', 4: '', 5: '', 6: '', 7: '', 8: '', 9: ''
      },
      winConditions: [
        [1,2,3],[4,5,6],[7,8,9],
        [1,4,7],[2,5,8],[3,6,9],
        [1,5,9],[3,5,7]
      ]
    }
  },
  methods: {
    changePlayer(){
      this.activePlayer = this.nonActivePlayer;
    },
    checkForWin(){
      for (let i = 0; i < this.winConditions.length; i++){
        const values = [];

        this.winConditions[i].forEach((winNumber) =>{
          values.push(this.cells[winNumber])
        })

        if (values[0] !== "" && values.every((val, i, arr) =>  val === arr[0]) ){
          return true;
        }
      }

      return false;
    },
    changeGameStatus(){
      if(this.checkForWin()){
        this.gameStatus = 'win';
        Event.$emit('gameEnd', this.activePlayer);
      }
      else if (this.moves == 9) {
        this.gameStatus = 'draw';
        Event.$emit('gameEnd', 'draw');
      }
      else{
        this.gameStatus = `turn`;
      }
    },
    restart(){
      Object.assign(this.$data, this.$options.data());
      Event.$emit('clearCells');
    }
  },
  computed: {
    nonActivePlayer(){
      if (this.activePlayer == 'O'){
        return 'X'
      }
      return 'O'
    },
    gameStatusMessage(){
      switch(this.gameStatus){
        case 'begining':
        return `Начало игры, ход игрока ${this.activePlayer}`

        case 'turn':
        return `Ход игрока ${this.activePlayer}`

        case 'draw':
        return `Ничья`

        case 'win':
        return `Победил игрок ${this.nonActivePlayer}`
      }
    }
  },
  watch: {
    gameStatus: function(newGameStatus){
      console.log(newGameStatus)
      if (newGameStatus === 'win'){
        this.gameStatusColor = 'statusWin'
      }
      else if (newGameStatus === 'draw'){
        this.gameStatusColor = 'statusDraw'
      }
      else{
        console.log(`Сообщение ${this.gameStatusMessage}`)
      }
    }
  },
  created() {
    Event.$on('strike', (cellNumber) =>{
      this.cells[cellNumber] = this.activePlayer
      this.moves++
      this.changeGameStatus()
      this.changePlayer()
    })
  },
}
</script>

<style lang="scss">
  .board {
    margin: 0 auto;
    border: 1px solid #000;
    width: 300px;
    height: 300px;
    margin-bottom: 5px;
  }

  .restart{
    width: 300px;
    height: 40px;
    border: 1px solid #000;
    cursor: pointer;
    font-size: 20px;
    transition: background-color 0.4s;
    background-color: #2ecc71;
    color: #fff;

    &:hover {
      background-color: #27ae60;
    }
  }
</style>
