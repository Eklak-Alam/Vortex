"use client";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { taskService } from "@/services/taskService";
import { Plus, Trash2, CheckCircle, Clock, AlertCircle, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const TaskDashboard = () => {
  const queryClient = useQueryClient();
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskDesc, setNewTaskDesc] = useState("");

  // 1. READ: Fetch All Tasks
  const { data: tasks, isLoading, isError } = useQuery({
    queryKey: ["tasks"],
    queryFn: taskService.getAll,
  });

  // 2. CREATE: Add Task Mutation
  const createMutation = useMutation({
    mutationFn: taskService.create,
    onSuccess: () => {
      queryClient.invalidateQueries(["tasks"]); // Refresh list instantly
      setNewTaskTitle("");
      setNewTaskDesc("");
    },
  });

  // 3. DELETE: Remove Task Mutation
  const deleteMutation = useMutation({
    mutationFn: taskService.delete,
    onSuccess: () => queryClient.invalidateQueries(["tasks"]),
  });

  // 4. UPDATE: Change Status Mutation
  const updateMutation = useMutation({
    mutationFn: ({ id, status }) =>
      taskService.update(id, { status }), // Only sending status update
    onSuccess: () => queryClient.invalidateQueries(["tasks"]),
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;
    createMutation.mutate({
      title: newTaskTitle,
      description: newTaskDesc,
      status: "TODO",
    });
  };

  // Helper to get status color
  const getStatusColor = (status) => {
    switch (status) {
      case "DONE": return "text-green-400 border-green-400/20 bg-green-400/10";
      case "IN_PROGRESS": return "text-yellow-400 border-yellow-400/20 bg-yellow-400/10";
      default: return "text-slate-400 border-slate-700 bg-slate-800";
    }
  };

  return (
    <section className="bg-slate-950 py-20 border-t border-slate-900" id="dashboard">
      <div className="container mx-auto px-6 max-w-5xl">
        
        {/* Header */}
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-2">Mission Control</h2>
          <p className="text-slate-400">Real-time Interface with Java Backend API</p>
        </div>

        {/* 1. CREATE FORM */}
        <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl mb-12 shadow-xl backdrop-blur-sm">
          <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              placeholder="Operation Name (Task Title)"
              className="flex-1 bg-slate-950 border border-slate-800 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-cyan-500 transition"
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
            />
            <input
              type="text"
              placeholder="Briefing (Description)"
              className="flex-1 bg-slate-950 border border-slate-800 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-cyan-500 transition"
              value={newTaskDesc}
              onChange={(e) => setNewTaskDesc(e.target.value)}
            />
            <button
              disabled={createMutation.isPending}
              className="bg-cyan-600 hover:bg-cyan-500 text-white px-8 py-3 rounded-lg font-bold flex items-center justify-center gap-2 transition disabled:opacity-50"
            >
              {createMutation.isPending ? <Loader2 className="animate-spin" /> : <Plus />}
              Initialize
            </button>
          </form>
        </div>

        {/* 2. TASK LIST DISPLAY */}
        <div className="space-y-4">
          {isLoading && (
            <div className="text-center py-10 text-slate-500">
              <Loader2 className="h-8 w-8 animate-spin mx-auto mb-2" /> Connecting to Mainframe...
            </div>
          )}

          {isError && (
            <div className="text-center py-10 text-red-400 bg-red-900/10 rounded-xl border border-red-900/20">
              <AlertCircle className="h-8 w-8 mx-auto mb-2" />
              Connection Lost. Ensure Backend Container is Active.
            </div>
          )}

          <AnimatePresence>
            {tasks?.map((task) => (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, height: 0 }}
                className="group flex flex-col md:flex-row items-center justify-between p-5 bg-slate-900 border border-slate-800 rounded-xl hover:border-cyan-500/30 transition shadow-lg"
              >
                {/* Task Info */}
                <div className="flex-1 w-full mb-4 md:mb-0">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className={`font-bold text-lg ${task.status === 'DONE' ? 'text-slate-500 line-through' : 'text-white'}`}>
                      {task.title}
                    </h3>
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${getStatusColor(task.status)}`}>
                      {task.status}
                    </span>
                  </div>
                  <p className="text-slate-400 text-sm">{task.description}</p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3">
                  {/* Status Toggles */}
                  {task.status !== 'DONE' && (
                    <button
                      onClick={() => updateMutation.mutate({ id: task.id, status: "DONE" })}
                      className="p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-green-400 hover:bg-green-900/20 transition"
                      title="Mark Complete"
                    >
                      <CheckCircle className="h-5 w-5" />
                    </button>
                  )}
                  
                  {task.status === 'TODO' && (
                    <button
                      onClick={() => updateMutation.mutate({ id: task.id, status: "IN_PROGRESS" })}
                      className="p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-yellow-400 hover:bg-yellow-900/20 transition"
                      title="Mark In Progress"
                    >
                      <Clock className="h-5 w-5" />
                    </button>
                  )}

                  {/* Delete Button */}
                  <button
                    onClick={() => deleteMutation.mutate(task.id)}
                    className="p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-red-400 hover:bg-red-900/20 transition group-hover:bg-slate-800"
                    title="Terminate Protocol"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {tasks?.length === 0 && !isLoading && (
             <div className="text-center py-10 text-slate-600 italic border border-dashed border-slate-800 rounded-xl">
               No active operations found. Initialize a new protocol above.
             </div>
          )}
        </div>

      </div>
    </section>
  );
};

export default TaskDashboard;