import Home from "./routes/Home.svelte";
import Staff from "./routes/staff/Staff.svelte";
import Create from "./routes/staff/Create.svelte";

import Student from "./routes/student/Student.svelte";

const router = {
    "/": Home,
    "/staff": Staff,
    "/staff/create": Create,

    "/student": Student,
};

export default router;
