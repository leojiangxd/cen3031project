# To start server
Run "npm start" in the backend directory

# Documentation
## Users
Get / to obtain a list of all users and their attributes.

Post /register to add a user. Parameters: {username, password}

Post /login to attempt to log in. Parameters: {username, password}. 
Returns status 401 if invalid.

Post /add/:id to add a server to the user's list of servers. Parameters: {serverId}

Get /:id to obtain a single user's username, password (hashed), and list of servers

Put /update/:id to update a user's username and password

Delete /:id to delete a user

## Servers
Get / to obtain a list of all servers and their attributes

Post /add to add a server. Parameters: {serverName, url, description, memberCount}

Get /:id to obtain a single server

Post /update/:id to update a server's attributes. Parameters: {serverName, url, description, memberCount}

Delete /:id to delete a server


