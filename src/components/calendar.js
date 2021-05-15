import "./calendar.css";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { day_actions } from "../store/calendar";

//function that returns a week
Date.prototype.getWeek = function () {
  return [new Date(this.setDate(this.getDate() - this.getDay()))].concat(
    String(Array(6))
      .split(",")
      .map(function () {
        return new Date(this.setDate(this.getDate() + 1));
      }, this)
  );
};

// function which give us the weekly dates with appropiate classes
let get_week_details = (date) => {
  let week = new Date(new Date(date).toISOString().slice(0,10)).getWeek();

  let days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  let current_week = [];

  week.map((j) => {
    //console.log(days[new Date(curr.setDate(i)).getDay()]);
    let day_name = days[new Date(j).getDay()];
    let day = new Date(j);
    let iso_day = day.toISOString().slice(0, 10);
    let time = day.getTime();
    let date = day.getDate();

    let day_check = "prev";
    //console.log(time , "time")
    if (new Date().toISOString().slice(0, 10) == iso_day) {
      day_check = "today";
    }
    if (new Date().getTime() < time) {
      day_check = "next";
    }
    current_week.push({
      day: day_name,
      date: date,
      day_check: day_check,
    });
  });

  return current_week;
};

let week_arr = [];

//console.log(current_week, 22);

const Calendar = () => {
  const dispatch = useDispatch();
  const day = useSelector((state) => state.day.start_date);
  const [show_table, set_show_table] = useState(false);

  useEffect(() => {
    week_arr = get_week_details(day);
    //console.log(week_arr, 34, day);
    set_show_table(true);
  }, [show_table]);

  let handle_prev_week = () => {
    dispatch(day_actions.prev_week());
    set_show_table(false);
    //console.log(new Date(day), "after coming to component");
  };
  let handle_next_week = () => {
    dispatch(day_actions.next_week());
    set_show_table(false);
    //console.log(new Date(day), "after coming to component");
  };
  return (
    <div className="container my-4 ">
      {show_table && (
        <table className="table table-hover table-bordered">
          <thead>
            <tr>
              {week_arr.map((j) => {
                let day_class_name = "day_name";
                let date_class_name = "prev_date";
                if (j.day_check === "today") {
                  day_class_name = "today_day_name";
                  date_class_name = "today_date";
                }
                if (j.day_check === "next") {
                  date_class_name = "next_date";
                }

                return (
                  <th scope="col">
                    <div className="d-flex justify-content-center">
                      <div className={day_class_name}> {j.day} </div>
                      <span className={date_class_name}>{j.date}</span>
                    </div>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>@fat</td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td colspan="2">Larry the Bird</td>
              <td>@twitter</td>
            </tr>
          </tbody>
        </table>
      )}

      <div className="row my-4">
        <div className="col d-flex justify-content-end">
          <button
            className="btn btn-primary"
            onClick={() => handle_prev_week()}
          >
            {" "}
            Prev
          </button>
        </div>

        <div className="col  d-flex justify-content-start">
          <button
            className="btn btn-primary"
            onClick={() => handle_next_week()}
          >
            {" "}
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
