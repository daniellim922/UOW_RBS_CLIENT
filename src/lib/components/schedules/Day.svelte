<script>
    export let slotIndex, day, i;
    const dayOfWk = Object.keys(day);
    import { room } from "../../stores/room.js";

    const log = (dayOfWk) => {
        const day = dayOfWk.dayOfWk[0];
        let addDay = $room.allSlots[slotIndex].availDays;

        if (!addDay.includes(day)) {
            addDay.push(day);
        } else {
            const index = addDay.indexOf(day);
            addDay.splice(index, 1);
        }
    };
</script>

<div class="form-check">
    <input
        class="form-check-input"
        type="checkbox"
        id="roomDay-{slotIndex}-{i}"
        on:click={() => log({ dayOfWk })}
    />
    <label class="form-check-label" for="roomDay-{slotIndex}-{i}">
        {dayOfWk}
    </label>
</div>
