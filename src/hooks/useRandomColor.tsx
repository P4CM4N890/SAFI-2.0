
export const useRandomColor = () => {
    let color = '';
    const colores = ['#0a134a','#D8336A', '#E67E22', '#FFE500']

    const getNewColor = () => {
        color = colores[Math.floor(Math.random() * (colores.length - 1))];

        return color;
    };    

    return {
        color,

        getNewColor,
    }
}
