import { createVuetify, type ThemeDefinition } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import { MotionPlugin as motions } from '@vueuse/motion'



export default defineNuxtPlugin(nuxtApp => {
    const colorPalette: ThemeDefinition={
      dark:false,
      colors:{
        primaryDarkBgColor: '#0b141a',
        secondaryDarkBtnColor: '#202c33',
        primary: '#42A5F5', //blue
        cancel: '#EF5350', //red
        secondary_a: '#66BB6A', //green
        secondary_b: '#FFA726', //orange
        tertiary_a: '#4a154b', //purple
        bckgrnd: '#e9eef2', //grey

      }
    };
    const vuetify = createVuetify({
        components,
        directives,

        icons: {
            defaultSet: 'mdi',
            aliases,
            sets: {
              mdi,
            }
          },
        theme: {
          defaultTheme: 'colorPalette',
          themes: {
            colorPalette,
          }

        },
        
    });
    

    nuxtApp.vueApp.use(vuetify)
    return {
      provide: {
        colorPalette
      }
    }
  })


  