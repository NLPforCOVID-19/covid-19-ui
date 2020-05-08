import React from 'react'
import { useRouter } from 'next/router'

const CountryPage = (props) => {
  const router = useRouter()
  const { country } = router.query
  return (
    <div>country: {country}</div>
  )
}

export default CountryPage
