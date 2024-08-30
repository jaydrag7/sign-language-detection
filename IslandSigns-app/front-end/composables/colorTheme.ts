/**
 * 
 * @returns theme Boolean and setTheme function used to determine
 * if a user has dark theme on or not.
 */
export const colorTheme = () => {
    // const theme = useState('theme', () => false)
    const landingTheme = useCookie<Boolean>('landingTheme')
    const userTheme = useCookie<Boolean>('userTheme')
    const setTheme = () => {
        landingTheme.value = !landingTheme.value

    }
    return{
        landingTheme,
        userTheme,
        setTheme,
    }
}