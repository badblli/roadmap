# Swagger Documents

## Index

- [Login Test API](#test-api-login)
- [Login Prod API](#prod-api-login)
- [Login Request Sample Response](#login-request-sample-response)
- [Whatsapp Test API](#test-api-whatsapp)
- [Whatsapp Prod API](#prod-api-whatsapp)
  - [Send Media Message](#send-media-message)
  - [Send Text Message](#send-text-message)
- [CRM Test API](#test-api-crm)
- [CRM Prod API](#prod-api-crm)
  - [Make Message Read](#make-message-as-read)
  - [FireBase Notification](#get-firebase-token)
- [SignalR Hubs](#signalr-hubs)
  - [Connection Example](#connection-example)
  - [Hub Events](#hub-events)
- [Global Function Examples](#global-function-examples)
- [Logos and Icons](#logos-and-icons)

## Login Test API

For login operations **VPN REQUIRED**:
[(http://testauth.prospot.online/swagger/index.html](http://testauth.prospot.online/swagger/index.html)

## Login Prod API

For login operations:
[http://auth.prospot.online/swagger/index.html](http://auth.prospot.online/swagger/index.html)

## Login Request Sample Response

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

## Whatsapp Test API

For Whatsapp Test operations **VPN REQUIRED**:
[http://testwhatsappapi.prospot.online/swagger/index.html](http://testwhatsappapi.prospot.online/swagger/index.html)

## Whatsapp Prod API

For Whatsapp Prod operations:
[http://whatsappapi.prospot.online/swagger/index.html](http://whatsappapi.prospot.online/swagger/index.html)

### Send Media Message

/Whatsapp/SendWhatsappMediaMessage (Media Mesajlarının gönderimi için kullanılır base64 formatta)

### Send Text Message

/WhatsappChat/SendChatMessage (text message gönderimi için kullanılır)

## CRM Test API

For CRM Test operations **VPN REQUIRED**:
[http://testcrm.prospot.online/swagger/index.html](http://testcrm.prospot.online/swagger/index.html)

## CRM Prod API

For CRM Prod operations:
[http://crm.prospot.online/swagger/index.html](http://crm.prospot.online/swagger/index.html)

### Make Message Read

/CRM/MakeMessageRead (Used to send message reading info)

/CRM/GetFireBaseToken (To send Firebase Push Notification Token (FCM) to the service)

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

- [See Logos and Icons](assets)
