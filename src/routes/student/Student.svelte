<script>
    import NoAuth from "../../lib/shared/NoAuth.svelte";
    let studentSession = sessionStorage.getItem("student");
</script>

{#if studentSession == "true"}
    <h1>Hello Students!</h1>
{:else}
    <NoAuth />
{/if}
