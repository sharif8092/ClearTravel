// import axios from "axios";
// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { useAuth, useDate, useAlert } from "../../context";
// import {
//   FinalPrice,
//   HotelDetails,
//   HotelImages,
//   Navbar,
//   AuthModal,
//   ProfileDropDown,
//   SearchStayWithDate,
//   Alert
// } from "../../components";
// import "./SingleHotel.css";

// export const SingleHotel = () => {
//   const { id } = useParams();
//   const [singleHotel, setSingleHotel] = useState({});

//   const { isAuthModalOpen, isDropDownModalOpen } = useAuth();
//   const { isSearchModalOpen } = useDate();
//   const { alert } = useAlert();

//   useEffect(() => {
//     (async () => {
//       try {
//         const { data } = await axios.get(
//           `https://cleartravel.onrender.com/api/hotels/${id}`
//         );
//         setSingleHotel(data);
//       } catch (err) {
//         console.log(err);
//       }
//     })();
//   }, [id]);

//   const { name, state } = singleHotel;

//   return (
//     <div className="relative">
          
//      <main className="single-hotel-page wrapper">
//        <div className="singlehotelpage-nav header" >
//           <Navbar />
//        </div>
//        <div className="hotel-name-add content">
//            <div>
//            {name}, {state}
//            </div>
//            <div>
//             <HotelImages singleHotel={singleHotel} />
//            </div>
//        </div>
//        <div className="d-flex final-check footer">
//           <HotelDetails singleHotel={singleHotel} />
//           <FinalPrice singleHotel={singleHotel} />
//        </div>
//     </main>
//       {isSearchModalOpen && <SearchStayWithDate />}
//       {isDropDownModalOpen && <ProfileDropDown />}
//       {isAuthModalOpen && <AuthModal />}
//       {alert.open && <Alert />}
//     </div>
//   );
// };


import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth, useDate, useAlert } from "../../context";
import {
  FinalPrice,
  HotelDetails,
  HotelImages,
  Navbar,
  AuthModal,
  ProfileDropDown,
  SearchStayWithDate,
  Alert
} from "../../components";
import "./SingleHotel.css";

export const SingleHotel = () => {
  const { id } = useParams();
  const [singleHotel, setSingleHotel] = useState({});

  const { isAuthModalOpen, isDropDownModalOpen } = useAuth();
  const { isSearchModalOpen } = useDate();
  const { alert } = useAlert();

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          `https://cleartravel.onrender.com/api/hotels/${id}`
        );
        setSingleHotel(data);
      } catch (err) {
        console.log(err);
      }
    })();
  }, [id]);

  const { name, state } = singleHotel;

  return (
    <div className="relative">
        <div className="header" >
          <Navbar />
       </div> 
       <div className="content ">
           <div className="hotelName" >
           {name}, {state}
           </div>
           <div className="hotelImage" >
            <HotelImages singleHotel={singleHotel} />
           </div>
       </div> 
       <div className="sidebar1">
          <HotelDetails singleHotel={singleHotel} />
          <FinalPrice singleHotel={singleHotel} />
       </div>
       <div className="sidebar2" >
         {isSearchModalOpen && <SearchStayWithDate />}
         {isDropDownModalOpen && <ProfileDropDown />}
         {isAuthModalOpen && <AuthModal />}
         {alert.open && <Alert />}
       </div>
     
    
    </div>
  );
};
