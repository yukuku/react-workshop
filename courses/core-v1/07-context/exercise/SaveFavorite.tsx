import * as React from 'react'
import { HiHeart, HiOutlineHeart } from 'react-icons/hi'
import { useFavoriteProduct } from './FavoriteProductState'

interface SaveFavoriteProps {
  productId: number
}

function SaveFavorite({ productId }: SaveFavoriteProps): React.ReactElement {
  let { isFavorite, removeFavorite, addFavorite } = useFavoriteProduct()

  // See if our productId is one of the favorites
  const favorite = isFavorite(productId)

  function handleClick() {
    if (favorite) {
      // Remove favorites by filtering an array down to everything that
      // doesn't match the productId
      removeFavorite(productId)
    } else {
      // Add favorites by concatenating two arrays together. If favorites
      // looks like this: [1, 2] and you concat an array that looks
      // like this [3], the end result is [1,2,3]
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
