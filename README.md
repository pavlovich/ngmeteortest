I created this application to demonstrate a potential problem with the way that angular and meteor interact. It appears that there is the potential for a memory leak.

If you download this repo and run 'mrt update' followed by 'meteor' from the command line in the root directory of the cloned project and then bring up chrome on http://localhost:3000,
you will be able to see the problem first hand.

Steps to reproduce:

1. Starting on the root home page (/), open the chrome developer tools, go to the profiles tab and click 'Take snapshot' with the middle radio button (Take Heap Snapshot) selected.
2. Click the Button on the home page to go to the 'form' (which is not a form but just has one line of semi-dynamic text on it).
3. Click the button on that page to take you back to the home page again.
4. Click the 'Take snapshot' button again.
5. Repeat steps 2, 3 and 4 a few times.
6. Go back to the first profile you took. In the 'Class filter' entry field, type 'scope' (without the single quotes). Note that there will be a few entries
7. Repeat step 6 for each of the snapshots.
8. Compare the results. 

You will find that the number of child scope objects will steadily increase.

If you install the batarang chrome plug in and repeat this test with that plug in enabled and set on the Models tab, you will see a new child scope added (and none garbage collected/disappearing)
every time you click the button to take you to the form page (as opposed to the home page).

I have tried to determine what object(s) are holding on to the scopes and wether this is an angular problem or a meter/angular interaction issue but have not been able to crack it yet.

Any assistance you may be able to offer would be greatly appreciated!

Please send me an email if you have any ideas on how to solve this issue.

Best regards,

Peter Pavlovich
pavlovich@gmail.com
