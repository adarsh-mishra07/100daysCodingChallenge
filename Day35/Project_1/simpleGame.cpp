#include <iostream>
#include <cstdlib> // for rand() and srand()
#include <ctime>   // for time()
using namespace std;

int main()
{
    cout << "Welcome to the number Guessing Game !" << endl;
    cout << "I 'm thinking of a number between 1 and 10." << endl;
    cout << "You have 3 chances to guess it.\n"
         << endl;

    // Step-1 : Random Number Generation
    srand(time(0));                     // send the random generator
    int secretNumber = rand() % 10 + 1; // random number between 1 and 10
    int guess;
    int attempts = 3;
    bool won = false;

    // step 2: loop for attempts
    for (int i = 1; i <= attempts; i++)
    {
        cout << "attempts" << i << ": Enter you guess ->";
        cin >> guess;

        // step 3: conditional logic

        if (guess == secretNumber)
        {
            cout << "Correct Answer";
            won = true;
            break;
        }
        else if (guess < secretNumber)
            cout << "Too low ! try higher number.\n"
                 << endl;
        else
        {
            cout << "Too high! try a lowe number.\n"
                 << endl;
        }
    }
    if (!won)
    {
        cout << "Sorry ,you lost. The number was " << secretNumber << "." << endl;
    }
    cout << "\nThanks for playing!" << endl;
    return 0;
}