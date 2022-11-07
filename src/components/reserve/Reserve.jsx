import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import { SearchContext } from "../../context/SearchContext";
import { useState } from "react";
import StripCheckout from "react-stripe-checkout"
import useFetch from "../../hooks/userFetch";
import "./reserve.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Reserve = ({ setOpen, hotelId }) => {
  const [selectedRooms, setSelectRooms] = useState([]);
  const [product, setProduct] = useState({
  })
  const { data, loading, error } = useFetch(`/hotels/room/${hotelId}`);
  const { dates } = useContext(SearchContext);

  const getDatesInRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const date = new Date(start.getTime());

    let dates = [];

    while (date <= end) {
      dates.push(new Date(date).getTime());
      date.setDate(date.getDate() + 1);
    }

    return dates;
  };

  const alldates = getDatesInRange(dates[0].startDate, dates[0].endDate);

  const isAvailable = (roomNumber) => {
    const isFound = roomNumber.unavailableDates.some((date) =>
      alldates.includes(new Date(date).getTime())
    );

    return !isFound;
  };
  const handleSelect = (e) => {
    const checked = e.target.checked;
    const value = e.target.value;
    setSelectRooms(
      checked
        ? [...selectedRooms, value]
        : selectedRooms.filter((item) => item !== value)
    );
  };

  const navigate = useNavigate()

  const handleClick = async () => {
    try {
      await Promise.all(
        selectedRooms.map((roomId) => {
          const res = axios.put(`/rooms/availability/${roomId}`, {
            dates: alldates,
          });
          return res.data;
        })
      );
      setOpen(false)
        navigate("/")
    } catch (err) {
      console.log(err);
    }
  };

  const makePayment = (req, res, token) => {
    try {
      const body = {
        token,
        product,
      };
      const { data } = axios.post(
        "http://localhost:5000/api/payment",
        {
          body: JSON.stringify(body),
        }
      );
      console.log(res);
    } catch (error) {
      return res.status(200).json({ message: error.message });
    }
  };

  return (
    <div className="reserve">
      <div className="rContainer">
        <FontAwesomeIcon
          icon={faCircleXmark}
          className="reClose"
          onClick={() => setOpen(false)}
        />
        <span>Select your rooms:</span>
        {data.map((item) => (
          <div className="rItem">
            <div className="rItemInfo">
              <div className="rTitle">{item.title}</div>
              <div className="rDesc">{item.desc}</div>
              <div className="rMax">
                Max people: <b> {item.maxPeople}</b>
              </div>
              <div className="rPrice"> ₹ {item.price}</div>
            </div>
            <div className="rSelectRooms">
              {item.roomNumbers.map((roomNumber) => (
                <div className="room">
                  <label>{roomNumber.number}</label>
                  <input
                    type="checkbox"
                    value={roomNumber._id}
                    onChange={handleSelect}
                    disabled={!isAvailable(roomNumber)}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
        <StripCheckout
        stripeKey="pk_test_51LzDYxSGogA8XySWV1T7LRSfdZ4q6rVJEfXRP2rXV9y3IYNZxxALQlKlM5BG9SSeEZ7Wr5KupbAr8dgPVyxGBBMX00D1V24FTh"
        token={makePayment}
        name="Buy React"
        amount={ data.price  * 100} 
        >
        <button onClick={handleClick} className="rButton">
          Reserve Now!
        </button>
        </StripCheckout>
      </div>
    </div>
  );
};

export default Reserve;
