
interface Coordenada {
    x: number,
    y: number,
}

export const checkItsFood = (head: Coordenada, food: Coordenada, area: number ) => {
    const distanceX = Math.abs(head.x - food.x);
    const distanceY = Math.abs(head.y - food.y);

    return(
        distanceX < area && distanceY < area
    );
};
