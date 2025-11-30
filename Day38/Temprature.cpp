#include <iostream>
using namespace std;

int main()
{
    double temp, result;
    int choice;

    cout << "=====Temprature Converer\n";
    cout << "1. Celsius to fahrenheit\n";
    cout << "2. Fahrenheit to Celsius \n";
    cout << "Enter your choice (1 or 2):";

    cin >> choice;
    cout << "Enter Temprature:";
    cin >> temp;

    if (choice == 1)
    {
        // celsious to fahrenheit
        result = (temp * 9 / 5) + 32;
        cout << temp << " Celsius=" << result << " Fahrenheit\n";
    }

    else if (choice == 2)
    {
        // fahrenheit to celsius
        result = (temp - 32) * 5 / 9;
        cout << temp << " Fahrenheit=" << result << " Celsius\n";
    }
    else
    {
        cout << "Invalid choice!\n";
    }
    return 0;
}
