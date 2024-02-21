import { useState } from 'react'

import './ResourceCard.css'

import { Card, CardHeader, CardMedia } from '@mui/material'

function ResourceCard({ title, image }) {
  const [hoverClass, setHoverClass] = useState('')

  return (
    <Card
      sx={{ minWidth: '180px', boxShadow: '0 5px 12px black' }}
      onMouseEnter={() => {
        setHoverClass('card-enter')
      }}
      onMouseLeave={() => {
        setHoverClass('card-leave')
      }}
      className={`${hoverClass} home-card`}
    >
      <CardMedia
        sx={{ minHeight: '150px', minWidth: '280px' }}
        image={image}
      ></CardMedia>
      <CardHeader
        sx={{ textAlign: 'center' }}
        title={title.toUpperCase()}
      ></CardHeader>
    </Card>
  )
}

export default ResourceCard
