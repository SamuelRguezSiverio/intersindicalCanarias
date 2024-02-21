import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Typography
} from '@mui/material'
import React from 'react'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

function PokemonCard({
  abilities,
  base_experience,
  height,
  id,
  moves,
  name,
  weight,
  sprites,
  stats
}) {
  function generateAbilities() {
    const abilitiesElements = abilities.map((element) => {
      return <Typography>{element.ability.name}</Typography>
    })
    return abilitiesElements
  }

  return (
    <Card sx={{ minWidth: '180px', boxShadow: '0 5px 12px black' }}>
      <CardMedia
        sx={{
          minHeight: '150px',
          filter: 'drop-shadow(7px 7px 3px rgba(0,0,0,0.7))'
        }}
        image={sprites.front_default}
      ></CardMedia>
      <CardHeader sx={{ textAlign: 'center' }} title={name}></CardHeader>
      <CardContent>
        <Typography>Weight: {weight}</Typography>
        <Typography>Height: {height}</Typography>
        {abilities && (
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="abilities-content"
            >
              <Typography>Abilities</Typography>
            </AccordionSummary>
            <AccordionDetails>{generateAbilities()}</AccordionDetails>
          </Accordion>
        )}
      </CardContent>
    </Card>
  )
}

export default PokemonCard
