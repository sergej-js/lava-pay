# Library for working with the lava API

## Install
```bash
npm i lava-api
```

## Example
```ts
import { LavaPay } from "lava-api";
import { v4 as uuid } from "uuid";

async function main() {
    const lava = new LavaApi("secreyKey", "shopId");

    const invoice = lava.createInvoice({
        amount: "100",
        order_id: uuid(),
    })

    console.log(invoice)
}

main();
```