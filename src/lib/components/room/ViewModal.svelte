<script>
    export let room, staff;
    const floors = ["One", "Two", "Three", "Four", "Five"];
</script>

<div
    class="modal fade"
    id="viewRoomModal-{room._id}"
    tabindex="-1"
    aria-labelledby="viewRoomModalLabel-{room._id}"
    aria-hidden="true"
>
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5" id="viewRoomModalLabel-{room._id}">
                    View Room Details
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
                                >Room Name:</label
                            >
                            {room.details.name}
                        </div>
                        <div class="col-md-3">
                            <label for="createRoomSize" class="form-label"
                                >Room Size:</label
                            >
                            {room.details.size}
                        </div>
                        <div class="col-md-4">
                            <label for="createRoomCapacity" class="form-label"
                                >Room Capacity:</label
                            >
                            {room.details.capacity}
                        </div>
                    </div>
                    <div class="row mt-3">
                        <div class="col-md-3">
                            <label for="createRoomType" class="form-label"
                                >Room Type:</label
                            >
                            {room.location.type}
                        </div>
                        <div class="col-md-3">
                            <label for="createRoomFloor" class="form-label"
                                >Room Floor:</label
                            >
                            {room.location.floor}
                        </div>
                        <div class="col-md-3">
                            <label for="createRoomUnit" class="form-label"
                                >Room unit:</label
                            >
                            {room.location.unit}
                        </div>
                    </div>
                </div>
                <h5 class="card-title mb-3">Schedules:</h5>
                {#each room.schedules as schedule}
                    <div class="mb-4">
                        {#each schedule.days as day}
                            <p class="btn btn-primary me-3">
                                {day}
                            </p>
                        {/each}
                        {#each schedule.timeSlots as timeSlot}
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
                                {#if staff}
                                    <p>
                                        <strong>Promo Code:</strong>
                                        {timeSlot.promo}
                                    </p>
                                {/if}
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
            </div>
        </div>
    </div>
</div>
