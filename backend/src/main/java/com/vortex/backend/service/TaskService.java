package com.vortex.backend.service;

import com.vortex.backend.dto.TaskRequest;
import com.vortex.backend.entity.Task;
import com.vortex.backend.entity.TaskStatus;
import com.vortex.backend.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired; // Import added
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskService {

    private final TaskRepository taskRepository;

    // 1. MANUAL CONSTRUCTOR (Fixes "variable taskService not initialized")
    @Autowired
    public TaskService(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    public Task createTask(TaskRequest request) {
        // 2. MANUAL OBJECT CREATION (Fixes "cannot find symbol method builder")
        Task task = new Task();
        task.setTitle(request.getTitle());
        task.setDescription(request.getDescription());
        task.setStatus(request.getStatus() != null ? request.getStatus() : TaskStatus.TODO);

        return taskRepository.save(task);
    }

    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    public Task getTaskById(Long id) {
        return taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found with id: " + id));
    }

    public Task updateTask(Long id, TaskRequest request) {
        Task existingTask = getTaskById(id);

        // FIX: Only update the title if the user actually sent a new one
        if (request.getTitle() != null && !request.getTitle().isEmpty()) {
            existingTask.setTitle(request.getTitle());
        }

        // FIX: Only update the description if the user actually sent a new one
        if (request.getDescription() != null) {
            existingTask.setDescription(request.getDescription());
        }

        // This one was already correct
        if (request.getStatus() != null) {
            existingTask.setStatus(request.getStatus());
        }

        return taskRepository.save(existingTask);
    }

    public void deleteTask(Long id) {
        taskRepository.deleteById(id);
    }
}