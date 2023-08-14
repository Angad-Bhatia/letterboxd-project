export const dateToString = (date) => {
    const array = date.split(' ');
    return [array[1], array[2], array[3]].join(' ');
}
