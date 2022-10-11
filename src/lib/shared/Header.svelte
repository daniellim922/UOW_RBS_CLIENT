<script>
    import uowLogo from "../../assets/uowLogo.png";
    let studentSession = sessionStorage.getItem("student");
    let staffSession = sessionStorage.getItem("staff");

    const logout = () => {
        sessionStorage.clear();
        window.location.assign("http://127.0.0.1:5173/");
    };
</script>

<header class="navbar navbar-expand-lg bg-light mx-3">
    <a class="navbar-brand d-flex align-items-center gap-3" href="#/">
        <img src={uowLogo} alt="UOW Logo" width="120" height="50" />
        <h5 class="m-0">Room Booking System</h5>
    </a>
    <div class="collapse navbar-collapse " id="navbarNav">
        <ul class="navbar-nav">
            {#if staffSession || studentSession}
                <li class="nav-item">
                    <a class="nav-link" on:click={logout} href="/">Logout</a>
                </li>
                <slot />
            {:else}
                <li class="nav-item">
                    <a class="nav-link active" aria-current="page" href="#/"
                        >Home</a
                    >
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#/login">Login</a>
                </li>
            {/if}
        </ul>
    </div>
    <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
    >
        <span class="navbar-toggler-icon" />
    </button>
</header>
