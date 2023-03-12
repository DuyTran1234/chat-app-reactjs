
export const getRoomName = (members) => {
    const newArr = members.sort();
    return newArr.join(".");
}