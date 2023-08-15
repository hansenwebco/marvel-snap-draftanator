import { writable} from 'svelte/store';
import { readable} from 'svelte/store';

export const API_URL = readable('https://snapdata-cdn.stonedonkey.com');
export const DECK = writable([]);
export const SEALED_CARDS = writable([]);
export const DECK_EVENT = writable(0);