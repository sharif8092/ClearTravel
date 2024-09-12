// import { useEffect, useState } from "react";
// import axios from "axios";
// import InfiniteScroll from "react-infinite-scroll-component";
// import {
//   Navbar,
//   HotelCard,
//   Categories,
//   SearchStayWithDate,
//   Filter,
//   AuthModal,
//   ProfileDropDown,
//   Alert
// } from "../../components";
// import "./Home.css";
// import { useCategory, useDate, useFilter, useAuth, useAlert } from "../../context";
// import {
//   getHotelsByPrice,
//   getHotelsByRoomsAndBeds,
//   getHotelsByPropertyType,
//   getHotelsByRatings,
//   getHotelsByCancelation,
// } from "../../utils";

// export const Home = () => {
//   const [hasMore, setHasMore] = useState(true);
//   const [currentIndex, setCurrentIndex] = useState(16);
//   const [testData, setTestData] = useState([]);
//   const [hotels, setHotels] = useState([]);
//   const { hotelCategory } = useCategory();
//   const { isSearchModalOpen } = useDate();
//   const {
//     isFilterModalOpen,
//     priceRange,
//     noOfBathrooms,
//     noOfBedrooms,
//     noOfBeds,
//     propertyType,
//     traveloRating,
//     isCancelable,
//   } = useFilter();

//   const { isAuthModalOpen, isDropDownModalOpen } = useAuth();
//   const { alert } = useAlert();

//   useEffect(() => {
//     (async () => {
//       try {
//         const { data } = await axios.get(
//           `https://cleartravel.onrender.com/api/hotels?category=${hotelCategory}`
//         );

//         setTestData(data);
//         setHotels(data ? data.slice(0, 16) : []);
//       } catch (err) {
//         console.log(err);
//       }
//     })();
//   }, [hotelCategory]);


//   const fetchMoreData = () => {
//     if (hotels.length >= testData.length) {
//       setHasMore(false);
//       return;
//     }
//     setTimeout(() => {
//       if (hotels && hotels.length > 0) {
//         setHotels(
//           hotels.concat(testData.slice(currentIndex, currentIndex + 16))
//         );
//         setCurrentIndex((prev) => prev + 16);
//       } else {
//         setHotels([]);
//       }
//     }, 1000);
//   };

//   const filteredHotelsByPrice = getHotelsByPrice(hotels, priceRange);
//   const filteredHotelsByBedsAndRooms = getHotelsByRoomsAndBeds(
//     filteredHotelsByPrice,
//     noOfBathrooms,
//     noOfBedrooms,
//     noOfBeds
//   );
//   const filteredHotelsByPropertyType = getHotelsByPropertyType(
//     filteredHotelsByBedsAndRooms,
//     propertyType
//   );

//   const filteredHotelsByRatings = getHotelsByRatings(
//     filteredHotelsByPropertyType,
//     traveloRating
//   );

//   const filteredHotelsByCancelation = getHotelsByCancelation(
//     filteredHotelsByRatings,
//     isCancelable
//   );
  
//   const [timer, setTimer] = useState(120); 
//     useEffect(() => {
//       const interval = setInterval(() => {
//         setTimer((prevTimer) => {
//           if (prevTimer <= 1) {
//             clearInterval(interval); // Stop the timer at 0
//             return 0;
//           }
//           return prevTimer - 1;
//         });
//       }, 1000); 
  
//       // Cleanup the interval when the component unmounts
//       return () => clearInterval(interval);
//     }, []);

//   return (
//     <div className="relative">
      
//       <Navbar route="home"/>
//       <Categories />
//       {hotels && hotels.length > 0 ? (
//          <>
//         <InfiniteScroll
//           dataLength={hotels.length}
//           next={fetchMoreData}
//           hasMore={hasMore}
//           loader={
//             hotels.length > 0 && <div className="alert-text">
//              Loading ....
//             </div>
//           }
//           endMessage={<p className="alert-text">You have seen it all</p>}
//         >
//           <main className="main d-flex align-center wrap gap-larger">
//             {filteredHotelsByCancelation &&
//               filteredHotelsByCancelation.map((hotel) => (
//                 <HotelCard key={hotel._id} hotel={hotel} />
//               ))}
//           </main>
//         </InfiniteScroll>
//         </>
//       ) : (
//         <div class="black-background-div">Loading ....wait for {Math.floor(timer / 60)}:{timer % 60 < 10 ? `0${timer % 60}` : timer % 60} sec beacause i am using free hosting
//            it take some time to host </div>

//       )}
//       {isDropDownModalOpen && <ProfileDropDown />}
//       {isSearchModalOpen && <SearchStayWithDate />}
//       {isFilterModalOpen && <Filter />}
//       {isAuthModalOpen && <AuthModal />}
//       {alert.open && <Alert />}
//     </div>
//   );
// };


import { useEffect, useState } from "react";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import {
  Navbar,
  HotelCard,
  // Categories,
  SearchStayWithDate,
  Filter,
  AuthModal,
  ProfileDropDown,
  Alert
} from "../../components";
import "./Home.css";
import { useCategory, useDate, useFilter, useAuth, useAlert } from "../../context";
import {
  getHotelsByPrice,
  getHotelsByRoomsAndBeds,
  getHotelsByPropertyType,
  getHotelsByRatings,
  getHotelsByCancelation,
} from "../../utils";

export const Home = () => {
  const [hasMore, setHasMore] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(16);
  const [testData, setTestData] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // New state for loading
  const { hotelCategory } = useCategory();
  const { isSearchModalOpen } = useDate();
  const {
    isFilterModalOpen,
    priceRange,
    noOfBathrooms,
    noOfBedrooms,
    noOfBeds,
    propertyType,
    traveloRating,
    isCancelable,
  } = useFilter();

  const { isAuthModalOpen, isDropDownModalOpen } = useAuth();
  const { alert } = useAlert();

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          `https://cleartravel.onrender.com/api/hotels?category=${hotelCategory}`
        );

        setTestData(data);
        setHotels(data ? data.slice(0, 16) : []);
        setIsLoading(false); // Set loading to false after data is fetched
      } catch (err) {
        console.log(err);
        setIsLoading(false); // Stop loading in case of error
      }
    })();
  }, [hotelCategory]);

  const fetchMoreData = () => {
    if (hotels.length >= testData.length) {
      setHasMore(false);
      return;
    }
    setTimeout(() => {
      if (hotels && hotels.length > 0) {
        setHotels(
          hotels.concat(testData.slice(currentIndex, currentIndex + 16))
        );
        setCurrentIndex((prev) => prev + 16);
      } else {
        setHotels([]);
      }
    }, 1000);
  };

  const filteredHotelsByPrice = getHotelsByPrice(hotels, priceRange);
  const filteredHotelsByBedsAndRooms = getHotelsByRoomsAndBeds(
    filteredHotelsByPrice,
    noOfBathrooms,
    noOfBedrooms,
    noOfBeds
  );
  const filteredHotelsByPropertyType = getHotelsByPropertyType(
    filteredHotelsByBedsAndRooms,
    propertyType
  );

  const filteredHotelsByRatings = getHotelsByRatings(
    filteredHotelsByPropertyType,
    traveloRating
  );

  const filteredHotelsByCancelation = getHotelsByCancelation(
    filteredHotelsByRatings,
    isCancelable
  );
  
  const [timer, setTimer] = useState(120); 
    useEffect(() => {
      const interval = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer <= 1) {
            clearInterval(interval); // Stop the timer at 0
            return 0;
          }
          return prevTimer - 1;
        });
      }, 1000); 
  
      return () => clearInterval(interval);
    }, []);

  return (
    <div className="relative">
      <div className="head">
      <Navbar route="home"/>
      {/* <Categories /> */}
      </div>
      {isLoading ? (
      <div className="black-background-div">
          Loading... please wait {Math.floor(timer / 60)}:{timer % 60 < 10 ? `0${timer % 60}` : timer % 60} 
          sec. I am using free hosting; it may take some time to load.
      </div>
      ) : hotels.length > 0 ? (
        <>
          <InfiniteScroll
            dataLength={hotels.length}
            next={fetchMoreData}
            hasMore={hasMore}
            loader={
              hotels.length > 0 && <div className="alert-text">Loading...</div>
            }
            endMessage={<p className="alert-text">You have seen it all</p>}
          >
            <main className="main d-flex align-center wrap gap-larger">
              {filteredHotelsByCancelation &&
                filteredHotelsByCancelation.map((hotel) => (
                  <HotelCard key={hotel._id} hotel={hotel} />
                ))}
            </main>
          </InfiniteScroll>
        </>
      ) : (
        <div>No hotels found</div>
      )}
        <div className="drop-down" >
        {isDropDownModalOpen && <ProfileDropDown />}
        {isSearchModalOpen && <SearchStayWithDate />}
        {isFilterModalOpen && <Filter />}
        {isAuthModalOpen && <AuthModal />}
        {alert.open && <Alert />}
        </div>
    </div>
  );
};
