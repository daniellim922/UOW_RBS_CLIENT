<script>
    export let slotIndex, day, i;
    const dayOfWk = Object.keys(day);
    import { room } from "../../stores/room.js";
</script>

<div class="form-check">
    <input
        class="form-check-input"
        type="checkbox"
        id="roomDay-{slotIndex}-{i}"
        bind:checked={$room.allSlots[slotIndex].days[i][`${dayOfWk}`]}
    />
    <label class="form-check-label" for="roomDay-{slotIndex}-{i}">
        {dayOfWk}
    </label>
</div>
