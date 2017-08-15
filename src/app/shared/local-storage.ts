// Use LocalStorage to store session data over page loads

export const LoadState = () => {
    try {
        const serializedState = localStorage.getItem('state');
        if (serializedState === null) {
            return undefined;
        } 
        return JSON.parse(serializedState);
    } catch(err) {
        return undefined;
    }
};

export const SaveState = (state) => {
    try {
const serializedState = JSON.stringify(state);
localStorage.setItem('state', serializedState);
    } catch (err) {
        //
    }
};