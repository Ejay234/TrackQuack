// Initiate the Openscreen node SDK and include the project ID that you recieved using the Openscreen dashboard 
const { Openscreen } = require("@openscreen/sdk");
require('dotenv').config();
const os = new Openscreen().config({ key: process.env.OS_API_KEY, secret: process.env.OS_API_SECRET });
const projectId = '9cb71d94-34ac-41ca-bbd3-1eb52c796f06';

async function main() {

    // Create an asset for a new listing sign being hosted for 123 Main Street 
    const res = await os.project(projectId).assets().create({
        name: 'Student Trip',
        description: 'Old Japanese Lighthouse',
        customAttributes: {
            type: 'landmark'
        },
        qrCodes: [{
            intent: 'https://www.atlasobscura.com/places/old-japanese-lighthouse',
            intentType: 'DYNAMIC_REDIRECT'
        }],

    });

    // Returns a scannable QR Code
    const { qrCodeId } = res.asset.qrCodes[0];
    const qrCode = await os.qrCode(qrCodeId).get({ format: 'png' })
    await os.saveQrImageDataToFile(qrCode, 'lighthouse.png');

    // View the new asset that you have created 
    console.log('Asset:', JSON.stringify(res, '', 2));
}

main().catch((err) => {
    console.error(err);
});