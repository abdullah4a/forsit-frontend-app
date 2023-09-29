import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import { VDataTable } from 'vuetify/labs/VDataTable'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'
const vuetify = createVuetify({
    components:{
        ...components,
        VDataTable
    },
    directives,
    theme: {
        themes: {
          light: {
            dark: false,
            colors: {
              primaryDeep: '#4043AF',
              primaryLight: '#5E79F6',
              black: "#1C1C1C",
              gray:"#48475D",
              white:"#FFFFFF"
            }
          },
          dark: {
            dark: true,//dark mode
            colors: {
                primaryDeep: '#4043AF',
                primaryLight: '#5E79F6',
                black: "#1C1C1C",
                gray:"#48475D",
                white:"#FFFFFF"
            }
          }
        },
      },
})


export default vuetify

