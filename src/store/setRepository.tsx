export const setRepository = (key : string) => ({ setSelf, onSet } : any) => {
    const savedValue = localStorage.getItem(key)

    if (savedValue) setSelf(JSON.parse(savedValue));

    onSet((newValue : string) => {
        const confirm = newValue.length === 0;
            confirm
                ? localStorage.removeItem(key)
                : localStorage.setItem(key, JSON.stringify(newValue));
    });
};