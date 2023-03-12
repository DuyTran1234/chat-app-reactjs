
export default function resetState(storage) {
    for (let key in storage) {
        if (typeof storage[key] === 'function') {
            const func = storage[key];
            func(null);
        }
    }
}