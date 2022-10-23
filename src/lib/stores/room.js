import { writable } from "svelte/store";

export let room = writable({
    name: "",
    size: null,
    capacity: null,
    available: false,
    allSlots: [
        {
            timeSlots: [
                { start: "", end: "", price: 0, promo: "" },
                { start: "", end: "", price: 0, promo: "" },
            ],
            days: [
                { Monday: false },
                { Tuesday: false },
                { Wednesday: false },
                { Thursday: false },
                { Friday: false },
                { Saturday: false },
                { Sunday: false },
            ],
            availDays: [],
        },
    ],
    location: {
        type: null,
        floor: null,
        unit: null,
    },
});

export let days = writable([
    { Monday: false },
    { Tuesday: false },
    { Wednesday: false },
    { Thursday: false },
    { Friday: false },
    { Saturday: false },
    { Sunday: false },
]);
