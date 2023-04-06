namespace TaskTrackerWebApi.Domain;

public class TaskCatalog : ITaskCatalog
{
    private static List<TaskEntity> _initialTasks = new List<TaskEntity>()
    {
        new TaskEntity(
            taskId : Guid.Parse("32bdb931-81b5-4ba8-9666-33a3b12184c6"),
            taskName : "Task 1",
            taskAssignedTo : "ilker.karimanov@hotmail.com",
            taskDueDate : DateTime.Today.AddDays(1),
            isCompleted : false,
            isOverdue : false,
            taskCreatedBy : "ilker.karimanov@hotmail.com",
            taskCreatedOn : DateTime.Today
        ),
        new TaskEntity(
            taskId : Guid.Parse("33bdb931-81b5-4ba8-9666-33a3b12184c6"),
            taskName : "Task 1",
            taskAssignedTo : "testme@hotmail.com",
            taskDueDate : DateTime.Today.AddDays(1), 
            isCompleted : true,
            isOverdue : true,
            taskCreatedBy : "ilker.karimanov@hotmail.com",
            taskCreatedOn: DateTime.Today
        ),
    };
    
    public Guid AddTask(TaskEntity task)
    {
        _initialTasks.Add(task);
        return task.TaskId;
    }

    public void EditTask(TaskEntity task)
    {
        var existingTaskIdx = _initialTasks.FindIndex(x => x.TaskId == task.TaskId);
        if (existingTaskIdx > -1)
        {
            _initialTasks[existingTaskIdx] = task;
        }
    }

    public TaskEntity GetById(Guid taskId) => _initialTasks.FirstOrDefault(x => x.TaskId == taskId);

    public IEnumerable<TaskEntity> ListTasksByAssignee(string assignedTo)
    {
        return _initialTasks
            .Where(x => x.TaskAssignedTo.ToLowerInvariant() == assignedTo.ToLowerInvariant())
            .ToList();
    }

    public IEnumerable<TaskEntity> ListTasks()
    {
        return _initialTasks;
    }

    public void MarkTaskAsCompleted(Guid taskId)
    {
        var existingTaskIdx = _initialTasks.FindIndex(x => x.TaskId == taskId);
        if (existingTaskIdx > -1)
        {
            _initialTasks[existingTaskIdx].MarkCompleted();
        }
    }

    public void MarkTaskAsOverdue(Guid taskId)
    {
        var existingTaskIdx = _initialTasks.FindIndex(x => x.TaskId == taskId);
        if (existingTaskIdx > -1)
        {
            _initialTasks[existingTaskIdx].MarkOverdue();
        }
    }
}