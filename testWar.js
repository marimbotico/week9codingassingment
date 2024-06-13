const expect = chai.expect
const assert = chai.assert

// describe('myFunctions', function() {
//     describe(#doSomething, openDeck() {
//         it('#Should return the array of numbers in order', function() {
//             for (let i = 2; i <= 14; i++) {
//                 const heart = { suit: 'Hearts', value: i };
//                 const spade = { suit: 'Spades', value: i };
//                 const diamond = { suit: 'Diamonds', value: i };
//                 const club = { suit: 'Clubs', value: i };
//                 this.cards.push(heart, spade, diamond, club);

//                 expect(openDeck).to.equal([1, 2, 3, 4, 5])
//             })
//         })
//     })
// })


describe('War Tests:', () => {
    describe('Example Open Deck', () => {
        it('#Should return the deck with suits and numbers', () => {
            const game = new Game();
            const expectedDeck = [];
            for (let i = 2; i <= 14; i++) {
                expectedDeck.push({ suit: 'Hearts', value: i });
                expectedDeck.push({ suit: 'Spades', value: i });
                expectedDeck.push({ suit: 'Diamonds', value: i });
                expectedDeck.push({ suit: 'Clubs', value: i });
            }
            expect(game.openDeck()).to.deep.equal(expectedDeck);
        });
    });

    describe('Example Compare Cards', () => {
        it('#Should correctly compare two cards', () => {
            const game = new Game();
            const player1Card = { suit: 'Hearts', value: 13 }; // King
            const player2Card = { suit: 'Spades', value: 10 }; // 10

            expect(game.compareCards(player1Card, player2Card)).to.equal('player1');

            const player1Card2 = { suit: 'Diamonds', value: 9 };
            const player2Card2 = { suit: 'Clubs', value: 11 };

            expect(game.compareCards(player1Card2, player2Card2)).to.equal('player2');

            const player1Card3 = { suit: 'Hearts', value: 7 };
            const player2Card3 = { suit: 'Spades', value: 7 };

            expect(game.compareCards(player1Card3, player2Card3)).to.equal('tie');
        });
    });
});