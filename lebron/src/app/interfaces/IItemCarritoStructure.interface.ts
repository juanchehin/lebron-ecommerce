
export interface IItemCarritoStructure
{
    IdItem: any;
    IdProdProm: any;
    Nombre: any;
    Tipo: any; // 'P' Producto o 'R' Promocion
    Sabor: any;
    IdSabor1: any;  // Caso promocion
    IdSabor2: any;    // Caso promocion
    Precio: number;
    Cantidad: number;
    SubTotal: number;
}