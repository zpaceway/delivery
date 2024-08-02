El siguiente proyecto representa un microservicio de delivery, en el cual se recibe un paquete que debe ser entregado desde la matriz del delivery hasta el lugar de destino del paquete.

El sistema tiene las siguientes condiciones:

1KM < $1
5KM < $3
10KM < $8
15KM < $15
20KM < $25
>= 20KM No es posible procesar esta entrada

El controlador al igual que el servicio debe entregar la orden procesada con su valor de delivery en el siguiente formato

{
    orderId: string,
    userId: string,
    value: number,
    distance: number,
    delivery: number,
}
