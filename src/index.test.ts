import { LavaPay } from ".";
import { v4 as uuidv4 } from 'uuid';

describe('LavaPay', () => {
    let lava: LavaPay;

    beforeAll(() => {
        lava = new LavaPay(process.env.SECRET_KEY as string, process.env.SHOP_ID as string);
    });

    test('Module', () => {
        expect(lava).toBeDefined();
    });

    test('Create invoice', async () => {
        const response = await lava.createInvoice({
            sum: '100',
            orderId: uuidv4(),
        });

        expect(response.status).toEqual(200)
    });

    test('Get invoice status', async () => {
        const invoice = await lava.createInvoice({
            sum: '100',
            orderId: uuidv4(),
        });

        expect(invoice.status).toEqual(200)

        const getInvoiceStatus = await lava.getInvoiveStatus({
            invoiceId: invoice.data!.id
        })

        expect(getInvoiceStatus.status).toEqual(200)
    })

    test('Get available tariffs', async () => {
        const response = await lava.getAvailableTariffs();

        expect(response.status).toEqual(200);
    })

    test('Get shop balance', async () => {
        const balance = await lava.getShopBalance();

        expect(balance.data!.balance).toEqual(0)
    })
});