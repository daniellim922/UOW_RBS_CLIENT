<script>
    import { onMount } from "svelte";
    let staffSession = sessionStorage.getItem("staff");
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
    import EditModal from "../../lib/components/room/EditModal.svelte";

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
        await fetch(`${serverUrl}/api/staff/room/launch`)
            .then((response) => response.json())
            .then((data) => {
                allRooms = data;
            });
    });
    const updateAvailability = async (id) => {
        const res = await fetch(`${serverUrl}/api/staff/room/launch`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ id }),
        });
    };
    const deleteRoom = async (i) => {
        const id = allRooms[i]._id;
        const req = await fetch(`${serverUrl}/api/staff`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ id }),
        });
        const res = await req.json();
        if (res) {
            await fetch(`${serverUrl}/api/staff/room/launch`)
                .then((response) => response.json())
                .then((data) => {
                    allRooms = data;
                });
        }
    };
</script>

{#if staffSession == "true"}
    <section class="min-vh-100 backdrop">
        <div class="container py-5">
            <Card title={"Launch a Room"} staff={true}>
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
                                    </div>

                                    <div class="card-body px-3 py-2">
                                        {#if room.details.available}
                                            <div class="form-check form-switch">
                                                <input
                                                    class="form-check-input"
                                                    type="checkbox"
                                                    id="flexSwitchCheckDefault"
                                                    checked
                                                    on:click={() =>
                                                        updateAvailability(
                                                            room._id
                                                        )}
                                                />
                                                <label
                                                    class="form-check-label"
                                                    for="flexSwitchCheckDefault"
                                                    >Availability</label
                                                >
                                            </div>
                                        {:else}
                                            <div class="form-check form-switch">
                                                <input
                                                    class="form-check-input"
                                                    type="checkbox"
                                                    id="flexSwitchCheckDefault"
                                                    on:click={() =>
                                                        updateAvailability(
                                                            room._id
                                                        )}
                                                />
                                                <label
                                                    class="form-check-label"
                                                    for="flexSwitchCheckDefault"
                                                    >Availability</label
                                                >
                                            </div>
                                        {/if}
                                    </div>
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
                                            data-bs-target="#editRoomModal-{room._id}"
                                            >Edit Room
                                        </button>
                                        <button
                                            class="btn btn-danger"
                                            on:click={() => deleteRoom(i)}
                                            >Delete Room
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <ViewModal {room} staff={true} />
                            <EditModal {room} />
                        {/each}
                    </div>
                </div>
            </Card>
        </div>
    </section>
{:else}
    <NoAuth />
{/if}
