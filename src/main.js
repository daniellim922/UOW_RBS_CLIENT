import "./app.css";
import "./main.css";
import "bootstrap/dist/js/bootstrap";
import App from "./App.svelte";

const app = new App({
    target: document.getElementById("app"),
});

export default app;
