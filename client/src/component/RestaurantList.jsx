import React, { useContext, useState, useEffect } from "react";
// React ke saath saare zaroori hooks (useContext, useState, useEffect) import kar liye taaki data share, state manage aur filtering automatic ho sake.
// import RestaurantCard from "./RestaurantCard";
// Ek single restaurant ka card dikhane wala component (RestaurantCard) import kiya
import { RestaurantContext } from "../context/RestaurantContext";
// Apne main context storage se connect kiya jahan saare restaurants ka real data pada hai.
import RestaurantCard from "./RestaurentCard";
import PreviousOrders from "../component/PreviousOrder";
// Pichle wale purane orders wale component (PreviousOrders) ko import kiya taaki zaroorat padne par screen par dikha sakein.
const RestaurantList = () => {
  // Yahan se apna main RestaurantList functional component shuru ho raha hai.
  const { restaurants, setSelectedRestaurant } = useContext(RestaurantContext);
  // Context se saare restaurants ki list aur kisi ek restaurant ko select karne wala function (setSelectedRestaurant) nikaal liya.
  const [filteredRestaurants, setFilteredRestaurants] = useState([
    ...restaurants,
  ]);
  // Ek state banayi un restaurants ke liye jo filter hone ke baad screen par bachenge. Shuru mein isme saare original restaurants daal diye ([...restaurants]).
  const [ratingFilter, setRatingFilter] = useState("");
  // User ne rating box mein kya likha (jaise 4 star ya 5 star), usko yaad rakhne ke liye ek state banayi jo shuru mein khaali ("") hai.
  const [searchTerm, setSearchTerm] = useState("");
  // User search box mein jo naam type karega (jaise Haldiram ya Dominos), usko track karne ke liye ek state banayi.
  const [showOrder, setShowOrder] = useState(false);
  // Purane orders wala section screen par kholna hai ya nahi, uski state hai. Shuru mein yeh false (hidden) hai.

  useEffect(() => {
    filterRestaurants();
  }, [ratingFilter, searchTerm, restaurants]);
  // Yeh hook automatic chalta hai. Iska matlab hai: "Jab bhi user rating change kare, search mein kuch type kare, ya original restaurants ka data badle, toh turant filterRestaurants function ko chala do."

  const handleRestaurantClick = (restaurantId) => {
    // Ek function banaya jo tab chalega jab koi user kisi restaurant card par click karega.
    setSelectedRestaurant(
      restaurants.find((restaurant) => restaurant._id === restaurantId),
    );
    // Click hote hi, yeh line saare restaurants mein se us restaurant ko dhoondti hai jiski ID match ho jaye, aur use main context mein "selected" set kar deti hai.
  };

  const handleRatingChange = (e) => {
    setRatingFilter(e.target.value);
  };
  // Jaise hi user rating input box mein koi number type karega, yeh function chalega aur ratingFilter state ko update kar dega.

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  // Jaise hi user search box mein naam type karega, yeh function chalega aur searchTerm state ko update kar dega.

  const filterRestaurants = () => {
    // Restaurants ko filter karne ka main logic function hai. Shuru mein isne ek temporary list banayi jisme saare restaurants hain.
    let filtered = restaurants;

    if (ratingFilter) {
      filtered = filtered.filter(
        (restaurant) => restaurant.rating >= parseFloat(ratingFilter),
      );
    }
    // Agar user ne koi rating daali hai, toh yeh sirf un restaurants ko bachaega jinki rating user ki daali hui rating se barabar ya zyada (>=) hai.

    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      // Agar user ne search box mein kuch likha hai, toh pehle us text ko choti ABC (toLowerCase) mein convert kiya taaki capital/small letter ka panga na ho.
      filtered = filtered.filter((restaurant) =>
        restaurant.name.toLowerCase().includes(searchLower),
      );
      // Phir yeh check karta hai ki kya restaurant ke naam mein user ka likha hua word aa raha hai (includes). Agar haan, toh use list mein rakh leta hai
    }

    setFilteredRestaurants(filtered);
    // Aakhiri mein, jo bhi restaurants filter hokar bache, unhe filteredRestaurants state mein set kar diya taaki screen update ho jaye.
  };
  const handleShow = () => {
    setShowOrder(!showOrder);
    // Yeh function showOrder state ko ulta (!) kar deta hai. Agar page khula hai toh band kar dega, band hai toh khol dega (toggle click).
  };
  return (
    // Yahan se JSX shuru ho raha hai jo user ko screen par dikhega.
    <div className="container">
      <h2 className="header">Restaurant List</h2>
      {/* Main outer container open kiya aur upar ek sahi si heading daal di: Restaurant List. */}
      <div className="filter-container">
        {/* Ek alag se box banaya jiske andar search aur rating ke input boxes aayenge. */}
        <label htmlFor="rating" className="filter-label">
          Filter by Rating:
        </label>
        {/* Rating input box ke aage text dikhane ke liye label lagaya. */}
        <input
          type="number"
          id="rating"
          value={ratingFilter}
          onChange={handleRatingChange}
          className="filter-input"
        />
        {/* Rating daalne ke liye ek number input box banaya, jo badalne par handleRatingChange ko chalata hai.x */}
        <label htmlFor="search" className="filter-label">
          Search by Name:
        </label>
        {/* Search input box ke aage text dikhane ke liye label lagaya. */}
        <input
          type="text"
          id="search"
          value={searchTerm}
          onChange={handleSearchChange}
          className="filter-input"
        />
        {/* Naam search karne ke liye text input box banaya, jo badalne par handleSearchChange ko chalata hai. */}
        <p id="pre-orders" onClick={handleShow}>
          Previous Orders
        </p>
        {/* Ek clickable text link banaya "Previous Orders" naam ka. Ispar click karte hi handleShow function chalega aur purane orders dikhenge. */}
      </div>
      <div className="restaurant-card-container">
        {/* Ek container banaya jahan saare restaurant ke cards line se dikhenge. */}
        {filteredRestaurants.map((restaurant) => (
          // Yahan map loop chal raha hai filter kiye hue restaurants par, taaki screen par sirf wahi dikhein jo search match kar rahe hain.
          <RestaurantCard
            key={restaurant._id}
            restaurant={restaurant}
            onClick={() => handleRestaurantClick(restaurant._id)}
          />
          // Har ek restaurant ke liye ek <RestaurantCard> banaya. React ke liye unique key mein restaurant ki ID di, aur click hone par handleRestaurantClick ko uski ID ke saath trigger kar diya.
        ))}
      </div>
      {showOrder && <PreviousOrders handleShow={handleShow} />}
      {/* Yeh short-circuit check hai. Agar showOrder true hoga, tabhi screen par <PreviousOrders> ka modal/page khulega aur band karne ke liye use handleShow function bhej diya. */}
    </div>
  );
};

export default RestaurantList;
// Saare bache hue tags close kiye aur component ko export maara taaki baaki app mein use ho sake.
