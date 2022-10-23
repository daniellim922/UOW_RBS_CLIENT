<script>
    export let room;
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
                    {room.details.name}
                </h1>
                <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                />
            </div>
            <div class="modal-body">
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
                                <p>
                                    <strong>Promo Code:</strong>
                                    {timeSlot.promo}
                                </p>
                            </div>
                        {/each}
                    </div>
                {/each}

                <div class="d-flex">
                    <strong class="card-text mb-0"> Size: </strong>
                    <p class="card-text mb-0 ms-auto">
                        {room.details.size} sqm
                    </p>
                </div>

                <div class="d-flex">
                    <strong class="card-text mb-0"> Capacity: </strong>
                    <p class="card-text mb-0 ms-auto">
                        {room.details.capacity} pax
                    </p>
                </div>
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
