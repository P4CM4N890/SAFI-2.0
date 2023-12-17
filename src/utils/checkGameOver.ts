interface Coordenada {
    x: number,
    y: number,
}

interface Borde {
    xMin: number; 
    xMax: number; 
    yMin: number; 
    yMax: number;
}

export const checkGameOver = (head: Coordenada, bordes: Borde): boolean => {

    return (head.x < bordes.xMin ||
    head.x > bordes.xMax ||
    head.y < bordes.yMin ||
    head.y > bordes.yMax);

}