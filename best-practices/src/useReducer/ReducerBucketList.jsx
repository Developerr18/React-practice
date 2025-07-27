import { useReducer } from "react";

const initialArtworkList = [
  { id: 0, title: "Big Bellies", seen: false },
  { id: 1, title: "Lunar Landscape", seen: false },
  { id: 2, title: "Terracotta Army", seen: true },
];

function artReducer(artList, action) {
  switch (action.type) {
    case "TOGGLE_SEEN":
      return artList.map((artwork) => {
        if (artwork.id === action.artId) {
          return { ...artwork, seen: action.seen };
        } else {
          return artwork;
        }
      });
  }
}

export default function ReducerBucketList() {
  const [myList, dispatchMyList] = useReducer(artReducer, initialArtworkList);
  const [yourList, dispatchYourList] = useReducer(
    artReducer,
    initialArtworkList
  );

  function handleToggleMyList(artworkId, nextSeen) {
    dispatchMyList({
      type: "TOGGLE_SEEN",
      artId: artworkId,
      seen: nextSeen,
    });
  }

  function handleToggleYourList(artworkId, nextSeen) {
    dispatchYourList({
      type: "TOGGLE_SEEN",
      artId: artworkId,
      seen: nextSeen,
    });
  }

  /*
  const [myList, setMyList] = useState(initialList);
  const [yourList, setYourList] = useState(initialList);
  
  function handleToggleMyList(artworkId, nextSeen) {
    setMyList(
      myList.map((artwork) => {
        if (artwork.id === artworkId) {
          return { ...artwork, seen: nextSeen };
        } else {
          return artwork;
        }
      })
    );
  }
  function handleToggleYourList(artworkId, nextSeen) {
    setYourList(
      yourList.map((artwork) => {
        if (artwork.id === artworkId) {
          return { ...artwork, seen: nextSeen };
        } else {
          return artwork;
        }
      })
    );
  }*/

  return (
    <>
      <h1 className="text-2xl">Art Bucket List With Reducer</h1>
      <hr />
      <h2>My list of art to see:</h2>
      <ItemList artworks={myList} onToggle={handleToggleMyList} />
      <hr />
      <h2>Your list of art to see:</h2>
      <ItemList artworks={yourList} onToggle={handleToggleYourList} />
    </>
  );
}

function ItemList({ artworks, onToggle }) {
  return (
    <ul>
      {artworks.map((artwork) => (
        <li key={artwork.id}>
          <label>
            <input
              type="checkbox"
              checked={artwork.seen}
              onChange={(e) => {
                onToggle(artwork.id, e.target.checked);
              }}
            />
            {artwork.title}
          </label>
        </li>
      ))}
    </ul>
  );
}
