import React, { useState, useEffect } from "react";
import {
  db,
  ref,
  set,
  get,
  auth,
  logoutUser,
  removeUserTasks,
} from "./firebase";
import { User } from "firebase/auth";
import TaskItem from "./components/TaskItem";
import TaskForm from "./components/TaskForm";
import Login from "./components/Login";
import Register from "./components/Register";
import "./App.css";

interface Task {
  id: string;
  title: string;
  description?: string;
  dueDate?: string; // Ensure dueDate is always string or undefined
  createdAt?: string;
  completed: boolean;
  updatedAt?: number;
}

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [showCompleted, setShowCompleted] = useState<boolean>(true);
  const [user, setUser] = useState<User | null>(null);
  const [isLogin, setIsLogin] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchTasks = async () => {
      if (!user) return;

      const taskRef = ref(db, `tasks/${user.uid}`);
      const snapshot = await get(taskRef);
      if (snapshot.exists()) {
        const tasksData: Task[] = [];
        snapshot.forEach((childSnapshot) => {
          const task = childSnapshot.val();
          tasksData.push({ id: childSnapshot.key, ...task });
        });
        tasksData.sort((a, b) => {
          const dateA = a.dueDate || a.createdAt;
          const dateB = b.dueDate || b.createdAt;
          return new Date(dateA!).getTime() - new Date(dateB!).getTime();
        });
        setTasks(tasksData);
      } else {
        setTasks([]);
      }
    };

    fetchTasks();
  }, [user]);

  const handleLogout = async () => {
    try {
      await logoutUser();
      setUser(null);
      setIsLogin(true);
      setTasks([]);
    } catch (error: any) {
      console.error("Logout failed: ", error.message);
    }
  };

  const addTask = async (task: Omit<Task, "id">) => {
    try {
      if (!user) return;

      const taskId = Date.now().toString();
      const taskRef = ref(db, `tasks/${user.uid}/${taskId}`);
      const newTask: Task = { id: taskId, ...task };
      await set(taskRef, newTask);

      setTasks((prevTasks) => {
        const updatedTasks = [newTask, ...prevTasks];
        updatedTasks.sort((a, b) => {
          const dateA = a.dueDate || a.createdAt;
          const dateB = b.dueDate || b.createdAt;
          return new Date(dateA!).getTime() - new Date(dateB!).getTime();
        });
        return updatedTasks;
      });
    } catch (e) {
      console.error("Error adding task: ", e);
    }
  };

  const deleteTask = async (id: string) => {
    try {
      if (!user) return;

      const taskRef = ref(db, `tasks/${user.uid}/${id}`);
      await set(taskRef, null);
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    } catch (e) {
      console.error("Error deleting task: ", e);
    }
  };

  const toggleTaskCompletion = async (id: string) => {
    const task = tasks.find((task) => task.id === id);
    if (task) {
      const updatedTask = {
        ...task,
        completed: !task.completed,
        updatedAt: Date.now(),
      };
      const taskRef = ref(db, `tasks/${user.uid}/${id}`);
      await set(taskRef, updatedTask);

      setTasks((prevTasks) =>
        prevTasks.map((t) => (t.id === id ? updatedTask : t))
      );
    }
  };

  const handleToggleCompleted = () => {
    setShowCompleted(!showCompleted);
  };

  const handleDeleteAccount = async () => {
    if (
      window.confirm("Are you sure you want to delete your account and all tasks?")
    ) {
      try {
        if (user) {
          await removeUserTasks(user.uid);
          await user.delete();
          setUser(null);
          setTasks([]);
          setIsLogin(true);
        }
      } catch (error) {
        console.error("Error deleting account: ", error);
      }
    }
  };

  return (
    <div className="app">
      {user ? (
        <>
          <h1>Task Manager</h1>
          <div className="user-info">
            <span>Welcome, {user.email}</span>
            <button className="logout-icon" onClick={handleLogout}>
              <span className="material-icons">logout</span>
            </button>
          </div>
          <TaskForm onSave={addTask} />
          <div className="task-container">
            <div className="task-section active-tasks">
              <h2>Tasks</h2>
              <div className="task-list">
                {tasks.filter((task) => !task.completed).map((task) => (
                  <TaskItem
                    key={task.id}
                    task={task}
                    onToggleComplete={toggleTaskCompletion}
                    onDelete={deleteTask}
                  />
                ))}
              </div>
            </div>
            <div className="task-section completed-tasks">
              <h2>
                Completed
                <button
                  onClick={handleToggleCompleted}
                  className="toggle-completed-btn"
                >
                  <span className="material-icons">
                    {showCompleted ? "expand_more" : "chevron_right"}
                  </span>
                </button>
              </h2>
              {showCompleted && (
                <div className="task-list">
                  {tasks.filter((task) => task.completed).map((task) => (
                    <TaskItem
                      key={task.id}
                      task={task}
                      onToggleComplete={toggleTaskCompletion}
                      onDelete={deleteTask}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
          <button className="delete-account-btn" onClick={handleDeleteAccount}>
            Delete Account
          </button>
        </>
      ) : isLogin ? (
        <Login onAuthSuccess={() => setUser(auth.currentUser)} setIsLogin={setIsLogin} />
      ) : (
        <Register onAuthSuccess={() => setUser(auth.currentUser)} setIsLogin={setIsLogin} />
      )}
    </div>
  );
};

export default App;
