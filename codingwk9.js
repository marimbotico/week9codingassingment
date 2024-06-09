// For the final project you will be creating an automated version of the classic card game WAR! There are many versions of the game WAR. In this version there are only 2 players.
// You do not need to do anything special when there is a tie in a round.
// Think about how you would build this project and write your plan down. Consider classes such as: Card, Deck, Player, as well as what properties and methods they may include.
// You do not need to accept any user input, when you run your code, the entire game should play out instantly without any user input inside of your browser's console.


//I need a deck of cards to start with. I need to open the card deck, I need to shuffle the deck, I need to deal the deck:

class Deck {
    constructor() {
        this.suits = ['Hearts', 'Spades', 'Diamonds', 'Clubs'];// 4 kinds of suits
        this.cards = [];// empty array where the cards will go
    }

    openDeck() {// function that will open the deck
        for (let i = 2; i <= 14; i++) {// there's 14 cards of each suit. starts at 2 and ends at Ace=14
            const heart = { suit: 'Hearts', value: i };
            const spade = { suit: 'Spades', value: i };
            const diamond = { suit: 'Diamonds', value: i };
            const club = { suit: 'Clubs', value: i };
            this.cards.push(heart, spade, diamond, club);//this pushes or adds each card in order to the empty array this.cards [] for instance: hearts 1, hearts 2, hearts 3 ... to 14 which is the Ace.
        }
    }

    deal() {
        if (this.cards.length > 0) {//the deal method eliminates the last element (1 card) from the deck of cards - this.cards array
            return this.cards.pop();
        }
    }

    shuffle() {// in all justice I google this and copied it from: https://bost.ocks.org/mike/shuffle/
        let m = this.cards.length, t, i;

        while (m) {//While there remain elements to shuffle...
            i = Math.floor(Math.random() * m--);// Pick a remaining element...
            t = this.cards[m];//And swap it with the current element. 
            this.cards[m] = this.cards[i];
            this.cards[i] = t;
        }

        return this.cards;//returns the this.cards array out of order
    }
}

class Player {// the player needs a name and obviously a hand. Each player gets 26 cards total. A player needs to receive a card from the deck of cards and be able to play it.
    constructor(name) {
        this.name = name;
        this.hand = [];
    }

    receiveCard(card) {// this method I use to add a card to this.hand array from the deck of cards
        this.hand.push(card);
    }

    playCard() {// this method I use to eliminate the first card of this.hand array per turn for each player
        if (this.hand.length > 0) {
            return this.hand.shift();
        }
    }

}
//For the game I need 2 players, that have been dealt 26 cards in random order. I then have to compare the cards and the card with the highest value wins.
class Game {
    constructor(player1Name, player2Name) {// 2 players
        this.player1 = new Player(player1Name);
        this.player2 = new Player(player2Name);
        this.deck = new Deck();
        this.maxRounds = 100; // maximum number of rounds to avoid an infinite loop
    }

    setUpGame() {
        this.deck.openDeck();
        this.deck.shuffle();
        for (let i = 1; i < 53; i++) {//as long i = 1 and it's less than 53(52 cards in the deck) then
            const dealtCard = this.deck.deal();//eliminates a card from the deck of cards 
            if (i % 2 === 0) {// if the card is even it's assigned to Player 1
                this.player1.receiveCard(dealtCard);
            } else {// if the card is odd it's assigned to Player 2
                this.player2.receiveCard(dealtCard);
            }
        }
    }

    compareCards() {
        const player1Card = this.player1.playCard();
        const player2Card = this.player2.playCard();

        if (player1Card.value > player2Card.value) {// Here I compare the values of each card and since the game of War the winner of the hand gets to keep both cards, in this case 
            this.player1.receiveCard(player1Card);//Player 1 would keep both his card and Player's 2 card
            this.player1.receiveCard(player2Card);
        } else if (player1Card.value < player2Card.value) {// the opposite happens here
            this.player2.receiveCard(player1Card);
            this.player2.receiveCard(player2Card);
        } else {
            // This is how I would handle a tie scenario. Each player gets to keep their card. 
            this.player1.receiveCard(player1Card);
            this.player2.receiveCard(player2Card);
        }
    }

    playGame() {
        this.setUpGame();//encapsulated function for cleaner code. Already described the setUpGame method above.
        let round = 0;

        while (this.player1.hand.length > 0 && this.player2.hand.length > 0 && round < this.maxRounds) {// As long as the players have cards in their hand and to avoid an infinite loop the round is less than the max amount of rounds
            this.compareCards();
            round++;
        }

        console.log(this.endGame());
    }

    endGame() {
        if (this.player1.hand.length > this.player2.hand.length) {//If player 1 has more cards than Player 2 after the max amount of rounds, Player 1 wins the game.
            return `${this.player1.name} wins the game!`;
        } else if (this.player1.hand.length < this.player2.hand.length) {//the opposite is applied here
            return `${this.player2.name} wins the game!`;
        } else {
            return `The game is a tie!`;//since there is a limit of rounds it's unlikely but I wanted an option in case of a tie.
        }
    }
}

const game = new Game("Player 1", "Player 2");//instantiate Game class with Player 1 and Player 2 as arguments. 
game.playGame();//starts the game

//Since we've learned in class the advantages of OOP, I decided to encapsulate a lot of methods within other methods as I evolved in developing the game. 
