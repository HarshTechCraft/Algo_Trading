var axios = require('axios');
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
const secretKey = 'UUGDXH753M4H5FS5HJVIGBSSSU';
const speakeasy = require('speakeasy');


// R51644670
const addbroker = async (req, res) => {
    try {

        const totpCode = speakeasy.totp({
            secret: secretKey,
            encoding: 'base32',
        });



        var data = JSON.stringify({
            "clientcode": `${req.body.id}`,
            "password": `${req.body.pass}`,
            "totp": `${totpCode}`
        });

        var config = {
            method: 'post',
            url: 'https://apiconnect.angelbroking.com//rest/auth/angelbroking/user/v1/loginByPassword',

            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'X-UserType': 'USER',
                'X-SourceID': 'WEB',
                'X-ClientLocalIP': '192.168.157.1',
                'X-ClientPublicIP': '106.193.147.98',
                'X-MACAddress': 'fe80::87f:98ff:fe5a:f5cb',
                'X-PrivateKey': 'xL9TyAO8'
            },
            data: data
        };

        const response = await axios(config);
        const jsonObject = JSON.parse(JSON.stringify(response.data));
        jwtToken = jsonObject.data.jwtToken;

        var rmsconfig = {
            method: 'get',
            url: 'https://apiconnect.angelbroking.com/rest/secure/angelbroking/user/v1/getRMS',

            headers: {
                'Authorization': 'Bearer ' + jwtToken + '',
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'X-UserType': 'USER',
                'X-SourceID': 'WEB',
                'X-ClientLocalIP': '192.168.187.1',
                'X-ClientPublicIP': '106.193.147.98',
                'X-MACAddress': 'fe80::87f:98ff:fe5a:f5cb',
                'X-PrivateKey': 'xL9TyAO8'
            }
        };

        const rmsresponce = await axios(rmsconfig)
        console.log(rmsresponce)
        const a = rmsresponce.data


        console.log("client net balance  " + a.data.net + "\n")
        console.log("client avalible balance  " + a.data.availablecash + "\n")
        console.log("client utilised payout balance  " + a.data.utilisedpayout + "\n")
        console.log("client available intraday payin balance  " + a.data.availableintradaypayin + "\n")
        console.log("client available limit margin balance  " + a.data.availablelimitmargin + "\n")
        console.log("client collateral balance  " + a.data.collateral + "\n")
        console.log("client m2m unrealized balance  " + a.data.m2munrealized + "\n")
        console.log("client m2m realized balance  " + a.data.m2mrealized + "\n")
        console.log("client utilised debits is   " + a.data.utiliseddebits + "\n")
        console.log("client utilisedspan balance  " + a.data.utilisedspan + "\n")
        console.log("client utilised option premium is  " + a.data.utilisedoptionpremium + "\n")
        
        res.json(a);



    } catch (e) {
        console.log(e);
    }

};

module.exports = addbroker