export const navStates = () => {
    const landingNavDrawer = useState('landingNavDrawer',() => false)
    const homepageNavDrawer = useState('homepageNavDrawer',() => false)
    const changeLandingNavDrawerState = (newState : Boolean) => {
        landingNavDrawer.value = !landingNavDrawer.value
    }
    const changeHomeNavDrawerState = (newState : Boolean) => {
        homepageNavDrawer.value = !homepageNavDrawer.value
    }
    return{
        landingNavDrawer,
        homepageNavDrawer,
        changeLandingNavDrawerState,
        changeHomeNavDrawerState
    }
}