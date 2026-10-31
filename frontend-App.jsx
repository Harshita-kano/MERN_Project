import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {

    // =========================
    // RESOURCE STATES
    // =========================

    const [resources, setResources] = useState([]);
    const [resourceSearch, setResourceSearch] = useState("");
    const [editingResourceId, setEditingResourceId] = useState(null);

    const [resource, setResource] = useState({
        title: "",
        subject: "",
        type: "",
        link: ""
    });


    // =========================
    // TASK STATES
    // =========================

    const [tasks, setTasks] = useState([]);
    const [taskSearch, setTaskSearch] = useState("");
    const [editingTaskId, setEditingTaskId] = useState(null);

    const [task, setTask] = useState({
        title: "",
        subject: "",
        deadline: "",
        priority: "",
        status: "Pending"
    });


    // =========================
    // GET DATA
    // =========================

    const getResources = async () => {
        try {
            const res = await axios.get(
                "http://localhost:3000/resources"
            );

            setResources(res.data);
        } catch (error) {
            alert("Unable to load resources");
        }
    };


    const getTasks = async () => {
        try {
            const res = await axios.get(
                "http://localhost:3000/tasks"
            );

            setTasks(res.data);
        } catch (error) {
            alert("Unable to load tasks");
        }
    };


    useEffect(() => {
        getResources();
        getTasks();
    }, []);


    // =========================
    // RESOURCE FUNCTIONS
    // =========================

    const saveResource = async (e) => {

        e.preventDefault();

        if (
            !resource.title ||
            !resource.subject ||
            !resource.type ||
            !resource.link
        ) {
            alert("Please fill all resource fields");
            return;
        }

        try {
            new URL(resource.link);
        } catch {
            alert("Please enter a valid resource link");
            return;
        }

        try {

            if (editingResourceId) {

                await axios.put(
                    `http://localhost:3000/resources/${editingResourceId}`,
                    resource
                );

                alert("Resource updated successfully");

            } else {

                await axios.post(
                    "http://localhost:3000/resources",
                    resource
                );

                alert("Resource added successfully");
            }

            setResource({
                title: "",
                subject: "",
                type: "",
                link: ""
            });

            setEditingResourceId(null);

            getResources();

        } catch (error) {

            alert("Error saving resource");
        }
    };


    const editResource = (item) => {

        setResource({
            title: item.title,
            subject: item.subject,
            type: item.type,
            link: item.link
        });

        setEditingResourceId(item._id);
    };


    const cancelResourceEdit = () => {

        setEditingResourceId(null);

        setResource({
            title: "",
            subject: "",
            type: "",
            link: ""
        });
    };


    const deleteResource = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this resource?"
        );

        if (!confirmDelete) {
            return;
        }

        try {

            await axios.delete(
                `http://localhost:3000/resources/${id}`
            );

            alert("Resource deleted successfully");

            getResources();

        } catch (error) {

            alert("Error deleting resource");
        }
    };


    // =========================
    // TASK FUNCTIONS
    // =========================

    const saveTask = async (e) => {

        e.preventDefault();

        if (
            !task.title ||
            !task.subject ||
            !task.deadline ||
            !task.priority ||
            !task.status
        ) {
            alert("Please fill all task fields");
            return;
        }

        try {

            if (editingTaskId) {

                await axios.put(
                    `http://localhost:3000/tasks/${editingTaskId}`,
                    task
                );

                alert("Task updated successfully");

            } else {

                await axios.post(
                    "http://localhost:3000/tasks",
                    task
                );

                alert("Task added successfully");
            }

            setTask({
                title: "",
                subject: "",
                deadline: "",
                priority: "",
                status: "Pending"
            });

            setEditingTaskId(null);

            getTasks();

        } catch (error) {

            alert("Error saving task");
        }
    };


    const editTask = (item) => {

        setTask({
            title: item.title,
            subject: item.subject,
            deadline: item.deadline,
            priority: item.priority,
            status: item.status
        });

        setEditingTaskId(item._id);
    };


    const cancelTaskEdit = () => {

        setEditingTaskId(null);

        setTask({
            title: "",
            subject: "",
            deadline: "",
            priority: "",
            status: "Pending"
        });
    };


    const deleteTask = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this task?"
        );

        if (!confirmDelete) {
            return;
        }

        try {

            await axios.delete(
                `http://localhost:3000/tasks/${id}`
            );

            alert("Task deleted successfully");

            getTasks();

        } catch (error) {

            alert("Error deleting task");
        }
    };


    // =========================
    // SEARCH
    // =========================

    const filteredResources = resources.filter((item) =>

        item.title
            .toLowerCase()
            .includes(resourceSearch.toLowerCase()) ||

        item.subject
            .toLowerCase()
            .includes(resourceSearch.toLowerCase())

    );


    const filteredTasks = tasks.filter((item) =>

        item.title
            .toLowerCase()
            .includes(taskSearch.toLowerCase()) ||

        item.subject
            .toLowerCase()
            .includes(taskSearch.toLowerCase())

    );


    // =========================
    // PAGE
    // =========================

    return (

        <div>

            <h1>StudySync</h1>

            <p>
                Digital Study Resource & Academic Task Management System
            </p>


            {/* =========================
                RESOURCE SECTION
            ========================= */}

            <h2>Study Resource Manager</h2>

            <form onSubmit={saveResource}>

                <input
                    type="text"
                    placeholder="Resource Title"
                    value={resource.title}
                    onChange={(e) =>
                        setResource({
                            ...resource,
                            title: e.target.value
                        })
                    }
                />

                <input
                    type="text"
                    placeholder="Subject"
                    value={resource.subject}
                    onChange={(e) =>
                        setResource({
                            ...resource,
                            subject: e.target.value
                        })
                    }
                />

                <select
                    value={resource.type}
                    onChange={(e) =>
                        setResource({
                            ...resource,
                            type: e.target.value
                        })
                    }
                >

                    <option value="">
                        Select Resource Type
                    </option>

                    <option value="Notes">
                        Notes
                    </option>

                    <option value="PDF">
                        PDF
                    </option>

                    <option value="Website">
                        Website
                    </option>

                    <option value="Video">
                        Video
                    </option>

                </select>

                <input
                    type="text"
                    placeholder="Resource Link"
                    value={resource.link}
                    onChange={(e) =>
                        setResource({
                            ...resource,
                            link: e.target.value
                        })
                    }
                />

                <button type="submit">

                    {editingResourceId
                        ? "Update Resource"
                        : "Add Resource"}

                </button>

                {editingResourceId && (

                    <button
                        type="button"
                        onClick={cancelResourceEdit}
                    >
                        Cancel
                    </button>

                )}

            </form>


            <h3>Search Resources</h3>

            <input
                type="text"
                placeholder="Search by title or subject"
                value={resourceSearch}
                onChange={(e) =>
                    setResourceSearch(e.target.value)
                }
            />


            <h3>My Study Resources</h3>

            {filteredResources.length === 0 ? (

                <p>No resources found.</p>

            ) : (

                filteredResources.map((item) => (

                    <div key={item._id}>

                        <h3>{item.title}</h3>

                        <p>
                            Subject: {item.subject}
                        </p>

                        <p>
                            Type: {item.type}
                        </p>

                        <a
                            href={item.link}
                            target="_blank"
                            rel="noreferrer"
                        >
                            Open Resource
                        </a>

                        <br />

                        <button
                            onClick={() =>
                                editResource(item)
                            }
                        >
                            Edit
                        </button>

                        <button
                            onClick={() =>
                                deleteResource(item._id)
                            }
                        >
                            Delete
                        </button>

                    </div>

                ))

            )}


            {/* =========================
                TASK SECTION
            ========================= */}

            <h2>Academic Task & Deadline Manager</h2>

            <form onSubmit={saveTask}>

                <input
                    type="text"
                    placeholder="Task Title"
                    value={task.title}
                    onChange={(e) =>
                        setTask({
                            ...task,
                            title: e.target.value
                        })
                    }
                />

                <input
                    type="text"
                    placeholder="Subject"
                    value={task.subject}
                    onChange={(e) =>
                        setTask({
                            ...task,
                            subject: e.target.value
                        })
                    }
                />

                <input
                    type="date"
                    value={task.deadline}
                    onChange={(e) =>
                        setTask({
                            ...task,
                            deadline: e.target.value
                        })
                    }
                />

                <select
                    value={task.priority}
                    onChange={(e) =>
                        setTask({
                            ...task,
                            priority: e.target.value
                        })
                    }
                >

                    <option value="">
                        Select Priority
                    </option>

                    <option value="Low">
                        Low
                    </option>

                    <option value="Medium">
                        Medium
                    </option>

                    <option value="High">
                        High
                    </option>

                </select>


                <select
                    value={task.status}
                    onChange={(e) =>
                        setTask({
                            ...task,
                            status: e.target.value
                        })
                    }
                >

                    <option value="Pending">
                        Pending
                    </option>

                    <option value="Completed">
                        Completed
                    </option>

                </select>


                <button type="submit">

                    {editingTaskId
                        ? "Update Task"
                        : "Add Task"}

                </button>


                {editingTaskId && (

                    <button
                        type="button"
                        onClick={cancelTaskEdit}
                    >
                        Cancel
                    </button>

                )}

            </form>


            <h3>Search Tasks</h3>

            <input
                type="text"
                placeholder="Search by title or subject"
                value={taskSearch}
                onChange={(e) =>
                    setTaskSearch(e.target.value)
                }
            />


            <h3>My Academic Tasks</h3>

            {filteredTasks.length === 0 ? (

                <p>No tasks found.</p>

            ) : (

                filteredTasks.map((item) => (

                    <div key={item._id}>

                        <h3>{item.title}</h3>

                        <p>
                            Subject: {item.subject}
                        </p>

                        <p>
                            Deadline: {item.deadline}
                        </p>

                        <p>
                            Priority: {item.priority}
                        </p>

                        <p>
                            Status: {item.status}
                        </p>

                        <button
                            onClick={() =>
                                editTask(item)
                            }
                        >
                            Edit
                        </button>

                        <button
                            onClick={() =>
                                deleteTask(item._id)
                            }
                        >
                            Delete
                        </button>

                    </div>

                ))

            )}

        </div>
    );
}

export default App;
