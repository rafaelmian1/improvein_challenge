import React from 'react'
import styles from '../styles/bands.module.css'
const BandCard = ({ band, setModal }) => {
  return (
    <div className={styles.bandCard}>
      <h1>{band?.name}</h1>
      <h4>Genre: {band?.genreCode}</h4>
      <h4>Year: {band?.year}</h4>
      <h4>Country: {band?.country}</h4>
      <button onClick={() => setModal({ view: true, id: band.id })}>
        View More
      </button>
    </div>
  )
}

export default BandCard
