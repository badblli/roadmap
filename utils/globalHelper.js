import api from './api';
import globalConfig from './globalConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { errorStore } from '../stores/error';

const uid = () => {
    return Math.random().toString(36).substr(2, 9);
};
const whatsappMediaUrl = "https://whatsappapi.prospot.online";
const storeToken = async (token) => {
    await AsyncStorage.setItem('token', token);
};

const formatDate = (lastChatDate) => {

    const currentDate = new Date();
    const chatDate = new Date(lastChatDate);
    if (lastChatDate == null || lastChatDate == "null") {
        return "";
    }

    if (chatDate.toDateString() === currentDate.toDateString()) {
        // Eğer chatDate bugünse sadece saat göster
        const hours = chatDate.getHours().toString().padStart(2, "0");
        const minutes = chatDate.getMinutes().toString().padStart(2, "0");
        return `Bugün ${hours}:${minutes}`;
    } else {
        // Eğer chatDate bugünden önceyse sadece tarihi göster (GG.AA.YYYY)
        const day = chatDate.getDate().toString().padStart(2, "0");
        const month = (chatDate.getMonth() + 1).toString().padStart(2, "0");
        const year = chatDate.getFullYear();
        return `${day}.${month}.${year}`;
    }
};
const getToken = async () => {
    const token = await AsyncStorage.getItem('token');
    return token;
};

const getGlobalCompanyID = async () => {
    const globalCompanyID = await AsyncStorage.getItem('GlobalCompanyID');
    return globalCompanyID;
};


const getApi = async (
    applicationName,
    controllerName,
    name,
    params = null,
    dontUseGet = false,
    formatDate = [],
    baseURLLink = false
) => {
    try {
        if (params !== null && formatDate.length > 0) {
            params = beforeSubmitData(params, formatDate);
        }

        const token = await AsyncStorage.getItem('token');
        const globalCompanyID = await AsyncStorage.getItem('GlobalCompanyID');
        const clientIP = await AsyncStorage.getItem('ClientIP');

        api.defaults.headers.common.Authorization = token;
        api.defaults.headers.common.CorrelationID = uid();
        api.defaults.headers.common.ClientIP = clientIP || null;
        api.defaults.headers.common.GlobalCompanyID = globalCompanyID;

        let actionName = dontUseGet ? '/' + name : '/Get' + name;
        let mainUrl = baseURLLink ? 'https://' + applicationName : globalConfig.basePath(applicationName);

        const response = await api.get(controllerName + actionName, {
            params,
            baseURL: mainUrl,
            // headers: {
            //     Authorization: await AsyncStorage.getItem('token'),
            //     CorrelationID: uid(),
            //     ClientIP: clientIP || null,
            //     GlobalCompanyID: await AsyncStorage.getItem('GlobalCompanyID'),
            // }
        });

        return response;
    } catch (error) {
        if (error && error.Status === 4) {
            console.log('Lütfen Oturum Açın');
            await AsyncStorage.setItem('loginModal', 'true');
            errorStore.setError('Lütfen Oturum Açın');

        }

        throw error;
    }
};


const callPostApi = async (
    applicationName,
    controllerName,
    name,
    data = null,
    formatDate = [],
    dontGoTable = false,
    manuelURL = false,
    baseURLLink = false
) => {
    // Assuming beforeSubmitData is defined elsewhere
    // if (formatDate.length > 0) {
    //   data = beforeSubmitData(data, formatDate);
    // }
    console.log('applicationName', applicationName);
    console.log('controllerName', controllerName);
    console.log('name', name);
    console.log('data', data);

    let mainUrl = '';
    if (manuelURL) {
        mainUrl = 'https://' + globalConfig.mode + '.' + applicationName;
    } else if (baseURLLink) {
        // Assuming globalConfig.applicationId exists for this case
        mainUrl = 'https://' + globalConfig.applicationId;
    } else {
        mainUrl = globalConfig.basePath(applicationName);
    }

    api.defaults.headers.common.Authorization = await AsyncStorage.getItem('token');
    api.defaults.headers.common.GlobalCompanyID = await AsyncStorage.getItem('GlobalCompanyID');

    try {
        const response = await api.post(controllerName + '/' + name, data, { baseURL: mainUrl });

        if (response.data.status === 1) {

            if (!dontGoTable) {
                // Assuming getApi is defined elsewhere
                await getTable(applicationName, controllerName, name, null, false, [], baseURLLink);

                alert(getLabel('Success', 'Common'));
            }
            return response;
        } else if (response.data.status === 2) {
            errorStore.setError(response.data.errorMessage);
            // alert(response.data.errorMessage)
            return false;
        } else if (response.data.status === 3) {
            response.data.validationErrorList.forEach(function (a) {
                // alert(`${a.propertyName} ${a.errorDescription}`)
                errorStore.setError(`${a.propertyName} ${a.errorDescription}`);
            });
            return false;
        } else if (response.data.status === 5) {
            return response;
        }
    } catch (error) {
        if (error && error.Status === 4) {
            errorStore.setError('Lütfen Oturum Açın');

        }

        throw error; // Hata tekrar fırlatılır
    }

    return false; // In case no condition is met, for example, if the response status is not handled.
};

const getLabel = async (inputName, parentName = null) => {
    let text = inputName;

    if (parentName !== null) {
        try {
            const translationListString = await AsyncStorage.getItem('translationList');
            const translationList = JSON.parse(translationListString) || [];
            const parentLanguage = translationList.filter(item => item.ParentName === parentName);
            const matchedItem = parentLanguage.find(item => item.Name === inputName);
            if (matchedItem) {
                text = matchedItem.Text;
            }
        } catch (error) {
            console.log('Error retrieving translationList from AsyncStorage:', error);
        }
    } else {
        try {
            const languagesString = await AsyncStorage.getItem('languages');
            const languages = JSON.parse(languagesString) || [];
            const matchedItem = languages.find(item => item.Name === inputName);
            if (matchedItem) {
                text = matchedItem.Text;
            }
        } catch (error) {
            console.log('Error retrieving languages from AsyncStorage:', error);
        }
    }
    console.log('getLabel', text);
    return text;
};





export { storeToken, getToken, getGlobalCompanyID, getApi, callPostApi, formatDate, getLabel, whatsappMediaUrl };