<script>
    let staffSession = sessionStorage.getItem("staff");
    import Card from "../../lib/components/Card.svelte";
    import NoAuth from "../../lib/shared/NoAuth.svelte";

    import createRoom from "../../assets/createRoom.jpeg";
</script>

{#if staffSession == "true"}
    <section class="backdrop min-vh-100">
        <div class="container pt-5">
            <Card title={"Dashboard"} staff={false}>
                <div class="card" style="width: 18rem;">
                    <img src={createRoom} class="card-img-top" alt="..." />
                    <div class="card-body">
                        <h5 class="card-title">Create a Room</h5>
                        <p class="card-text">
                            Create a room in UOW for bookings
                        </p>
                        <a href="#/staff/create" class="btn btn-primary"
                            >Create Now</a
                        >
                    </div>
                </div>
            </Card>
        </div>
    </section>
{:else}
    <NoAuth />
{/if}
