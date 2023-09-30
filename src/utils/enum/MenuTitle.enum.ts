const menuTitles: Array<Record<string, any>> = [
    {
        name: "Home",
        description: "",
        icon: "mdi-home",
        path: {
            to: "/",
            name: "Home"
        },
        children: []
    }, {
        name: "About",
        description: "",
        icon: "mdi-information",
        path: {
            to: "/",
            name: "About"
        },
        children: []
    }, {
        name: "Revenue",
        description: "",
        icon: "mdi-cash",
        path: {
            to: "/revenue",
            name: "Revenue"
        },
        children: []
    }]

export default menuTitles;