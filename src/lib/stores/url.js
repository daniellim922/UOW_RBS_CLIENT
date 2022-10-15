import { writable } from "svelte/store";

export const prod = true;

export const localClient = writable("http://localhost:5173");
export const localServer = writable("http://localhost:3000");

export const hostedClient = writable("https://uow-rbs-client.vercel.app");
export const hostedServer = writable("https://uowrbsserver.up.railway.app");
