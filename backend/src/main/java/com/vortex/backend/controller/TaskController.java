package com.vortex.backend.controller;

import com.vortex.backend.dto.TaskRequest;
import com.vortex.backend.entity.Task;
import com.vortex.backend.service.TaskService;
import com.vortex.backend.utils.ApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/tasks")
// We allow CORS here, but the SecurityConfig we wrote earlier also handles it globally.
// Keeping it here is a safe double-check for local testing.
@CrossOrigin(origins = "*")
public class TaskController {

    private final TaskService taskService;

    // --- ADD THIS CONSTRUCTOR MANUALLY ---
    @Autowired
    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }
    // -------------------------------------

    // 1. CREATE TASK
    @PostMapping
    public ResponseEntity<ApiResponse<Task>> createTask(@RequestBody TaskRequest request) {
        Task createdTask = taskService.createTask(request);
        return new ResponseEntity<>(
                ApiResponse.success("Task created successfully", createdTask),
                HttpStatus.CREATED
        );
    }

    // 2. GET ALL TASKS
    @GetMapping
    public ResponseEntity<ApiResponse<List<Task>>> getAllTasks() {
        List<Task> tasks = taskService.getAllTasks();
        return ResponseEntity.ok(
                ApiResponse.success("Fetched all tasks successfully", tasks)
        );
    }

    // 3. GET SINGLE TASK BY ID
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Task>> getTaskById(@PathVariable Long id) {
        Task task = taskService.getTaskById(id);
        return ResponseEntity.ok(
                ApiResponse.success("Task fetched successfully", task)
        );
    }

    // 4. UPDATE TASK
    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<Task>> updateTask(@PathVariable Long id, @RequestBody TaskRequest request) {
        Task updatedTask = taskService.updateTask(id, request);
        return ResponseEntity.ok(
                ApiResponse.success("Task updated successfully", updatedTask)
        );
    }

    // 5. DELETE TASK
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Object>> deleteTask(@PathVariable Long id) {
        taskService.deleteTask(id);
        // We pass 'null' as data because there is no object to return after deletion
        return ResponseEntity.ok(
                ApiResponse.success("Task deleted successfully", null)
        );
    }
}