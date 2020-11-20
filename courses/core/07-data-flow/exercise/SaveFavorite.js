import React from 'react'
import { HiHeart, HiOutlineHeart } from 'react-icons/hi'

import { useFavoriteProduct } from 'YesterTech/FavoriteProductState'

function SaveFavorite({ productId }) {
  const { isFavorite, addFavorite, removeFavorite } = useFavoriteProduct()

  // See if our productId is one of the favorites
  const favorite = isFavorite(productId)

  function handleClick() {
    if (favorite) {
      removeFavorite(productId)
    } else {
      addFavorite(productId)
    }
  }

  return (
    <button className="text-small as-link" onClick={handleClick}>
      <span>Favorite</span>
      {favorite ? <HiHeart color="#f00" /> : <HiOutlineHeart />}
    </button>
  )
}

export default SaveFavorite
