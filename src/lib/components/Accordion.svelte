<script>
    export let title, index, show;
</script>

<div class="accordion" id="accordionPanelsStayOpenExample">
    <div class="accordion-item">
        <h2 class="accordion-header" id="panelsStayOpen-headingOne">
            <button
                class="accordion-button"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#panelsStayOpen-{title}-{index}"
                aria-expanded="true"
                aria-controls="panelsStayOpen-{title}-{index}"
            >
                {#if title == ""}
                    Room {index + 1}
                {:else}
                    {title}
                {/if}
            </button>
        </h2>
        <div
            id="panelsStayOpen-{title}-{index}"
            class="accordion-collapse collapse"
            class:show={show === true}
            aria-labelledby="panelsStayOpen-headingOne"
        >
            <div class="accordion-body py-3 mb-3">
                <slot />
            </div>
        </div>
    </div>
</div>
