# running-app

Migrate Strava and NIke+ Run Club data

# TO-DO

Need to rethink where I am formatting Nike data.
Instead of sending entire Nike activities to client, do the formatting on back end and only send formatted Nike data to client.

Have to figure out best way to take Nike activities and convert them to GPX, then make Strava requests with GPX files

Figure out how to get more than 30 activities from Nike and Strava

Error and success messages on screen

Display message when Nike Token isn't valid

Client (JOI) authentication

Make the download buttons funcitonal (start with JSON than try CSV format)

Change the format of that the weather appears in description for Nike imports in formatNike.js (Ex: partly_sunny -> Partly sunny)
