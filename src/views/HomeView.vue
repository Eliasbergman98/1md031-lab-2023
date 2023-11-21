<template>
<body>
    <header>
        <h1>Välkommen till BurgerOnline</h1>
    </header>
    <main>
        <section class="Burgerinfo">
            <h1>Select burger</h1>
            <p> This is where you execute burger selection</p>
            <div class="wrapper">
              <Burger v-for="burger in burgers"
              v-bind:burger="burger"
              v-bind:key="burger.name"
              v-on:orderedBurger="addToOrder($event)"/>

            </div>
        </section>
        <section id="contact" class="contactinfo">
            <h1>Customer information</h1>
            <form>
                <p>
                    <label for="firstname and lastname">First and lastname</label><br>
                    <input type="text" id="fullname" v-model="fnln" required="required"
                        placeholder="Enter name">
                </p>
                <p>
                    <label for="email">E-mail adress</label><br>
                    <input type="email" id="emailadress" v-model="em" placeholder="Enter email">
                </p>
                <p>
                    <label for="Payment">Payment-method  </label>

                    <select v-model="payment">
                      <option value="Klarna">Klarna</option>
                      <option value="Visa">Visa</option>
                      <option value="Mastercard" selected>Mastercard</option>
                      <option value="Cash">Cash</option>
                    </select>

                </p>
                <p style="display:inline-block;">
                  <label for="gender"> Gender </label> <br>
                    <label>
                      <input type="radio" name="gender" v-model="gender" value="male"> Male
                    </label>

                    <label>
                      <input type="radio" name="gender" v-model="gender" value="female" checked> Female
                    </label>

                    <label>
                      <input type="radio" name="gender" v-model="gender" value="other" > Do not wish to provide
                    </label>
                </p>
                <div id="outermap">
                  <div id="innermap" v-on:click="setLocation">
                    <div id="dots">
                     <div v-bind:style="{ left: location.x + 'px', top: location.y + 'px'}">
                      +
                     </div>
                    </div>
                  </div>
                </div>
                <p>
                <button v-on:click="markDone">
                    <img src="img/deliverfood.jpg">
                    <br>
                    Submit your order
                </button>
                </p>
                
            </form>


        </section>
    </main>
    <footer>
        <hr>
        <p>2018 Hypothetical burgers</p>
    </footer>
</body>
</template>

<script>
import Burger from '../components/OneBurger.vue'
import io from 'socket.io-client'
import menu from '../asset/menu.json'

const socket = io();

// function MenuItem(kCal,burgername,img,gluten,lactose) {
//   this.kCal = kCal;
//   this.name = burgername;
//   this.img = img;
//   this.gluten = gluten;
//   this.lactose = lactose;
// }

// var item1 = new MenuItem(500,"Bjassen","img/burger1.jpg",true,false);
// var item2 = new MenuItem(600,"jon","img/burger2.jpg",true,false);
// var item3 = new MenuItem(700,"Thor","img/burger3.jpg",false,false);

// let items = [item1,item2,item3];
// console.log(items);


export default {
  name: 'HomeView',
  components: {
    Burger
  },
  data: function () {
    return {
      orderedBurger: {},
      burgers: menu,
      fnln:'',
      gender:'',
      payment:'',
      em:'',
      ad:'',
      hs:'',
      location: { x: 0,
            y: 0
          }
    }
  },
  methods: {
    getOrderNumber: function () {
      return Math.floor(Math.random()*100000);
    },

    addOrder: function (event) {
      this.fullname,
      this.emailadress
      var offset = {x: event.currentTarget.getBoundingClientRect().left,
                    y: event.currentTarget.getBoundingClientRect().top};
      this.location.x = event.clientX - 10 - offset.x;
      this.location.y = event.clientY - 10 - offset.y;
    },
    setLocation: function(event){
      this.location.x = event.clientX - 10 - event.currentTarget.getBoundingClientRect().left;
      this.location.y = event.clientY - 10 - event.currentTarget.getBoundingClientRect().top;
      console.log(this.location.x)
      console.log(this.location.y)
    },
    addToOrder: function(event){
      this.orderedBurger[event.name] = event.amount;
    },
    markDone: function(){
      socket.emit("addOrder", { orderId: this.getOrderNumber(),
                                details: { x: this.location.x,
                                           y: this.location.y },
                                orderItems: this.orderedBurger,
                                customerInformation: {
                                  name: this.fnln,
                                  emailAdress: this.emailAdress
                                }
                                ///skapa för customer
                              
                              })
                             

    
    }
  }
}
</script>

<style>
    #test12{
      overflow:hidden;

    }

  #outermap{
    width: 100%;
    height: 50vh;
    overflow: scroll;
  }

  #innermap{
    background-image: url("../../public/img/polacks.jpg");
    position: relative;
    width: 1920px;
    height: 1078px;
    cursor: pointer;

  }


  #map {
    width: 300px;
    height: 300px;
    background-color: red;
  }
  .body{
    font-family: 'Times New Roman', Times, serif;
}

section{
    margin-top: 2em;
}

#idname{
    text-align: left;
    font-size: 0.6em;
    padding: 1em;
    margin: 1em;
    text-transform: uppercase;
}

header{
    margin: 2em;
    background-image: url("../../public/img/header.jpg");
    height: 10em;
    background-size:cover;
    
    font-size: 2em;
    text-align: center;
    padding-top: 3em;
    color: white;
}

.burgare{
    padding: 1em;
    margin: 1em;
    background-color: white;
    font-family: 'Times New Roman', Times, serif;
    width: 12em;
    height: 10em;
}

.contactinfo{
    background-color: black;
    color: white;
}
button{
    margin: 2em;
}
button:hover{
    cursor: pointer;
    background-color: red;
}
.Burgerinfo,.contactinfo{
    margin: 2em;
    padding-left:2em;
    padding-right: 2em;
    border: 1em solid blue;
    border-style: dotted;

}
.wrapper{
    font-size: 1em;
    display: grid;
    grid-gap: 10px;
    grid-template-columns: repeat(3,1fr);
    color: #444; 
}

.box {
    color: black;
    border-radius: 5px;
    padding: 20px;
    font-size: 150%;
}
#dots {
    position: relative;
    margin: 0;
    padding: 0;
    background-repeat: no-repeat;
    width:1920px;
    height: 1078px;
    cursor: crosshair;
  }
  
  #dots div {
    position: absolute;
    background: black;
    color: white;
    border-radius: 10px;
    width:20px;
    height:20px;
    text-align: center;
  }

</style>