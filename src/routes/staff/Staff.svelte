<script>
    let staffSession = sessionStorage.getItem("staff");
    import Card from "../../lib/components/Card.svelte";
    import NoAuth from "../../lib/shared/NoAuth.svelte";

    import Menu from "./Menu.svelte";
</script>

{#if staffSession == "true"}
    <section class="backdrop min-vh-100">
        <div class="container pt-5">
            <Card title={"Dashboard"} staff={false}>
                <Menu />
            </Card>
        </div>
    </section>
{:else}
    <NoAuth />
{/if}
