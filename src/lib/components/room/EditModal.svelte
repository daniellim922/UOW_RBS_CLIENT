<script>
    export let room;
    const floors = ["One", "Two", "Three", "Four", "Five"];

    import {
        localClient,
        localServer,
        prod,
        hostedClient,
        hostedServer,
    } from "../../stores/url.js";

    let clientUrl = null;
    let serverUrl = null;
    if ($prod) {
        clientUrl = $hostedClient;
        serverUrl = $hostedServer;
    } else {
        clientUrl = $localClient;
        serverUrl = $localServer;
    }

    const deleteDay = (scheduleIndex, dayIndex) => {
        const daysArray = room.schedules[scheduleIndex].days;
        daysArray.splice(dayIndex, 1);
        room = room;
        availDays(scheduleIndex);
    };

    const addDay = (scheduleIndex, e) => {
        const daysArray = room.schedules[scheduleIndex].days;
        const dayToAdd = e.target.innerText;
        daysArray.push(dayToAdd);
        room = room;
        availDays(scheduleIndex);
    };

    const deleteTimeSlot = (scheduleIndex, timeSlotIndex) => {
        const timeSlotsArray = room.schedules[scheduleIndex].timeSlots;
        timeSlotsArray.splice(timeSlotIndex, 1);
        room = room;
    };

    const addTimeSlot = (scheduleIndex) => {
        const newTimeSlot = { start: "", end: "", price: 0, promo: "" };
        const timeSlotsArray = room.schedules[scheduleIndex].timeSlots;
        timeSlotsArray.push(newTimeSlot);
        room = room;
    };

    const replenishDays = () => {
        const allDays = [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
        ];
        days = allDays;
    };

    let days = [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
    ];

    const availDays = (scheduleIndex) => {
        const takenDaysArr = room.schedules[scheduleIndex].days;
        for (let i = 0; i < takenDaysArr.length; i++) {
            days.findIndex((el, index) => {
                if (takenDaysArr[i] == el) {
                    days.splice(index, 1);
                }
            });
        }
        days = days;
    };

    const updateChanges = async () => {
        await fetch(`${serverUrl}/api/staff`, {
            method: "PUT", // or 'PUT'
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(room),
        });
    };
</script>

<div
    class="modal fade"
    id="editRoomModal-{room._id}"
    tabindex="-1"
    aria-labelledby="editRoomModalLabel-{room._id}"
    aria-hidden="true"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
>
    <div class="modal-dialog">
        <div class="modal-content size">
            <div class="modal-header">
                <h1 class="modal-title fs-5" id="editRoomModalLabel-{room._id}">
                    Edit Rooom Details
                </h1>
                <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                />
            </div>
            <div class="modal-body">
                <h5 class="card-title">Room Details:</h5>
                <div class="mb-5">
                    <div class="row">
                        <div class="col-md-3">
                            <label for="createRoomName" class="form-label"
                                >Room Name</label
                            >
                            <input
                                type="text"
                                class="form-control"
                                id="createRoomName"
                                placeholder="e.g. T5.17a"
                                bind:value={room.details.name}
                            />
                        </div>
                        <div class="col-md-3">
                            <label for="createRoomSize" class="form-label"
                                >Room Size</label
                            >
                            <div class="input-group mb-3">
                                <input
                                    type="number"
                                    class="form-control"
                                    aria-label=""
                                    placeholder="e.g. 89"
                                    min="0"
                                    bind:value={room.details.size}
                                />
                                <span class="input-group-text">sqm</span>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <label for="createRoomCapacity" class="form-label"
                                >Room Capacity</label
                            >
                            <div class="input-group mb-3">
                                <input
                                    type="number"
                                    class="form-control"
                                    aria-label=""
                                    placeholder="e.g. 60"
                                    min="0"
                                    bind:value={room.details.capacity}
                                />
                                <span class="input-group-text">pax</span>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-3">
                            <label for="createRoomType" class="form-label"
                                >Room Type</label
                            >
                            <select
                                class="form-select"
                                aria-label="Default select example"
                                bind:value={room.location.type}
                            >
                                <option value="Tutorial">Tutorial</option>
                                <option value="Lecture">Lecture</option>
                            </select>
                        </div>
                        <div class="col-md-3">
                            <label for="createRoomFloor" class="form-label"
                                >Room Floor</label
                            >
                            <select
                                class="form-select"
                                aria-label="Default select example"
                                bind:value={room.location.floor}
                            >
                                {#each floors as floor, i}
                                    <option value={i + 1}>{floor}</option>
                                {/each}
                            </select>
                        </div>
                        <div class="col-md-3">
                            <label for="createRoomUnit" class="form-label"
                                >Room unit</label
                            >
                            <input
                                type="text"
                                class="form-control"
                                id="createRoomUnit"
                                placeholder="e.g. 17a"
                                bind:value={room.location.unit}
                            />
                        </div>
                    </div>
                </div>

                <h5 class="card-title mb-3">Schedules:</h5>
                {#each room.schedules as schedule, scheduleIndex}
                    <div class="mb-5">
                        <div class="d-flex mb-3">
                            <div class="dropdown" on:mouseleave={replenishDays}>
                                <p
                                    class="btn btn-outline-primary dropdown-toggle me-3"
                                    role="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                    on:mouseenter={() =>
                                        availDays(scheduleIndex)}
                                >
                                    Add day
                                </p>

                                <ul class="dropdown-menu">
                                    {#each days as day}
                                        <li
                                            class="dropdown-item"
                                            on:click={(e) =>
                                                addDay(scheduleIndex, e)}
                                        >
                                            {day}
                                        </li>
                                    {/each}
                                </ul>
                            </div>
                            {#each schedule.days as day, dayIndex}
                                <button
                                    class="btn btn-outline-danger me-3"
                                    on:click={() =>
                                        deleteDay(scheduleIndex, dayIndex)}
                                >
                                    {day}
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        fill="currentColor"
                                        class="bi bi-x-lg"
                                        viewBox="0 0 16 16"
                                    >
                                        <path
                                            d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"
                                        />
                                    </svg>
                                </button>
                            {/each}
                        </div>
                        {#each schedule.timeSlots as timeSlot, timeSlotIndex}
                            <div class="hstack gap-3">
                                <button
                                    class="btn btn-outline-danger mb-3"
                                    on:click={() =>
                                        deleteTimeSlot(
                                            scheduleIndex,
                                            timeSlotIndex
                                        )}
                                    ><svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        fill="currentColor"
                                        class="bi bi-x-lg"
                                        viewBox="0 0 16 16"
                                    >
                                        <path
                                            d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"
                                        />
                                    </svg></button
                                >
                                <div class="input-group mb-3">
                                    <span class="input-group-text" id="start"
                                        >Start</span
                                    >
                                    <input
                                        type="time"
                                        class="form-control"
                                        bind:value={timeSlot.start}
                                    />
                                </div>
                                <div class="input-group mb-3">
                                    <span class="input-group-text" id="end"
                                        >End</span
                                    >
                                    <input
                                        type="time"
                                        class="form-control"
                                        bind:value={timeSlot.end}
                                    />
                                </div>
                                <div class="input-group mb-3">
                                    <span class="input-group-text" id="price"
                                        >$</span
                                    >
                                    <input
                                        type="number"
                                        class="form-control"
                                        bind:value={timeSlot.price}
                                    />
                                </div>
                                <div class="input-group mb-3">
                                    <span class="input-group-text" id="promo"
                                        >UOW</span
                                    >
                                    <input
                                        type="text"
                                        class="form-control"
                                        placeholder="Promo Code"
                                        bind:value={timeSlot.promo}
                                    />
                                </div>
                            </div>
                        {/each}
                        <button
                            class="btn btn-outline-primary"
                            on:click={() => addTimeSlot(scheduleIndex)}
                            >Add time slot</button
                        >
                    </div>
                {/each}
            </div>
            <div class="modal-footer">
                <button
                    type="button"
                    class="btn btn-secondary"
                    data-bs-dismiss="modal">Close</button
                >
                <button
                    type="button"
                    class="btn btn-success"
                    on:click={updateChanges}
                    data-bs-dismiss="modal">Save Changes</button
                >
            </div>
        </div>
    </div>
</div>

<style>
    .size {
        width: 60rem;
        margin-left: -15rem;
    }
</style>
