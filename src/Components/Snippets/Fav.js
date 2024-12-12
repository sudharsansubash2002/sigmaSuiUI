import { useState, useEffect } from "react";
import { addToFavorites, deleteFavorite, getTennantId } from "../../apifunction";

function Favourite(sigmaId) {
    const [fav, setFav] = useState(false);
    const [clicked, setClicked] = useState(false);
    const checkIfFavorited = (emailId, sigmaId) => {
        // Implement the logic to check if the item is favorited in your localStorage
        const favoriteItems = JSON.parse(localStorage.getItem(`favorites_${emailId}`)) || [];
        return favoriteItems.includes(sigmaId);
    };

    useEffect(() => {
        const emailId = localStorage.getItem("UserID");
        const isFav = checkIfFavorited(emailId, sigmaId.sigmaid);
        setFav(isFav);
        setClicked(false); 
    }, [sigmaId]);

    const favouritetrue = async () => {
        setFav(!fav);
        setClicked(true);
        try {
            const emailId = localStorage.getItem("UserID");
            const tenantId = await getTennantId(emailId);

            if (!fav) {
                const added = await addToFavorites(
                    emailId,
                    sigmaId.sigmaid,
                    sigmaId.name__v,
                    sigmaId.filename__v,
                    sigmaId.status__v,
                    tenantId
                );

                if (added) {
                    updateFavoritesInLocalStorage(emailId, sigmaId.sigmaid, true);
                }
            } else {
                const deleted = await deleteFavorite(
                    emailId,
                    sigmaId.sigmaid,
                    sigmaId.filename__v,
                    tenantId
                );

                if (deleted) {
                  setFav(false);
                  setClicked(false);
                  updateFavoritesInLocalStorage(emailId, sigmaId.sigmaid, false);
                   
                }
            }
        } catch (error) {
            console.error('Error:', error);
            // Handle the error here, e.g., show an error message to the user
        }
    };

    const updateFavoritesInLocalStorage = (emailId, sigmaId, isAdding) => {
        const favoriteItems = JSON.parse(localStorage.getItem(`favorites_${emailId}`)) || [];
        if (isAdding) {
            favoriteItems.push(sigmaId);
        } else {
            const index = favoriteItems.indexOf(sigmaId);
            if (index !== -1) {
                favoriteItems.splice(index, 1);
            }
        }
        localStorage.setItem(`favorites_${emailId}`, JSON.stringify(favoriteItems));
    };

    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        onClick={favouritetrue}
        width="16"
        height="16"
        fill={fav ? "currentColor" : "currentColor"}
        className="pointer"
        viewBox="0 0 16 16"
    >
        {clicked ? (
            // SVG path for clicked (favorite) state
            <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
        ) : fav ? (
            // SVG path for unclicked state (filled star)
            <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
        ) : (
            // SVG path for unclicked state (empty star)
            <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"/>
        )}
    </svg>
           
    );
}

export default Favourite;
