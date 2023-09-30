const menuTitles: Array<Record<string, any>> = [
    {
        name: "Dashboard",
        description: "",
        icon: "mdi-home",
        path: {
            to: "/",
            name: "Home"
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