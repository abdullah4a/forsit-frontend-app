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
    }, {
        name: "Inventory",
        description: "",
        icon: "mdi-cash",
        path: {
            to: "/inventory",
            name: "Inventory"
        },
        children: []
    }]

export default menuTitles;