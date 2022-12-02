export const setRepository = (key : string) => ({ setSelf, onSet } : any) => {
    const savedValue = localStorage.getItem(key)
    // localstorage의 user_list에 해당되는 값 -> savedValue가 null	이라면
    if (savedValue !== null) {
        setSelf(JSON.parse(savedValue));
    }
    // setSelf() 함수 내에서는 Promise를 사용하거나 데이터를 비동기적으로 호출할 때 사용할 수 있다.

    // setting함수가 변화되었을 때 즉, component에서
    // setUserList(변화한 값);을 코드에 작성했을 때
    // localStorage.setItem(key, JSON.stringify(newValue)); 가 실행되어
    // localStorage에 키-값 형태로 들어가게 된다!

    onSet((newValue : string) => {
        // newValue 값의 길이가 0일 때
        // userlist에 대한 값을 삭제해주면 된다.
        const confirm = newValue.length === 0;
            confirm
                ? localStorage.removeItem(key)
                : localStorage.setItem(key, JSON.stringify(newValue));
    });
};