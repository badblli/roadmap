import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import AsyncStorage from '@react-native-async-storage/async-storage';

class CallHub {
    constructor() {
        this.connection = null;
        this.initialize();
    }

    async initialize() {
        try {
            const companyGuid = await AsyncStorage.getItem('GlobalCompanyID');
            const userIDString = await AsyncStorage.getItem('UserID');
            if (companyGuid && userIDString) {
                const userID = parseInt(userIDString);
                const accessToken = `${userIDString}_${companyGuid}`; // Token'ı başka bir kaynaktan da alabilirsiniz.
                console.log('Initializing CallHub with token:', accessToken);
                const url = `https://chatserviceapi.prospot.online/chatHub?access_token=${accessToken}`;

                this.connection = new HubConnectionBuilder()
                    .withUrl(url)
                    .withAutomaticReconnect()
                    .configureLogging(LogLevel.Information)
                    .build();

                console.log('Connection initialized');

            } else {
                console.error('GlobalCompanyID veya UserID alınamadı');
            }
        } catch (err) {
            console.error('Error initializing CallHub:', err);
        }
    }

    start() {
        if (this.connection) {
            try {
                this.connection.start();
                console.log('Connection started');
            } catch (err) {
                console.error('Error starting connection:', err);
            }
        } else {
            console.error('Connection is not initialized');
        }
    }

    async startListeningToHubChatDetailList(callback) {
        try {
            const companyGuid = await AsyncStorage.getItem('GlobalCompanyID');
            const userIDString = await AsyncStorage.getItem('UserID');
            const userID = parseInt(userIDString);
            if (companyGuid && !isNaN(userID)) {
                const eventName = `ReceiveHubChatDetailList_${companyGuid}_${userID}`;
                console.log('Listening to event:', eventName);
                this.connection.on(eventName, dataArray => {
                    console.log('Data received from event:', dataArray);
                    callback(dataArray);
                });
            } else {
                console.error('Company GUID veya UserID alınamadı');
            }
        } catch (error) {
            console.error('Error setting up listener for HubChatDetailList:', error);
        }
    }

    async startListeningToHubChatDetail(callback) {
        try {
            const companyGuid = await AsyncStorage.getItem('GlobalCompanyID');
            if (companyGuid) {
                const eventName = `ReceiveChatDetail_${companyGuid}`;
                console.log('Listening to event:', eventName);
                this.connection.on(eventName, dataArray => {
                    console.log('Data received from event:', dataArray);
                    callback(dataArray);
                });
            } else {
                console.error('Company GUID alınamadı');
            }
        } catch (error) {
            console.error('Error setting up listener for HubChatDetail:', error);
        }
    }
}

const callHub = new CallHub();
export default callHub;
