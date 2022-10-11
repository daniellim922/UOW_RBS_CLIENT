import Home from "./routes/Home.svelte";
import Login from "./routes/login/Login.svelte";

import Staff from "./routes/staff/Staff.svelte";
import Create from "./routes/staff/Create.svelte";

import Student from "./routes/student/Student.svelte";

const router = {
    "/": Home,
    "/login": Login,
    "/staff": Staff,
    "/staff/create": Create,

    "/student": Student,
};

export default router;
