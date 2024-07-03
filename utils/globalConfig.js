
// const environment = process.env.NODE_ENV || 'dev'; // Default olarak 'dev' kullanılacaktır
const environment = 'production'; // Default olarak 'dev' kullanılacaktır
console.log('environment', environment);

const config = {
    development: {
        mode: 'test',
        mediaUrl: 'https://logintest.prospot.online/assets',
        loginPageLink: 'https://loginpreview.prospot.online/',
        getMedia: 'https://10.10.22.13/assets/company/',
        basePath: function (path) {
            if (path.includes("whatsappapi"))
                return "https://" + mode + "" + path + ".prospot.online";
            else return "https://" + mode + "" + path + ".prospot.online";
        }
        // Diğer dev konfigürasyonları...
    },
    production: {
        mode: 'prod',

        mediaUrl: 'https://login.prospot.online/assets',
        loginPageLink: 'https://loginpreview.prospot.online/',
        getMedia: 'https://login.prospot.online/assets/company',

        basePath: function (path) {
            if (path.includes("whatsappapi"))
                return "https://" + "" + path + ".prospot.online";
            else return "https://" + path + ".prospot.online";
        }
        // Diğer prod konfigürasyonları...
    }
    // test: {
    //     // Test konfigürasyonları...
    // }
    // İhtiyaç duyulan diğer ortamları ekleyin...
};

const globalConfig = config[environment];

export default globalConfig;