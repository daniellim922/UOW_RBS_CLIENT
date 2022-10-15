<script>
    import { localClient, prod, hostedClient } from "../../lib/stores/url.js";

    let clientUrl = null;

    if ($prod) {
        clientUrl = $hostedClient;
    } else {
        clientUrl = $localClient;
    }

    const logout = () => {
        sessionStorage.clear();
        window.location.assign(`${clientUrl}/`);
    };
</script>

<main class="hstack">
    <div class="hstack gap-5">
        <a href="#/staff/create" class="text-decoration-none">
            <button class="btn btn-outline-primary btn-lg hstack gap-3">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    class="bi bi-calendar-date"
                    viewBox="0 0 16 16"
                >
                    <path
                        d="M6.445 11.688V6.354h-.633A12.6 12.6 0 0 0 4.5 7.16v.695c.375-.257.969-.62 1.258-.777h.012v4.61h.675zm1.188-1.305c.047.64.594 1.406 1.703 1.406 1.258 0 2-1.066 2-2.871 0-1.934-.781-2.668-1.953-2.668-.926 0-1.797.672-1.797 1.809 0 1.16.824 1.77 1.676 1.77.746 0 1.23-.376 1.383-.79h.027c-.004 1.316-.461 2.164-1.305 2.164-.664 0-1.008-.45-1.05-.82h-.684zm2.953-2.317c0 .696-.559 1.18-1.184 1.18-.601 0-1.144-.383-1.144-1.2 0-.823.582-1.21 1.168-1.21.633 0 1.16.398 1.16 1.23z"
                    />
                    <path
                        d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z"
                    />
                </svg>
                Create new room
            </button>
        </a>
        <a href="#/staff/launch" class="text-decoration-none">
            <button class="btn btn-outline-primary btn-lg hstack gap-3">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    class="bi bi-broadcast"
                    viewBox="0 0 16 16"
                >
                    <path
                        d="M3.05 3.05a7 7 0 0 0 0 9.9.5.5 0 0 1-.707.707 8 8 0 0 1 0-11.314.5.5 0 0 1 .707.707zm2.122 2.122a4 4 0 0 0 0 5.656.5.5 0 1 1-.708.708 5 5 0 0 1 0-7.072.5.5 0 0 1 .708.708zm5.656-.708a.5.5 0 0 1 .708 0 5 5 0 0 1 0 7.072.5.5 0 1 1-.708-.708 4 4 0 0 0 0-5.656.5.5 0 0 1 0-.708zm2.122-2.12a.5.5 0 0 1 .707 0 8 8 0 0 1 0 11.313.5.5 0 0 1-.707-.707 7 7 0 0 0 0-9.9.5.5 0 0 1 0-.707zM10 8a2 2 0 1 1-4 0 2 2 0 0 1 4 0z"
                    />
                </svg>
                Launch new room
            </button>
        </a>
    </div>
    <div class="ms-auto">
        <button
            class="btn btn-outline-danger btn-lg hstack gap-3"
            on:click={logout}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                class="bi bi-power"
                viewBox="0 0 16 16"
            >
                <path d="M7.5 1v7h1V1h-1z" />
                <path
                    d="M3 8.812a4.999 4.999 0 0 1 2.578-4.375l-.485-.874A6 6 0 1 0 11 3.616l-.501.865A5 5 0 1 1 3 8.812z"
                />
            </svg>
            Logout
        </button>
    </div>
</main>
