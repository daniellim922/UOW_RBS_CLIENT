<script>
    let staffSession = sessionStorage.getItem("staff");
    import { room } from "../../lib/stores/room.js";
    import {
        localClient,
        localServer,
        prod,
        hostedClient,
        hostedServer,
    } from "../../lib/stores/url.js";

    import NoAuth from "../../lib/shared/NoAuth.svelte";
    import Card from "../../lib/components/Card.svelte";
    import Schedule from "../../lib/components/schedules/Schedule.svelte";

    const floors = ["One", "Two", "Three", "Four", "Five"];

    let clientUrl = null;
    let serverUrl = null;
    if ($prod) {
        clientUrl = $hostedClient;
        serverUrl = $hostedServer;
    } else {
        clientUrl = $localClient;
        serverUrl = $localServer;
    }

    const submitRooms = async () => {
        fetch(`${serverUrl}/api/staff/room/create`, {
            method: "POST", // or 'PUT'
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify($room),
        });
        window.location.assign(`${clientUrl}/#/staff`);
        location.reload();
    };
</script>

{#if staffSession == "true"}
    <section class="min-vh-100 backdrop">
        <div class="container py-5">
            <Card title={"Create a Room"} staff={true}>
                <main class="container">
                    <div class="row">
                        <p class="fw-semibold fs-5 mb-2">Enter room details</p>
                        <div class="col-md-3">
                            <label for="createRoomName" class="form-label"
                                >Room Name</label
                            >
                            <input
                                type="text"
                                class="form-control"
                                id="createRoomName"
                                placeholder="e.g. T5.17a"
                                bind:value={$room.name}
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
                                    bind:value={$room.size}
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
                                    bind:value={$room.capacity}
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
                                bind:value={$room.location.type}
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
                                bind:value={$room.location.floor}
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
                                bind:value={$room.location.unit}
                            />
                        </div>
                    </div>
                    <div class="row mt-4">
                        <Schedule />
                    </div>
                </main>

                <div class="w-100">
                    <button
                        class="btn btn-primary w-100 mt-5 btn-lg"
                        type="button"
                        on:click={submitRooms}>Submit</button
                    >
                </div>
            </Card>
        </div>
    </section>
{:else}
    <NoAuth />
{/if}
