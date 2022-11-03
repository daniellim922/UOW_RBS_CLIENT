import Home from "./routes/Home.svelte";
import Staff from "./routes/staff/Staff.svelte";
import Create from "./routes/staff/Create.svelte";
import Launch from "./routes/staff/Launch.svelte";

import Student from "./routes/student/Student.svelte";
import AllRooms from "./routes/student/AllRooms.svelte";
import MyBookings from "./routes/student/MyBookings.svelte";

const router = {
    "/": Home,
    "/staff": Staff,
    "/staff/create": Create,
    "/staff/launch": Launch,

    "/student": Student,
    "/student/allrooms": AllRooms,
    "/student/bookings": MyBookings,
};

export default router;
