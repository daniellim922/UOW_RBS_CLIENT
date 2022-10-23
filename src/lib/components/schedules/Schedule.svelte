<script>
    import { room, days } from "../../stores/room.js";

    import TimeSlot from "./TimeSlot.svelte";
    import Day from "./Day.svelte";

    const newSlot = () => {
        let newSlot = {
            timeSlots: [{ start: "", end: "", price: 0, promo: "" }],
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
        };
        $room.allSlots.push(newSlot);
        $room = $room;
    };
    const deleteSlot = (i) => {
        $room.allSlots.splice(i, 1);
        $room = $room;
    };

    const addTimeSlot = (i) => {
        let addTimeSlot = {
            start: "",
            end: "",
            price: 0,
            promo: "",
        };
        $room.allSlots[i].timeSlots.push(addTimeSlot);
        $room = $room;
    };

    $: allSlots = $room.allSlots;
</script>

<div class="container">
    <p class="fw-semibold fs-5 mb-3 me-3">List available schedules</p>
    {#each allSlots as slot, slotIndex}
        <div class="row mb-3">
            <div class="col-2 d-flex flex-column">
                <button
                    class="btn btn-outline-success mb-3 w-75"
                    on:click={() => addTimeSlot(slotIndex)}
                    >Add Time Slot</button
                >
                {#each slot.days as day, i}
                    <Day {slotIndex} {day} {i} />
                {/each}
                <button
                    class="btn btn-danger my-3"
                    on:click={() => deleteSlot(slotIndex)}
                    >Delete Schedule</button
                >
            </div>
            <div class="col-10">
                <div class="row">
                    {#each slot.timeSlots as timeSlot, i}
                        <TimeSlot {slotIndex} {timeSlot} {i} />
                    {/each}
                </div>
            </div>
            <div class="d-flex justify-content-center w-100">
                <hr class="mt-3 mb-0 w-100 mx-3" />
            </div>
        </div>
    {/each}
    <div class="d-flex justify-content-end mt-3 gap-3">
        <div>
            <button class="btn btn-primary" type="button" on:click={newSlot}
                >New Schedule</button
            >
        </div>
    </div>
</div>
