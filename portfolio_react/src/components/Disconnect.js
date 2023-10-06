export default function Disconnect() {
    localStorage.removeItem('token');
    window.history.pushState({}, null, '/');
    const navEvent = new PopStateEvent('popstate');
    window.dispatchEvent(navEvent);

    return null;
}