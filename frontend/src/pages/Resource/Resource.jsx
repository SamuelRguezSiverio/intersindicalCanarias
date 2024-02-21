import { useState, useEffect } from 'react'

import './Resource.css'

import PokemonCard from '../../components/PokemonCard/PokemonCard'

import { Box, Typography } from '@mui/material'

import { useParams } from 'react-router-dom'

import { getResource, getDeeperResource } from '../../services/pokeApiResources'

function Resource() {
  const [resourceItems, setResourceItems] = useState([])

  const { resourceName } = useParams()

  useEffect(() => {
    async function refreshResourceItems() {
      const response = await getResource(resourceName)
      const DeeperResource = await getDeeperResource(response)
      setResourceItems(DeeperResource)
    }
    refreshResourceItems()
  }, [])

  function generateCards() {
    if (resourceName === 'pokemon') {
      const cards = resourceItems.map((pokemon) => {
        return (
          <PokemonCard
            key={pokemon.id}
            name={pokemon.name}
            sprites={pokemon.sprites}
            abilities={pokemon.abilities}
            weight={pokemon.weight}
            height={pokemon.height}
          ></PokemonCard>
        )
      })
      return cards
    } else {
      return <>No se ha podido generar las tarjetas</>
    }
  }

  return (
    <Box className="resource-container">
      <Box className="resource-content">
        <Typography
          variant="h1"
          textAlign="center"
          sx={(theme) => ({
            marginTop: '40px',
            textShadow: '-1px 0 white, 0 1px white, 1px 0 white, 0 -1px white',
            [theme.breakpoints.down('sm')]: {
              fontSize: '3rem'
            }
          })}
        >
          {resourceName.toLocaleUpperCase() + ' LIST'}
        </Typography>
        <Box
          sx={(theme) => ({
            display: 'flex',
            justifyContent: 'space-evenly',
            alignItems: 'flex-start',
            gap: '30px',
            flexWrap: 'wrap',
            marginTop: '40px',
            backgroundColor: 'white',
            padding: '40px',
            borderRadius: '10px',
            [theme.breakpoints.down('sm')]: {
              padding: '15px',
              marginTop: '20px'
            }
          })}
        >
          {generateCards()}
        </Box>
      </Box>
    </Box>
  )
}

export default Resource
