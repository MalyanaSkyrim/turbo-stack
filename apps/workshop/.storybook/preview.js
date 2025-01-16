/** @type { import('@storybook/react').Preview } */
import '@repo/ui/src/styles/globals.css'

const preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
}

export default preview
