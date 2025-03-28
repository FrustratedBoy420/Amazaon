export const deliveryOptions = [
    {
        id: '1',
        deliverDay: 7,
        priceCents: 0
    }
    , {
        id: '2',
        deliverDay: 3,
        priceCents: 499
    },
    {
        id: '3',
        deliverDay: 1,
        priceCents: 999
    }
]

export function getDeliveryOption(deliveryOptionId){
    let deliveryOption;
    deliveryOptions.forEach((option)=>{
        if(option.id===deliveryOptionId){
            deliveryOption=option
        }
    });
    return deliveryOption || deliveryOptions[0];

}