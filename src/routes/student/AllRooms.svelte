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

    import ViewModal from "../../lib/components/room/ViewModal.svelte";
    import BookModal from "../../lib/components/room/BookModal.svelte";

    let clientUrl = null;
    let serverUrl = null;
    if ($prod) {
        clientUrl = $hostedClient;
        serverUrl = $hostedServer;
    } else {
        clientUrl = $localClient;
        serverUrl = $localServer;
    }

    let allRooms = [];

    onMount(async () => {
        await fetch(`${serverUrl}/api/student`)
            .then((response) => response.json())
            .then((data) => {
                allRooms = data;
            });
    });
</script>

{#if studentSession == "true"}
    <section class="min-vh-100 backdrop">
        <div class="container py-5">
            <Card title={"All Rooms"} staff={true}>
                <div class="container">
                    <div class="row gap-2">
                        {#each allRooms as room, i}
                            <div class="col my-3">
                                <div class="card">
                                    <img
                                        src={roomImg}
                                        class="card-img-top"
                                        alt="..."
                                    />
                                    <div class="card-body py-2">
                                        <h5 class="card-title">
                                            {room.details.name}
                                        </h5>
                                        <div class="col-md-3">
                                            <label
                                                for="createRoomSize"
                                                class="form-label"
                                                >Room Size:</label
                                            >
                                            {room.details.size}
                                        </div>
                                        <div class="col-md-4">
                                            <label
                                                for="createRoomCapacity"
                                                class="form-label"
                                                >Room Capacity:</label
                                            >
                                            {room.details.capacity}
                                        </div>
                                    </div>

                                    <div class="card-body px-3 py-2" />
                                    <div
                                        class="card-body py-0 hstack gap-3 mb-3"
                                    >
                                        <button
                                            class="btn btn-primary"
                                            data-bs-toggle="modal"
                                            data-bs-target="#viewRoomModal-{room._id}"
                                            >View Room
                                        </button>
                                        <button
                                            class="btn btn-success"
                                            data-bs-toggle="modal"
                                            data-bs-target="#bookRoomModal-{room._id}"
                                            >Book Room
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <ViewModal {room} staff={false} />
                            <BookModal {room} />
                        {/each}
                    </div>
                </div>
            </Card>
        </div>
    </section>
{:else}
    <NoAuth />
{/if}
