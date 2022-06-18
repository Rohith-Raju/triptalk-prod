# TripTalk

## What it does ?
Since it is tedious for travellers to set up their own blog site, Triptalk lets travellers wtite their blogs and make it publically available for people to see their stories and blogs.

## Where is it hosted ?
TripTalk is hosted on firebase, it uses firestore ( nosql database )  and cloud storage ( store images ) to store it's content. You can access it by https://triptalk-production.web.app/ link

## How to use it ?
A user can read the description of the content without the requirement of their credentials but has to signup if they decide to write a blog (Auth handled by firebase)

## What happens when I delete my profile ?
When a user deletes thier profile all their data will be permanently removed from the storage bucket and the database 
