
## Technologies used
* Koa.js
* Knex.js + Objection.js (ORM for nodejs)
* PostgreSQL
* mocha + chai (unit test)

## Setup project

To start server
```
npm run-script start
```

To load initial data
```
npm run-script seed or knex seed:run
```

To run test cases
```
npm run-script test
```

To run PostgreSQL container
```
docker-compose up -d
```

## Assumptions
1) Authentication and permission validation are not required. User no need to login to create order.
2) During the create order process, if the user data is not in the system, save the user data.
3) When calling the ‘Pay the order’ endpoint, the credit card details is sent to third-party payment gateway. After the payment is successfully made, update the payment status to Paid.

Example payload to create order
```
{
	"hotelId": "391e36f0-f4e6-11ea-adc1-0242ac120002",
	"checkInDate": "2020-09-12",
        "checkOutDate": "2020-09-15",
        "name": "tester",
        "email": "test@gmail.com",
        "phoneNumber": "123123123",
        "roomId": "391e33ee-f4e6-11ea-adc1-0242ac120002",
        "numberOfGuests": 3,
        "totalAmount": 30.00
}

```

Example URL to search order by hotel name
```
localhost:3000/v1/orders?hotel=true&name__like=test%
```

Example URL to filter order by hotel name
```
localhost:3000/v1/orders?hotel=true&name__eq=test hotel
```
Example URL to search order by customer details
```
localhost:3000/v1/orders?customer=true&email__like=test%
```
Example URL to filter order by customer details
```
localhost:3000/v1/orders?customer=true&email__eq=test@gmail.com
```
Example URL to get payment status
```
localhost:3000/v1/payments/1c4627e4-d4d8-48f1-a9a4-aa768aca9cb4
```
Example URL to update payment
```
localhost:3000/v1/payments/1c4627e4-d4d8-48f1-a9a4-aa768aca9cb4/checkout
```
Example payload send to third-party payment gateway
```
{
    "customerId": "e265272b-5f22-43ae-9b0a-2ee363887dde",
    "cardNumber": "123-123-567-567",
    "securityCode": "890890",
    "validThru": "11/22"
}
```
