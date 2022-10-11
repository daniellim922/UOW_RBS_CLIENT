<script>
    export let slotIndex, i, timeSlot;
    import { room, days } from "../../stores/room.js";

    const deleteTimeSlot = (slotIndex, i) => {
        $room.allSlots[slotIndex].timeSlots.splice(i, 1);
        $room = $room;
    };
</script>

<div class="col-3">
    <button
        class="btn btn-outline-danger mb-3"
        on:click={() => deleteTimeSlot(slotIndex, i)}>Delete Time Slot</button
    >
    <div class="input-group mb-3">
        <span class="input-group-text" id="start-{slotIndex}-{i}">Start</span>
        <input type="time" class="form-control" bind:value={timeSlot.start} />
    </div>
    <div class="input-group mb-3">
        <span class="input-group-text" id="end-{slotIndex}-{i}">End</span>
        <input type="time" class="form-control" bind:value={timeSlot.end} />
    </div>
    <div class="input-group mb-3">
        <span class="input-group-text" id="price-{slotIndex}-{i}">$</span>
        <input
            type="number"
            class="form-control"
            aria-label="Amount (to the nearest dollar)"
            bind:value={timeSlot.price}
        />
    </div>
</div>
