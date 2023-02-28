
import { Base64 } from 'js-base64';

export function randomNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function buildDeckCode(deck) {
    let deckCode = {};
    deckCode.Cards = [];
    deckCode.Name = "Draft Deck"

    for (var x = 0; x < deck.length; x++) {
        const replaced = deck[x].name.replace(/[^a-z0-9]/gi, '');
        deckCode.Cards[x] = { "CardDefId": replaced };
    }

    let result = Base64.btoa(JSON.stringify(deckCode));
    return result;
}

export function sortCards(deck) {
    deck.sort((a, b) => a.name > b.name ? 1 : -1)
    deck.sort((a, b) => a.power - b.power);
    deck.sort((a, b) => a.energy - b.energy);
    return deck;
}

