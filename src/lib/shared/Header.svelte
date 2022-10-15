<script>
    import uowLogo from "../../assets/logo/uowLogo.png";
</script>

<header class="navbar navbar-expand-lg bg-light mx-3">
    <a class="navbar-brand d-flex align-items-center gap-3" href="#/">
        <img src={uowLogo} alt="UOW Logo" width="120" height="50" />
        <h5 class="m-0">Room Booking System</h5>
    </a>
    <div class="collapse navbar-collapse " id="navbarNav">
        <ul class="navbar-nav">
            <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="#/">Home</a
                >
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#/login">Login</a>
            </li>
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
