<script>
    let staffSession = sessionStorage.getItem("staff");
    import Card from "../../lib/components/Card.svelte";
    import NoAuth from "../../lib/shared/NoAuth.svelte";

    import Menu from "./Menu.svelte";
    import roomImg from "../../assets/room.jpeg";

    import { onMount } from "svelte";
    import {
        localClient,
        localServer,
        prod,
        hostedClient,
        hostedServer,
    } from "../../lib/stores/url.js";

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
        await fetch(`${serverUrl}/api/staff`)
            .then((response) => response.json())
            .then((data) => {
                data.forEach((el) => {
                    allRooms.push(el);
                });
                allRooms = allRooms;
            });
    });
</script>

{#if staffSession == "true"}
    <section class="backdrop min-vh-100">
        <div class="container vstack gap-5 pt-5">
            <Card title={"Dashboard"} staff={true}>
                <Menu />
            </Card>
            <div class="card">
                <div class="card-body">
                    <h2 class="card-title">All Rooms</h2>
                    <div class="container">
                        <div class="row row-cols-4 gap-3">
                            {#each allRooms as room, i}
                                <div class="col">
                                    <div class="card pb-3">
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
                                    </div>
                                </div>
                            {/each}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
{:else}
    <NoAuth />
{/if}
