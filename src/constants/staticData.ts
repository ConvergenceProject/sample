require('dotenv').config()

const staticData = {

    databaseUrl: process.env.DATABASE_URL,
    baseUrl: process.env.BASE_URL,
    pictureUrl: process.env.PICTURE_URL,
    port: process.env.PORT,
    testPort: 3001,
    secretKey: "u$eR_kèY_12345",

    enableCrone: false,
    enableEmail: true,

    senderEmail: "",
    senderEmailPassword: "",

    smtpServer: "",
    smtpUsername: "",
    smtpPassword: "",

    awsAccessKey: "",
    awsSecretKey: "",
    awsRegion: "",
    awsBucket: "",

}

export default staticData;






