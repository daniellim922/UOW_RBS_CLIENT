<script>
    export let room, id;
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

    const updateChanges = async () => {
        const res = await fetch(`${serverUrl}/api/student/bookings`, {
            method: "PUT", // or 'PUT'
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(booking),
        });
        const req = await res.json();
        if (req) {
            window.location.reload();
        }
    };

    let booking = {
        price: null,
        bookingId: id,
        day: "",
        start: "",
        end: "",
        date: "",
    };

    const setSchedule = (start, end, price) => {
        booking.start = start;
        booking.end = end;
        booking.price = price;
    };
</script>

<div
    class="modal fade"
    id="editBookingModal-{id}"
    tabindex="-1"
    aria-labelledby="editBookingModalLabel-{id}"
    aria-hidden="true"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
>
    <div class="modal-dialog">
        <div class="modal-content size">
            <div class="modal-header">
                <h1 class="modal-title fs-5" id="editBookingModalLabel-{id}">
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
                                disabled
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
                                    disabled
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
                                    disabled
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
                                disabled
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
                                disabled
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
                                disabled
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
                <div class="my-3">
                    <label for="start">Choose date:</label>
                    <input type="date" bind:value={booking.date} />
                </div>
                {#each room.schedules as schedule, scheduleIndex}
                    <div class="mb-5">
                        <div class="d-flex mb-3">
                            {#each schedule.days as day, dayIndex}
                                <div class="form-check col-3">
                                    <input
                                        class="form-check-input"
                                        type="radio"
                                        name="flexRadioDefault"
                                        id="{day}-{dayIndex}"
                                        bind:group={booking.day}
                                        value={day}
                                    />
                                    <label
                                        class="form-check-label"
                                        for="{day}-{dayIndex}"
                                    >
                                        {day}
                                    </label>
                                </div>
                            {/each}
                        </div>
                        {#each schedule.timeSlots as timeSlot, timeSlotIndex}
                            <div class="form-check">
                                <input
                                    class="form-check-input"
                                    type="radio"
                                    name="flexRadioDefault1"
                                    id="{scheduleIndex}-{timeSlotIndex}"
                                    on:click={() =>
                                        setSchedule(
                                            `${timeSlot.start}`,
                                            `${timeSlot.end}`,
                                            `${timeSlot.price}`
                                        )}
                                />
                                <label
                                    class="form-check-label"
                                    for="{scheduleIndex}-{timeSlotIndex}"
                                >
                                    <div class="hstack gap-3">
                                        <p>
                                            <strong>Start:</strong>
                                            {timeSlot.start}
                                        </p>
                                        <p>
                                            <strong>End:</strong>
                                            {timeSlot.end}
                                        </p>
                                        <p>
                                            <strong>Price:</strong>
                                            ${timeSlot.price}
                                        </p>
                                    </div>
                                </label>
                            </div>
                        {/each}
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
