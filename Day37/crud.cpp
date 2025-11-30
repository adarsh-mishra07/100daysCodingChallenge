#include <iostream>
#include <vector>
#include <string>
using namespace std;

// Step 1: Define Task class
class Task
{
public:
    int id;
    string title;
    string discription;

    Task(int id, string title, string discription)
    {
        this->id = id;
        this->title = title;
        this->discription = discription;
    }
};

// Global vector to store tasks
vector<Task> tasks;
int nextId = 1;

// create task

void createTask()
{
    string title, description;
    cout << "\n Enter the Task Title:";
    cin.ignore();
    getline(cin, title);

    cout << "Enter Task Description:";
    getline(cin, description);

    Task newTask(nextId++, title, description);
    tasks.push_back(newTask);

    cout << " Task added successfully!\n";
}

// Read Task
void viewTask()
{
    if (tasks.empty())
    {
        cout << "\n Task is not Available";
        return;
    }

    cout << "\n------Task List--------\n";

    for (const auto &task : tasks)
    {
        cout << "ID:" << task.id << "\n";
        cout << "Title:" << task.title << "\n";
        cout << "Description:" << task.discription << "\n";
        cout << "-------------------------------\n";
    }
}

// Update task

void updateTAsk()
{
    int id;
    cout << "\nEnter the Task ID to update:";

    for (auto &task : tasks)
    {
        if (task.id == id)
        {
            cin.ignore();

            cout << "Updated Title";
            getline(cin, task.title);

            cout << "Updated Description";

            cout << "Task Update Successfully!\n";
            return;
        }
    }
    cout << "Task not found!\n";
}

// Delete Task

void deleteTask()
{
    int id;
    cout << "\n Enter Task ID to delete :";
    cin >> id;

    for (int i = 0; i < tasks.size(); i++)
    {
        if (tasks[i].id == id)
        {
            tasks.erase(tasks.begin() + i);
            cout << "Task deleted successfully!\n";
            return;
        }
    }
    cout << "Task not found\n";
}

// Main menu

int main()
{
    int choice;

    while (true)
    {
        cout << "\n======TASK MANAGER";
        cout << "\n1. Create Task\n";
        cout << "2. View all Tasks\n";
        cout << "3. Update Task\n";
        cout << "4. Delete Task\n";
        cout << "5.Exit\n";
        cout << "Enter your choice :";
        cin >> choice;

        switch (choice)
        {
        case 1:
            createTask();
            break;
        case 2:
            viewTask();
            break;
        case 3:
            updateTAsk();
            break;
        case 4:
            deleteTask();
            break;
        case 5:
            cout << "Exiting....";
            return 0;
        default:
            cout << "Invalid choice!\n";
        }
    }
}
