const request = require('request');
const handler = async (req, res) => {

    if (req.method !== 'GET') {
        return false;
    }

    const { phone } = req.body;
    const code = Math.floor(Math.random() * 99999)


    console.log('phone =>', phone);
    console.log('code =>', code);

    request.post({
        url: 'http://ippanel.com/api/select',
        body: {
            "op": "pattern",
            "user": "u09211367465",
            "pass": "Faraz@1461240014841169",
            "fromNum": "10004223",
            "toNum": phone,
            "patternCode": "d2q42ceze02l38o",
            "inputData": [
                { "verification-code": code },
            ]
        },
        json: true,
    }, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            //YOU‌ CAN‌ CHECK‌ THE‌ RESPONSE‌ AND SEE‌ ERROR‌ OR‌ SUCCESS‌ MESSAGE
            console.log(response.body);
            return res.status(201).json({ message: "code sent successfully :))" })

        } else {
            console.log("whatever you want");
            return res.status(500).json({ message: "Unknow server Error !!" })

        }
    });
}
export default handler;


