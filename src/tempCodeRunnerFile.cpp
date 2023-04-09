#include <bits/stdc++.h>
using namespace std;

string LongestEvenLengthWord(string input)
{
string noSuccess = "00";
if (input.size() ==0 || input.size() == 1)
{
return noSuccess;
}

int count = 0, max = 0, lastIndex = 0;
for (int i = 0; i < input.size(); i++)
{
if (input[i] == ' ')
{
if (count % 2 == 0)
{
if (count > max)
{
max = count;
lastIndex = i;
}

count = 0;
}
else
{
count = 0;
}
}
else
{
count++;
}
}

if (max == 0)
{
return count % 2 == 0 ? input.substr(input.size() -count, count) : noSuccess;
}

return input.substr(lastIndex - max,max);
}

  int main() {
   string s ="It is wass a pleasanta sday ";
    cout<<LongestEvenLengthWord(s);

    return 0;

  }