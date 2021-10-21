import axios from 'axios'
import React, { useEffect, useState } from 'react'
import styles from '../styles/bands.module.css'
const Modal = ({ setModal, modal }) => {
  const [albums, setAlbums] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchAlbums = async () => {
    let res = await axios.get(
      'https://my-json-server.typicode.com/improvein/dev-challenge/albums'
    )
    setAlbums(res.data.filter((alb) => alb.bandId === modal.id))
    setLoading(false)
  }
  useEffect(() => {
    fetchAlbums()
    // eslint-disable-next-line
  }, [])

  return (
    <div className={styles.modal}>
      <div className={styles.albumContainer}>
        {!loading ? (
          albums?.length ? (
            albums.map((alb) => (
              <div className={styles.albumCard}>
                <h1>{alb?.name}</h1>
                <h4>Year: {alb?.year}</h4>
              </div>
            ))
          ) : (
            <div className={styles.albumCard}>
              <h3>Nothing to show yet</h3>
            </div>
          )
        ) : (
          <h2 className={styles.loading}>Loading...</h2>
        )}
      </div>
      <button onClick={() => setModal({ view: false, id: null })}>
        Go Back
      </button>
    </div>
  )
}

export default Modal
