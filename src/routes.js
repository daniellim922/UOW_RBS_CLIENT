import Home from "./routes/Home.svelte";
import Staff from "./routes/staff/Staff.svelte";
import Create from "./routes/staff/Create.svelte";
import Launch from "./routes/staff/Launch.svelte";

import Student from "./routes/student/Student.svelte";

const router = {
    "/": Home,
    "/staff": Staff,
    "/staff/create": Create,
    "/staff/launch": Launch,

    "/student": Student,
};

export default router;
