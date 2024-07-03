# Swagger Documents

- Test API (for login operations **VPN REQUIRED**): [http://testauth.prospot.online/swagger/index.html](http://testauth.prospot.online/swagger/index.html)

- Prod API (for login operations): [http://auth.prospot.online/swagger/index.html](http://auth.prospot.online/swagger/index.html)

![Postman Request](https://i.hizliresim.com/tpbzcmi.png)

# Sample response for login request

```json
{
  "Token": "eyJhb...",
  "UserProfile": {
    "UserID": 290,
    "Username": "oguzhan.inal",
    "Name": "Oğuzhan",
    "Surname": "İnal",
    "Email": "a@a.com",
    "RoleID": 0,
    "RoleList": [18],
    "UserCompanyList": [
      {
        "ID": "9c8e1151-2256-4c93-b874-1466d6c7afd9", // GlobalCompanyID variable for request header
        "Name": "Catamaran Resort Hotel" // The 0th element of UserCompanyList should always be taken as the default value.
      }
    ],
    "UserToken": null,
    "LanguageID": 1,
    "LanguageIsoCode": "TR",
    "DefaultPage": "crm/whatsappmenu/chat",
    "UserAvatar": null, // User's saved avatar selection
    "DarkMode": false, // User's saved theme selection
    "SellerID": 0,
    "UsingChat": true
  }
}
```

# Example for connection to SignalR Hubs

```js
//access_token is created by concatenating the UserID and GlobalCompanyID in the response of the login request
const access_token = `${UserID}_${GlobalCompanyID}`; // Token'ı başka bir kaynaktan da alabilirsiniz.
const connection_url = `https://chatserviceapi.prospot.online/chatHub?access_token=${accessToken}`;
```

# SignalR Hub Connection

unfortunately there is no swagger documentation :(

[Click to see Create CallHub Example](utils/callHub.js)

- _startListeningToHubChatDetailList_ is the updated inbox data
- _startListeningToHubChatDetail_ is the updated chat data

To view the messages of the selected person, the PhoneNumber information parameter in the user information must be added.

You can check the [luwi.chat.mobile repository](https://bitbucket.org/netsolutionworld1/luwi.chat.mobile/src/master/) for examples.

# Other Global Function Examples (Get/Post)

[Click to see Other Global Function Examples (Get/Post)](utils)

# Logos and Icons

- [Logos and Icons](assets)
