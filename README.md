# Shoppies

https://shoppies-zhongchileoli.netlify.app/

A website for users to search movies and choose 5 of their favourite movies for nomination.

## Built with:

* TypeScript
* React.js
* Chakra UI

## Features:

* Fully responsive layout
* Interactive hover and toggle animations
* Live search update when the user is typing (debounced by 700ms to prevent request DDoSing)
* Filtered searched results that only display unique movies
* Pagination for search results
* Saved nomination list in localStorage
* Accessibility score of 100 as tested by Google lighthouse

## Next steps:

* Connect with Firebase to provide user authentication and data storage, allowing users to save their selections for revisiting later
* Change pagination to infinite scroll to reduce the number of clicks required for page navigation, providing a more frictionless browsing experience
* Implement a serverless function to perform API calls, hiding private keys from the clients
