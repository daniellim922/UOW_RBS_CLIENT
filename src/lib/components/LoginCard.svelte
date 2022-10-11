<script>
    export let imgSrc;
</script>

<div class="card shadow border-0">
    <img src={imgSrc} class="card-img-top" alt="..." style="height: 20rem;" />
    <div class="card-body">
        <slot />
    </div>
</div>
