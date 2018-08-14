

let die1;
let die2;
let sumDices;
var turn = 0;
var currentCell;
var currentPlayer;
var nextPlayer;
var numberOfPlayers;
var currentChanceCard;
var currentCommunityChest;


const Player = function (piece, name, color, turn, piece) {
  this.cell = 0;
  this.name = name;
  this.piece = piece;
  this.color = color;
  this.money = 1500;
  this.inJail = false;
  this.property = [];
  this.getOutOfJail = false;
  this.turn = turn;
  this.position = 0;
}

const players = {};
const pieces = ['hat', 'show', 'iron'];

$(document).ready(function() {

  $('#player-number').change(function() {
      var numberOfPlayers = $("#player-number").val();
      if (numberOfPlayers === '2'){
          $( `#player-${1}-input, #player-${2}-input`).css("display", "block");
          $(`#player-${3}-input, #player-${4}-input`).css("display", "none");
      } else if (numberOfPlayers === '3'){
          $(`#player-${3}-input, #player-${1}-input, #player-${2}-input`).css("display", "block");
          $(`#player-${4}-input`).css("display", "none");
      } else if (numberOfPlayers === '4'){
          $(`#player-${3}-input, #player-${1}-input, #player-${2}-input, #player-${4}-input`).css("display", "block");
      }
  })

  $(".start-game").click(function(){
    startGame()
    console.log(players);
  })

  $( ".roll-dice" ).click(function() { 
    rollDice();
    //update dices
    die1Val();
    die2Val();

    if (players.player1.turn){
      var currentPlayer = players.player1;
      var nextPlayer = players.player2;
      console.log('the current player is: ' + currentPlayer.name)
    } else if (players.player2.turn) {
      var currentPlayer = players.player2;
      var nextPlayer = players.player1;
      console.log('the current player is: ' + currentPlayer.name)
    }

    //updating the player position
    let tempPosition = currentPlayer.position;
    currentPlayer.position = (sumDices + tempPosition);

    //check if you made a whole trip
    if ( currentPlayer.position > 39 ) {
        currentPlayer.position = currentCell.position - 40;
    }
    currentCell = board[currentPlayer.position]

    $(`.${currentPlayer.piece}`).detach().appendTo(`#cell-${currentPlayer.position}`);    
    alert("" + die1 + " " + die2);

    if(currentCell.type === "property"){
      appendUpdatesProperty()

      $(".buy-property").click(  function( ) {
        buyProperty(currentPlayer, currentCell)
        $(`#cell-${currentPlayer.position} > .cell-color`).css("background-color", `${currentPlayer.color}`)
      })

    } else if (currentCell.type === "chance"){
      //invoke the chance function 
      appendUpdatesRest()
      chance(currentPlayer);
    } else if (currentCell.type === 'tax'){
      //invoke the tax function
      appendUpdatesRest()
    } else if (currentCell.type === "community"){
      appendUpdatesRest()
      communityChest(currentPlayer)
    } else {
      appendUpdatesRest();
    }

    $(".end-turn").click( function() {
      currentPlayer.turn = false;
      nextPlayer.turn = true;
      die1 = 0; die2 = 0;
      $(".cell-information").detach();
      die1Val();
      die2Val();
    })
  });
});


    

const rollDice = function () {
  die1 = Math.floor( Math.random() * 6 ) + 1;
  die2 = Math.floor( Math.random() * 6 ) + 1;
  sumDices = die1 + die2;
  //sumDices =  5;
}

const buyProperty = function(player, cell){
  if(cell.type === 'property' && !cell.owned && player.money > cell.price){
    cell.owned = player.piece.slice(0,7);
    player.money -= cell.price;
    player.property.push( cell )
    //appendFacilityProperty(player);
  } else if (cell.type === 'property' && cell.owned){
    console.log('property is owned by another player play rent')
    player.money -= cell.rent[0]
  }
  console.log(cell, player)
}

const startGame = function(){
  numberOfPlayers = $("#player-number").val();
  var player11 = new Player ('hat', $(`#player-1-name`).val(), $(`#player-1-color`).val(), true, 'player1-piece')
  var player22 = new Player ('car', $(`#player-2-name`).val(), $(`#player-3-color`).val(), false, 'player2-piece')
  players.player1 = player11
  players.player2 = player22
  $("#setup").css("display", "none");
  $(".page-view").css("display", "block");
}

const buyFacilityProperty = function(player, cell){

}

const die1Val = function () {
  if( die1 === 1 ) {
    $("#number-11").css("display", "block")
  } else if ( die1 === 2 ) {
    $("#number-21, #number-31").css("display", "block")
  } else if ( die1 === 3) {
    $("#number-11, #number-41, #number-51").css("display", "block")
  }  else if ( die1 === 4) {
    $("#number-41, #number-61, #number-51, #number-71").css("display", "block")
  }   else if ( die1 === 5) {
    $("#number-11, #number-41, #number-61, #number-51, #number-71").css("display", "block")
  }  else if ( die1 === 6) {
    $("#number-21, #number-31, #number-41, #number-61, #number-51, #number-71").css("display", "block")
  } else if ( die1 === 0 ) {
    $("#number-11, #number-21, #number-31, #number-41, #number-61, #number-51, #number-71").css("display", "none")
  } 
}

const die2Val = function () {
  if( die2 === 1 ) {
    $("#number-12").css("display", "block")
  } else if ( die2 === 2 ) {
    $("#number-22, #number-32").css("display", "block")
  } else if ( die2 === 3) {
      $("#number-12, #number-42, #number-52").css("display", "block")
  }  else if ( die2 === 4) {
      $("#number-42, #number-62, #number-52, #number-72").css("display", "block")
  }  else if ( die2 === 5) {
      $("#number-12, #number-42, #number-62, #number-52, #number-72").css("display", "block")
  }  else if ( die2 === 6) {
      $("#number-22, #number-32, #number-42, #number-62, #number-52, #number-72").css("display", "block")
  } else if ( die2 === 0 ) {
    $("#number-12, #number-22, #number-32, #number-42, #number-62, #number-52, #number-72").css("display", "none")
  } 
}

const appendUpdatesProperty = function() {
  $(".game-updates")
                    .append( 
                      `
                      <div class="cell-information">
                        <p>${currentCell.name}</p>
                        <p>Price: ${currentCell.price}</p>
                        <p>Rent: ${currentCell.rental}</p>
                        <div class="action-buttons">
                          <button class="buy-property">Buy Property</button>
                          <button class="bid-prperty">Bid Property</button>
                        </div>
                        <button class="end-turn">End Turn</button>
                      </div> 
                      `
                    )
}

const appendUpdatesRest = function() {
  $(".game-updates")
                    .append( 
                      `
                      <div class="cell-information">
                        <p>${currentCell.name}</p>
                        <button class="end-turn">End Turn</button>
                      </div> 
                      `
                    )
}

const appendFacilityProperty = function(player) {
  $(`#cell-${player.position}`).css("background-color", `${player.color}`)
}

const appendUpdateJail = function(){
  $(".game-updates")
                    .append( 
                      `
                      <div class="cell-information">
                        <p>${currentCell.name}</p>
                        <p>You have landed on Jail</p>
                        <button class="end-turn">End Turn</button>
                      </div> 
                      `
                    )
}

const appendChanceAndCommunity = function(cell) {
  $(".game-updates")
                    .append( 
                      `
                      <div class="cell-information">
                        <p>${currentCell.name}</p>
                        <button class="end-turn">End Turn</button>
                      </div> 
                      `
                    )
}

const payIncomeTax = function(player){
  var tenthOfYourMoney = Math.floor(player.money / 10);
  player.money -= tenthOfYourMoney;
}

const payLuxuryTax = function(player){
  player.money -= 75;
}

const communityChest = function(player){
  currentCommunityChest= communityChestCards[Math.floor( Math.random() * 10 )]
  currentCommunityChest.action(player) 
}

const chance = function(player){
  console.log('before: ' + player.money)
  currentChanceCard = chanceCards[Math.floor(Math.random() * 3)]
  currentChanceCard.action(player);
  console.log(currentChanceCard.name)
  console.log('after ' + player.money)
}

const checkCellForRent = function(player, cell){
  if(cell.owned){
    //need to check to which player does it belong to and give rent to him, probably owne property needs to 
    //changed when property has been bought
    player.money -= cell.rent[0]
    players[cell.owned].money += cell.rent[0]
    console.log('check if both players money have been updated')
    //plus we need check for how many properties the player owes so we can get the correct rent;
  } else {
    //continue
    //return false
    return false
  }
}

const goToJail = function() {

}
// const updatePlayerTurn = function(player){

// }

//need to start making the logic when players are paying rent and give them money when they cross the cell number 0


const board  =  [{
    name: "Go",
    type: "go"
  },{
    name: "MEDITERRANEAN AVENUE",
    price: 60,
    rental: [2, 10, 30, 90, 160, 250],
    color: "brown",
    housePrice: 50,
    type: "property",
    owned: false
  },{
    name: "COMMUNITY CHEST",
    type: "community"
  },{
    name: "BALTIC AVENUE",
    price: 60,
    rental: [4, 20, 60, 180, 360, 450],
    color: "brown",
    housePrice: 50,
    type: "property",
    owned: false
  },{
    name: "INCOME TAX",
    type: "tax",
    amount: 200
  },{
    name: "READING RAILROAD",
    price: 200,
    rental: [25, 50, 100, 200],
    type: "property",
    owned: false
  },{
    name: "ORIENTAL AVENUE",
    price: 100,
    rental: [6, 30, 90, 270, 400, 550],
    color: "lightBlue",
    housePrice: 50,
    type: "property",
    owned: false
  },{
    name: "Chance",
    type: "chance"
  },{
    name: "VERMONT AVENUE",
    price: 100,
    rental: [6, 30, 90, 270, 400, 550],
    color: "lightBlue",
    housePrice: 50,
    type: "property",
    owned: false
  },{
    name: "CONNECTICUT AVENUE",
    price: 120,
    rental: [8, 40, 100, 300, 450, 600],
    color: "lightBlue",
    housePrice: 50,
    type: "property",
    owned: false
  },{
    name: "Jail",
    type: "jail"
  },{
    name: "ST.CHARLES AVENUE",
    price: 140,
    rental: [10, 50, 150, 450, 625, 750],
    housePrice: 100,
    type: "property",
    owned: false
  },{
    name: "ELECTRIC COMPANY",
    price: 150,
    type: "utility",
    owned: false
  },{
    name: "STATES AVENUE",
    price: 140,
    rental: [10, 50, 150, 450, 625, 750],
    housePrice: 100,
    type: "property",
    owned: false
  },{
    name: "VIRGINIA AVENUE",
    price: 160,
    rental: [12, 60, 180, 500, 700, 900],
    housePrice: 100,
    type: "property",
    owned: false
  },{
    name: "PENNSYLVANIA RAILROAD",
    price: 200,
    rental: [25, 50, 100, 200],
    type: "railroad",
    owned: false
  },{
    name: "ST.JAMES PLACE",
    price: 180,
    rental: [14, 70, 200, 550, 750, 950],
    housePrice: 100,
    type: "property",
    owned: false
  },{
    name: "COMMUNITY CHEST",
    type: 'community'
  },{
    name: "TENESSEE AVENUE",
    price: 180,
    rental: [14, 70, 200, 550, 750, 950],
    housePrice: 100,
    type: "property",
    owned: false
  },{
    name: "NEW YORK AVENUE",
    price: 200,
    rental: [16, 80, 220, 600, 800, 1000],
    housePrice: 100,
    type: "property",
    owned: false
  },{
    name: "Free Parking",
    type: 'parking',
  },{
    name: "KENTUCKY AVENUE",
    price: 220,
    rental: [18, 90, 250, 700, 875, 1050],
    housePrice: 150,
    type: "property",
    owned: false
  },{
    name: "Chance",
    type: 'chance'
  },{
    name: "INDIANA AVENUE",
    price: 220,
    rental: [18, 90, 250, 700, 875, 1050],
    housePrice: 150,
    type: "property",
    owned: false
  },{
    name: "ILLINOIS AVENUE",
    price: 240,
    rental: [20, 100, 300, 750, 925, 1100],
    housePrice: 150,
    type: "property",
    owned: false
  },{
    name: "B&O RAILROAD",
    price: 200,
    rental: [25, 50, 100, 200],
    type: "station",
    owned: false
  },{
    name: "ATLANTIC AVENUE",
    price: 260,
    rental: [22, 110, 330, 800, 975, 1150],
    housePrice: 150,
    type: "property",
    owned: false
  },{
    name: "VENTNOR AVENUE",
    price: 260,
    rental: [22, 110, 330, 800, 975, 1150],
    color: "yellow",
    housePrice: 150,
    type: "property",
    owned: false
  },{
    name: "WATER WORKS",
    price: 150,
    type: "utility",
    owned: false
  },{
    name: "MARVIN GARDENS",
    price: 280,
    rental: [22, 120, 360, 850, 1025, 1200],
    color: "yellow",
    housePrice: 140,
    type: "property",
    owned: false
  },{
    name: "GO TO JAIL",
    type: 'jail',
  },{
    name: "PACIFIC AVENUE",
    price: 300,
    rental: [26, 130, 390, 900, 1100, 1275],
    housePrice: 200,
    type: "property",
    owned: false
  },{
    name: "NORTH CAROLINA AVENUE",
    price: 300,
    rental: [26, 130, 390, 900, 1100, 1275],
    housePrice: 200,
    type: "property",
    owned: false
  },{
    name: "Community Chest",
    type: 'chest',
  },{
    name: "PENNSYLVANIA AVENUE",
    price: 320,
    rental: [28, 150, 450, 1000, 1200, 1400],
    housePrice: 200,
    type: "property",
    owned: false
  },{
    name: "SHORT LINE",
    price: 200,
    rental: [25, 50, 100, 200],
    type: "station",
    owned: false
  },{
    name: "Chance",
    type: 'chance',
  },{
    name: "PARK PLACE",
    price: 350,
    rental: [35, 175, 500, 1100, 1300, 1500],
    housePrice: 200,
    type: "property",
    owned: false
  },{
    name: "Super Tax",
    type: "tax",
    amount: 100
  },{
    name: "BOARDWALK",
    price: 400,
    rental: [50, 200, 600, 1400, 1700, 2000],
    housePrice: 200,
    type: "property",
    owned: false
  }]

const communityChestCards = [
  {
    name: "Get out of the jail",
    action: function(player){
      player.getOutOfJail = true;
    }
  }, {
    name: "you have won beauty contest collect $10",
    action: function(player){
      player.money += 10;
    }
  }, {
    name: "from stock exchange you get $50, collect $50",
    action: function(player){
      player.money += 50;
    }
  }, {
    name: "Life insurance matures, collect $100",
    action: function(player){
      player.money += 100;
    }
  }, {
    name: "Income tax refund collect $20",
    action: function(player){
      player.money += 20;
    }
  }, {
    name: "Holiday fund matures, collect $100",
    action: function(player){
      player.money += 100;
    }
  }, {
    name: "You inherit $100",
    action: function(player){
      player.money += 100;
    }
  }, {
    name: "Receive $25 consultancy fee",
    action: function(player){
      player.money += 25;
    }
  }, {
    name: "Pay your due bills equal to $100",
    action: function(player){
      player.money -= 100;
    }
  },  {
    name: "Bank error, you loose $50",
    action: function(player){
      player.money -= 50;
    }
  }
]

const chanceCards = [
  {
    name: 'You have won $100',
    action: function(player){
      player.money += 100
    }
  }, 
  {
    name: 'You have lost $100',
    action: function(player){
      player.money -= 100
    }
  },
  {
    name: 'You have won $100',
    action: function(player){
      player.money += 100
    }
  }, 
  {
    name: 'You have lost $100',
    action: function(player){
      player.money -= 100
    }
  }
]

//players data structure look like this :

// players = {
//   player1: {
//     name: 'vasilica',
//     cell: 0,
//     property: []
//   },
//   player2: {
//     name: 'patlajica',
//     cell: 0,
//     property: []
//   }
// }