import React from 'react'
import { ThemeProvider } from '@mui/material'
import { createTheme } from '@mui/material/styles'

const theme = createTheme({
    typography: { fontSize: 18 }
})

const withRouter = (Component) => function func({ ...props }) {
    return (
        <ThemeProvider theme={theme}>
            <Component {...props} />
        </ThemeProvider>
    )
}

export default withRouter
