import React, {useEffect} from "react";
import {Link, Outlet, Route, Routes} from "react-router-dom";
import {TaskList} from "./features/tasks/taskList.component";
import {TaskFilter} from "./features/tasks/taskFilter.component";
import {TaskEdit} from "./features/tasks/taskEdit.component";
import {TaskCreate} from "./features/tasks/taskCreate.component";

export function App() {
    return <>
        <div>
            {/* Routes nest inside one another. Nested route paths build upon
                parent route paths, and nested route elements render inside
                parent route elements. See the note about <Outlet> below. */}
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<TaskFilter />} />
                    <Route path="tasks/:userName/list" element={<TaskList />} />
                    <Route path='tasks/new' element={<TaskCreate />} />
                    <Route path='tasks/:taskId/edit' element={<TaskEdit />} />
                    {/* Using path="*"" means "match anything", so this route
                acts like a catch-all for URLs that we don't have explicit
                routes for. */}
                    <Route path="*" element={<NoMatch />} />
                </Route>
            </Routes>
        </div>
        </>;
}

function Layout() {
    return (
        <div>
            {/* An <Outlet> renders whatever child route is currently active,
          so you can think about this <Outlet> as a placeholder for
          the child routes we defined above. */}
            <Outlet />
        </div>
    );
}
function NoMatch() {
    return (
        <div>
            <h2>Nothing to see here.</h2>
            <p>
                <Link to="/">Go to the home page</Link>
            </p>
        </div>
    );
}

export default App;