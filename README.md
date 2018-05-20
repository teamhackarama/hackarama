Nationwide Hackathon - Flash Feedback
=====================================

Alexa skill to solicit feedback from restaurant customers. Custom analytics dashboard to calculate trends to display feedback in real-time for the business owner.

Technology
------

We used a serverless architecture with 4 micro services:

- AWS Lambda for all hosting and deployment. We used Dotnet Core Lambda, Python Lambda, Node.js Lambda.
- Amazon Dynamo DB for storing the data
- Microsoft new ML.net to detect the sentiment of the feedback using Yelp and Imdb dataset.
- Angular 6 for the Web Dashboard, with Chart.js and D3 for graphics. 
- Alexa Skills to parse the intents. The word slots are extracted from Yelp datasets, to capture the free form feedback.

Live Working Demo
-----
- *Dashboard*: http://flashfeedback.simplify.claims
- *Alexa Skill*: [FlashFeedback](https://www.amazon.com/s/ref=nb_sb_noss?url=search-alias%3Dalexa-skills&field-keywords=FlashFeedback)

Screenshots
------
Web Analytics Dashboard
![dashboard](https://github.com/teamhackarama/hackarama/raw/master/screenshots/dashboard.png "Dashboard")

Alexa Test Portal
![alexa](https://github.com/teamhackarama/hackarama/raw/master/screenshots/alexa.png "Alexa")

Install Alexa Skill
-----
Search for "Flash Feedback" on Alexa Marketplace! Example triggers:

- Flash Feedback, my feedback for McDonalds is very good, the service was awesome!
- Flash Feedback, my feedback for Dominos Pizza was very bad, bathroom was dirty.
