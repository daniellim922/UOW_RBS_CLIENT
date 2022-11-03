<script>
    import { onMount } from "svelte";
    let studentSession = sessionStorage.getItem("student");
    import roomImg from "../../assets/room.jpeg";

    import {
        localClient,
        localServer,
        prod,
        hostedClient,
        hostedServer,
    } from "../../lib/stores/url.js";

    import NoAuth from "../../lib/shared/NoAuth.svelte";
    import Card from "../../lib/components/Card.svelte";

    import EditBookingModal from "../../lib/components/room/EditBookingModal.svelte";

    let clientUrl = null;
    let serverUrl = null;
    if ($prod) {
        clientUrl = $hostedClient;
        serverUrl = $hostedServer;
    } else {
        clientUrl = $localClient;
        serverUrl = $localServer;
    }

    let allBookings = [];

    onMount(async () => {
        const id = sessionStorage.getItem("id");

        const res = await fetch(`${serverUrl}/api/student/bookings`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ id }),
        });
        const data = await res.json();
        allBookings = data;
    });

    const deleteBooking = async (booking) => {
        const res = await fetch(
            `${serverUrl}/api/student/bookings/${booking._id}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({}),
            }
        );
        const data = await res.json();
        if (data) {
            window.location.reload();
        }
    };
</script>

{#if studentSession == "true"}
    <section class="min-vh-100 backdrop">
        <div class="container py-5">
            <Card title={"All Bookings"} staff={true}>
                <div class="container">
                    <div class="row gap-2">
                        {#each allBookings as booking, i}
                            <div class="col-3 my-3">
                                <div class="card">
                                    <img
                                        src={roomImg}
                                        class="card-img-top"
                                        alt="..."
                                    />
                                    <div class="card-body py-2">
                                        <h5 class="card-title">
                                            {booking.room.details.name}
                                        </h5>
                                        <div class="d-flex">
                                            <label
                                                for="createRoomSize"
                                                class="form-label"
                                                >Room Size:</label
                                            >
                                            <p class="ms-auto">
                                                {booking.room.details.size} sqm
                                            </p>
                                        </div>
                                        <div class="d-flex">
                                            <label
                                                for="createRoomCapacity"
                                                class="form-label"
                                                >Room Capacity:</label
                                            >
                                            <p class="ms-auto">
                                                {booking.room.details.capacity} pax
                                            </p>
                                        </div>
                                        <div class="d-flex">
                                            <label
                                                for="createRoomCapacity"
                                                class="form-label">Start:</label
                                            >
                                            <p class="ms-auto">
                                                {booking.start}
                                            </p>
                                        </div>
                                        <div class="d-flex">
                                            <label
                                                for="createRoomCapacity"
                                                class="form-label">End:</label
                                            >
                                            <p class="ms-auto">
                                                {booking.end}
                                            </p>
                                        </div>
                                        <div class="d-flex">
                                            <label
                                                for="createRoomCapacity"
                                                class="form-label">Price:</label
                                            >
                                            <p class="ms-auto">
                                                ${booking.price}
                                            </p>
                                        </div>
                                        <div class="d-flex">
                                            <label
                                                for="createRoomCapacity"
                                                class="form-label">Date:</label
                                            >
                                            <p class="ms-auto">
                                                {booking.date}
                                            </p>
                                        </div>
                                        <div class="d-flex">
                                            <label
                                                for="createRoomCapacity"
                                                class="form-label">Day:</label
                                            >
                                            <p class="ms-auto">
                                                {booking.day}
                                            </p>
                                        </div>
                                    </div>
                                    <div
                                        class="card-body py-0 hstack gap-3 mb-3"
                                    >
                                        <button
                                            class="btn btn-danger"
                                            on:click={() =>
                                                deleteBooking(booking)}
                                            >Delete
                                        </button>
                                        <button
                                            class="btn btn-success"
                                            data-bs-toggle="modal"
                                            data-bs-target="#editBookingModal-{booking._id}"
                                            >Edit
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <EditBookingModal
                                room={booking.room}
                                id={booking._id}
                            />
                        {/each}
                    </div>
                </div>
            </Card>
        </div>
    </section>
{:else}
    <NoAuth />
{/if}
