// Enhance the CRUD application to store task data persistently using file I/O.

/*
✔Create Task
✔ View Tasks
✔ Update Task
✔ Delete Task
✔ Save tasks to file
✔ Load tasks from file on startup
✔ File error handling
*/

#include <iostream>
#include <vector>
#include <fstream>
using namespace std;

// Task class
class Task
{
public:
    int id;
    string title;
    string description;

    Task(int id, string title, string description)
    {
        this->id = id;
        this->title = title;
        this->description = description;
    }
};

// Global variables
vector<Task> tasks;
int nextId = 1;
string fileName = "tasks.txt";

// ------------------- Load Tasks from File -------------------
void loadTasks()
{
    ifstream file(fileName);

    if (!file)
    {
        cout << "No previous task file found. Starting fresh.\n";
        return;
    }

    tasks.clear();
    int id;
    string title, description;

    while (file >> id)
    {
        file.ignore();
        getline(file, title);
        getline(file, description);

        tasks.push_back(Task(id, title, description));

        if (id >= nextId)
            nextId = id + 1;
    }

    file.close();
    cout << "Tasks loaded successfully.\n";
}

// ------------------- Save Tasks to File -------------------
void saveTasks()
{
    ofstream file(fileName);

    if (!file)
    {
        cout << "Error: Could not open file to save tasks!\n";
        return;
    }

    for (auto &t : tasks)
    {
        file << t.id << "\n";
        file << t.title << "\n";
        file << t.description << "\n";
    }

    file.close();
    cout << "Tasks saved successfully!\n";
}

// ------------------- Create Task -------------------
void createTask()
{
    string title, description;
    cin.ignore();

    cout << "\nEnter Task Title: ";
    getline(cin, title);

    cout << "Enter Task Description: ";
    getline(cin, description);

    tasks.push_back(Task(nextId++, title, description));
    cout << "Task Added Successfully!\n";

    saveTasks(); // Save automatically after addition
}

// ------------------- View Tasks -------------------
void viewTasks()
{
    if (tasks.empty())
    {
        cout << "\nNo tasks available.\n";
        return;
    }

    cout << "\n----- Task List -----\n";
    for (auto &t : tasks)
    {
        cout << "ID: " << t.id << "\n";
        cout << "Title: " << t.title << "\n";
        cout << "Description: " << t.description << "\n";
        cout << "---------------------\n";
    }
}

// ------------------- Update Task -------------------
void updateTask()
{
    int id;
    cout << "\nEnter ID of task to update: ";
    cin >> id;

    for (auto &t : tasks)
    {
        if (t.id == id)
        {
            cin.ignore();
            cout << "New Title: ";
            getline(cin, t.title);
            cout << "New Description: ";
            getline(cin, t.description);

            cout << "Task Updated Successfully!\n";
            saveTasks();
            return;
        }
    }

    cout << "Task not found!\n";
}

// ------------------- Delete Task -------------------
void deleteTask()
{
    int id;
    cout << "\nEnter ID of task to delete: ";
    cin >> id;

    for (int i = 0; i < tasks.size(); i++)
    {
        if (tasks[i].id == id)
        {
            tasks.erase(tasks.begin() + i);
            cout << "Task Deleted Successfully!\n";
            saveTasks();
            return;
        }
    }

    cout << "Task not found!\n";
}

// ------------------- Main Menu -------------------
int main()
{
    loadTasks(); // Load tasks at startup

    int choice;
    while (true)
    {
        cout << "\n===== TASK MANAGER =====\n";
        cout << "1. Create Task\n";
        cout << "2. View Tasks\n";
        cout << "3. Update Task\n";
        cout << "4. Delete Task\n";
        cout << "5. Exit\n";
        cout << "Enter choice: ";
        cin >> choice;

        switch (choice)
        {
        case 1:
            createTask();
            break;
        case 2:
            viewTasks();
            break;
        case 3:
            updateTask();
            break;
        case 4:
            deleteTask();
            break;
        case 5:
            saveTasks();
            cout << "Exiting...\n";
            return 0;
        default:
            cout << "Invalid choice!\n";
        }
    }
}
