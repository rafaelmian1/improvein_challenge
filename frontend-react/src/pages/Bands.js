import React, { useEffect, useState } from 'react'
import axios from 'axios'
import BandCard from '../components/BandCard'
import styles from '../styles/bands.module.css'
import Modal from '../components/Modal'

const Bands = (props) => {
  const [modal, setModal] = useState({ view: false, id: null })
  const [bands, setBands] = useState([])
  const [filteredBands, setFilteredBands] = useState([])
  let initialFilterBy = {
    sortBy: 'A-Z',
    genre: 'All',
    country: 'All',
  }
  const [filterBy, setFilterBy] = useState(initialFilterBy)

  const fetch = async () => {
    let res = await axios.get(
      'https://my-json-server.typicode.com/improvein/dev-challenge/bands'
    )
    setFilteredBands(
      res.data.sort((a, b) => {
        if (a.name < b.name) {
          return -1
        }
        if (a.name > b.name) {
          return 1
        }
        return 0
      })
    )
    setBands(res.data)
  }

  useEffect(() => {
    fetch()
  }, [])

  let genres = bands
    .map((band) => band.genreCode)
    .filter((genre, index, array) => index === array.indexOf(genre))
  let countries = bands
    .map((band) => band.country)
    .filter((country, index, array) => index === array.indexOf(country))

  useEffect(() => {
    let auxBands = [...bands]
    switch (filterBy.sortBy) {
      case 'A-Z':
        auxBands.sort((a, b) => {
          if (a.name < b.name) {
            return -1
          }
          if (a.name > b.name) {
            return 1
          }
          return 0
        })
        break
      case 'Z-A':
        auxBands.sort((a, b) => {
          if (a.name < b.name) {
            return 1
          }
          if (a.name > b.name) {
            return -1
          }
          return 0
        })
        break
      case 'Year (desc)':
        auxBands.sort((a, b) => b.year - a.year)
        break
      case 'Year (asc)':
        auxBands.sort((a, b) => a.year - b.year)
        break
      default:
        return setFilteredBands(auxBands)
    }

    auxBands =
      filterBy.genre === 'All'
        ? auxBands
        : auxBands.filter((band) => band.genreCode === filterBy.genre)

    auxBands =
      filterBy.country === 'All'
        ? auxBands
        : auxBands.filter((band) => band.country === filterBy.country)
    setFilteredBands(auxBands)
  }, [filterBy, bands])

  const handleFilter = (e) => {
    setFilterBy({ ...filterBy, [e.target.name]: e.target.value })
  }

  let user = JSON.parse(localStorage.getItem('user'))

  return (
    <div className={styles.bandContainer}>
      <header className={styles.header}>
        <h1>Hi {user.name}</h1>
        <span
          onClick={() => {
            localStorage.removeItem('user')
            props.history.push('/')
          }}
        >
          Log Out
        </span>
      </header>
      <div>
        <label htmlFor='sort'>Sort by</label>
        <select
          id='sort'
          name='sortBy'
          value={filterBy?.sortBy}
          onChange={handleFilter}
        >
          <option>A-Z</option>
          <option>Z-A</option>
          <option>Year (desc)</option>
          <option>Year (asc)</option>
        </select>
        <label htmlFor='genre'>Filter by Genre</label>
        <select
          name='genre'
          id='genre'
          value={filterBy?.genre}
          onChange={handleFilter}
        >
          <option name='all'>All</option>
          {genres?.map((g) => (
            <option key={g} name={g}>
              {g}
            </option>
          ))}
        </select>
        <label htmlFor='country'>Filter by Country</label>
        <select
          name='country'
          id='country'
          value={filterBy?.country}
          onChange={handleFilter}
        >
          <option name='all'>All</option>
          {countries?.map((c) => (
            <option key={c} name={c}>
              {c}
            </option>
          ))}
        </select>
        <button
          className={styles.resetButton}
          onClick={() => setFilterBy(initialFilterBy)}
        >
          Reset filters
        </button>
      </div>

      <div className={styles.cardsContainer}>
        {filteredBands.map((band) => (
          <BandCard band={band} setModal={setModal} key={band.id} />
        ))}
      </div>

      {modal?.view && <Modal modal={modal} setModal={setModal} />}
    </div>
  )
}

export default Bands
