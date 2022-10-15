<script>
    export let features, title;
</script>

<div class="container px-4 py-3 mb-5 bg-light rounded" id="featured-3">
    <h2 class="pb-2 border-bottom">{title}</h2>
    <div class="row g-4 py-5 row-cols-1 row-cols-lg-3">
        {#each features as feature}
            <div class="feature col">
                <div
                    class="feature-icon d-inline-flex align-items-center justify-content-center text-bg-primary bg-gradient fs-2 mb-3 p-3 rounded"
                >
                    {@html feature.icon}
                </div>
                <h3 class="fs-2">{feature.title}</h3>
                <p>
                    {feature.body}
                </p>
                <a href="">
                    <button class="btn btn-primary">{feature.cta}</button>
                </a>
            </div>
        {/each}
    </div>
</div>
