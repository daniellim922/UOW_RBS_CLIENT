import { writable } from "svelte/store";

export let room = writable({
    name: "",
    size: null,
    capacity: null,
    allSlots: [
        {
            timeSlots: [
                { start: "", end: "", price: 0 },
                { start: "", end: "", price: 0 },
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
