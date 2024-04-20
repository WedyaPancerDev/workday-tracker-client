import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { Box, CardActionArea, styled } from '@mui/material'

const CardBase = styled('div')({
  maxWidth: 345,
  height: '430px',
  borderRadius: '8px',
  boxShadow: '0 2px 8px 0 rgba(0,0,0,.08)'
})

const ProductCard = (): JSX.Element => {
  return (
    <CardBase>
      <CardActionArea sx={{ overflow: 'hidden', position: 'relative' }}>
        <Box
          sx={{
            backgroundColor: '#5A5A5A',
            height: 160,
            padding: '8px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            color: '#FFF'
          }}
        >
          <Typography gutterBottom variant="h5" component="div">
            Lizard
          </Typography>
        </Box>

        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Lizard
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography>
        </CardContent>
      </CardActionArea>
    </CardBase>
  )
}

export default ProductCard
