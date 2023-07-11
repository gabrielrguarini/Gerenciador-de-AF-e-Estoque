export function isAuth() {
    const token = localStorage.getItem('token');
    if (!token) {
        return null
    } else {
        return token
    }

}
