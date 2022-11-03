<script>
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

    export let room;

    const submitBooking = async () => {
        await fetch(`${serverUrl}/api/student`, {
            method: "POST", // or 'PUT'
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(booking),
        })
            .then((response) => response.json())
            .then((data) => {
                window.location.assign(`${clientUrl}/#/student`);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    };

    let booking = {
        user_id: sessionStorage.getItem("id"),
        room_id: null,
        day: "",
        start: "",
        end: "",
        date: "",
        promo: "",
    };

    const setSchedule = (start, end, room) => {
        booking.start = start;
        booking.end = end;
        booking.room_id = room;
    };
</script>

<div
    class="modal fade"
    id="bookRoomModal-{room._id}"
    tabindex="-1"
    aria-labelledby="bookRoomModalLabel-{room._id}"
    aria-hidden="true"
>
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5" id="bookRoomModalLabel-{room._id}">
                    {room.details.name}
                </h1>
                <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                />
            </div>
            <div class="modal-body px-3">
                <div class="my-3">
                    <label for="start">Choose date:</label>
                    <input type="date" bind:value={booking.date} />
                </div>
                <h5 class="card-title mb-3">Schedules:</h5>
                {#each room.schedules as schedule, scheduleIndex}
                    <div class="mb-4">
                        <div class="row px-2">
                            {#each schedule.days as day, i}
                                <div class="form-check col-3">
                                    <input
                                        class="form-check-input"
                                        type="radio"
                                        name="flexRadioDefault"
                                        id="{day}-{i}"
                                        bind:group={booking.day}
                                        value={day}
                                    />
                                    <label
                                        class="form-check-label"
                                        for="{day}-{i}"
                                    >
                                        {day}
                                    </label>
                                </div>
                            {/each}
                        </div>
                        <div class="my-3">
                            {#each schedule.timeSlots as timeSlot, i}
                                <div class="form-check">
                                    <input
                                        class="form-check-input"
                                        type="radio"
                                        name="flexRadioDefault1"
                                        id="{scheduleIndex}-{i}"
                                        on:click={() =>
                                            setSchedule(
                                                `${timeSlot.start}`,
                                                `${timeSlot.end}`,
                                                `${room._id}`
                                            )}
                                    />
                                    <label
                                        class="form-check-label"
                                        for="{scheduleIndex}-{i}"
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
                    </div>
                {/each}
                <div class="row g-3 align-items-center">
                    <div class="col-auto">
                        <label for="inputPassword6" class="col-form-label mb-2"
                            >Promo Code:</label
                        >
                    </div>
                    <div class="col-auto">
                        <div class="input-group">
                            <span class="input-group-text" id="basic-addon1"
                                >UOW</span
                            >
                            <input
                                type="text"
                                class="form-control"
                                placeholder="Promo Code"
                                bind:value={booking.promo}
                            />
                        </div>
                    </div>
                    <div class="col-auto">
                        <span id="passwordHelpInline" class="form-text">
                            Discount will applied at checkout
                        </span>
                    </div>
                </div>
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
                    data-bs-dismiss="modal"
                    on:click={submitBooking}>Book Room</button
                >
            </div>
        </div>
    </div>
</div>
