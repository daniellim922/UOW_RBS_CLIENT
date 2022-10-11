<script>
    import LoginCard from "../../lib/components/LoginCard.svelte";
    import uowLogoBig from "../../assets/logo/uowLogoBig.png";

    import { url } from "../../lib/stores/url.js";

    let error = {
        formInputs: false,
        fetchResult: false,
    };
    let user = {
        username: null,
        password: null,
        status: null,
    };

    const postReq = async (status) => {
        const res = await fetch(`${$url}/api/user/${status}`, {
            method: "POST", // or 'PUT'
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        });
        const data = await res.json();
        if (data.student_details) {
            sessionStorage.clear();
            sessionStorage.setItem("student", "true");
            window.location.assign(`${$url}/#/student`);
        } else if (data.staff_details) {
            sessionStorage.clear();
            sessionStorage.setItem("staff", "true");
            window.location.assign(`${$url}/#/staff`);
        } else {
            error.fetchResult = true;
        }
    };

    const submitForm = async () => {
        if (user.status == "student") {
            postReq("student");
        } else if (user.status == "staff") {
            postReq("staff");
        } else if (!user.username || !user.password || !user.status) {
            error.formInputs = true;
        }
    };
</script>

<section class="min-vh-100 backdrop d-flex align-items-center">
    <div class="container d-flex justify-content-center">
        <main class="w-50">
            <LoginCard imgSrc={uowLogoBig}>
                <form class="px-3 my-3">
                    <div class="form-floating mb-3">
                        <input
                            type="text"
                            class="form-control"
                            id="usernameInput"
                            placeholder="username"
                            bind:value={user.username}
                        />
                        <label for="usernameInput">Username</label>
                    </div>
                    <div class="form-floating mb-3">
                        <input
                            type="password"
                            class="form-control"
                            id="passwordInput"
                            placeholder="Password"
                            bind:value={user.password}
                        />
                        <label for="passwordInput">Password</label>
                    </div>
                    <div class="form-check">
                        <input
                            class="form-check-input"
                            type="radio"
                            name="userType"
                            id="flexRadioDefault1"
                            bind:group={user.status}
                            value="student"
                        />
                        <label class="form-check-label" for="flexRadioDefault1">
                            Student
                        </label>
                    </div>
                    <div class="form-check mb-3">
                        <input
                            class="form-check-input"
                            type="radio"
                            name="userType"
                            id="flexRadioDefault2"
                            bind:group={user.status}
                            value="staff"
                        />
                        <label class="form-check-label" for="flexRadioDefault2">
                            Staff
                        </label>
                    </div>
                    {#if error.formInputs}
                        <div
                            class="alert alert-danger alert-dismissible fade show mt-3"
                            role="alert"
                        >
                            <strong>Please fill in all fields!</strong> You
                            should check in on some of those fields above.
                            <button
                                type="button"
                                class="btn-close"
                                data-bs-dismiss="alert"
                                aria-label="Close"
                                on:click={() => {
                                    error.formInputs = false;
                                }}
                            />
                        </div>
                    {/if}
                    {#if error.fetchResult}
                        <div
                            class="alert alert-danger alert-dismissible fade show mt-3"
                            role="alert"
                        >
                            <strong>Login failed!</strong> Username or Password
                            are wrong
                            <button
                                type="button"
                                class="btn-close"
                                data-bs-dismiss="alert"
                                aria-label="Close"
                                on:click={() => {
                                    error.fetchResult = false;
                                }}
                            />
                        </div>
                    {/if}
                    <a href="#/reset" class="text-decoration-none"
                        >Forgot username or password?</a
                    >
                    <button
                        type="button"
                        on:click={submitForm}
                        class="w-100 btn-lg btn btn-primary mt-3">Login</button
                    >
                </form>
            </LoginCard>
        </main>
    </div>
</section>
