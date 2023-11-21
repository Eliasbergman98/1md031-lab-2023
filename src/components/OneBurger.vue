<template>
    <div> 
      <div class="box c">
        <h1> <span id="idname">{{burger.name}}</span></h1>
          <img class="burgare" v-bind:src="burger.img" alt="view">
            <ul>
              <li>Calories: {{ burger.kCal }}</li>
              <li>Contain gluten: {{ burger.gluten }}</li>
              <li>Contain lactose: {{ burger.lactose }}</li>
              {{ amountOrdered }}
              <button type="increase" v-on:click="increaseburger()">
              <img src="../../public/img/plussign.jpg" style="width: 20px;">
              </button>
              <button type="decrease" v-on:click="decreaseburger()">
              <img src="../../public/img/minussign.jpg" style="width: 20px;">
              </button>
              <button v-on:click="addburger">Add to order</button>
            </ul>
      </div>
    </div>
  </template>
  
  <script>
import { isInDestructureAssignment } from '@vue/compiler-core';

  export default {
    name: 'OneBurger',
    props: {
      burger: Object
    },
    data: function () {
    return {
    amountOrdered: 0,
    orderedBurger: 0,   
  }
},
methods: {
  addburger: function(){
    this.$emit('orderedBurger', { name:   this.burger.name, 
                                amount: this.amountOrdered 
                              })
                              console.log(this.amountOrdered)
                              this.amountOrdered = 0;
  },

  increaseburger: function(){
    this.amountOrdered +=1;
  }

  ,
  decreaseburger: function(){
    if (this.amountOrdered != 0){
      this.amountOrdered -= 1;
    }
  }
}

  }
  
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
  .box {
    color: black;
    border-radius: 5px;
    padding: 20px;
    font-size: 150%;
}

.burgare{
    padding: 1em;
    margin: 1em;
    background-color: white;
    font-family: 'Times New Roman', Times, serif;
    width: 12em;
    height: 10em;
}
.Burgerinfo,.contactinfo{
    margin: 2em;
    padding-left:2em;
    border: 1em solid blue;
    border-style: dotted;
    margin-top: 2em;
}
#idname{
    text-align: left;
    font-size: 0.6em;
    padding: 1em;
    margin: 1em;
    text-transform: uppercase;
}
  
  </style>
  