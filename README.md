# react-twitch-live-indicator
A react component to add to your website to display when your twitch channel is live

Styled Components is used to make it look better but not required. The main piece is the axios call. 

To get your Twitch Channel id you can use a tool like postman to hit https://api.twitch.tv/kraken/users?login=YOUR_CHANNEL_USERNAME and then copy thev value associated with __id__. Use that id in the Twitch.js file. Then to get a client id you need to go to dev.twitch.tv access your console and then create and app or extension (it doesn't matter) then the client id should be just underneath the nav bar towards the right.
