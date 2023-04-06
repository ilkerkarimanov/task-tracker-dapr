namespace TaskTrackerWebApi.Domain;

public interface ITaskCatalog
{
    public Guid AddTask(TaskEntity task);
    public void EditTask(TaskEntity task);
    public TaskEntity GetById(Guid taskId);
    public IEnumerable<TaskEntity> ListTasksByAssignee(string assignedTo);
    public IEnumerable<TaskEntity> ListTasks();
    public void MarkTaskAsCompleted(Guid taskId);
    public void MarkTaskAsOverdue(Guid taskId);
}