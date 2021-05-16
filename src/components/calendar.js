import "./calendar.css";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { day_actions } from "../store/calendar";
import {event_actions} from "../store/events";
import {
  CheckCircle,
  Trash,
  SkipBackwardCircle,
  SkipForwardCircle,
} from "react-bootstrap-icons";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { v4 as uuidv4 } from 'uuid';

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

//function to check same day
const sameDay = (d1, d2) => {
  //console.log(d1,d2);
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
};

// function which give us the weekly dates with appropiate classes
let get_week_details = (date) => {
  let week = new Date(new Date(date).toISOString().slice(0, 10)).getWeek();

  let days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  let current_week = [];

  week.map((j) => {
    //console.log(days[new Date(curr.setDate(i)).getDay()]);
    let day_name = days[new Date(j).getDay()];
    let day = new Date(j);
    let time = day.getTime();
    let date = day.getDate();

    let day_check = "prev";
    //console.log(time , "time")
   // console.log("today check",new Date(),day);
    if (sameDay(new Date(), day)) {
      day_check = "today";
    }
    if (new Date().getTime() < time) {
      day_check = "next";
    }
    current_week.push({
      date_ins: day,
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
  const event_arr = useSelector((state) => state.events);
  //console.log(event_arr);
  const [show_table, set_show_table] = useState(false);
  const [Todo_date, setTodo_date] = useState(new Date());
  const [todo_description,set_todo_description] = useState('');

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

  let handle_mark_as_done = (id) => {
    let index = event_arr.findIndex(obj => obj.id==id);
    //console.log(index,id);
    dispatch(event_actions.mark_as_done(index));
    set_show_table(false);
  }

  let handle_remove_todo = (id) =>{
    let index = event_arr.findIndex(obj => obj.id==id);
    //console.log(index,id);
    dispatch(event_actions.remove_event(index));
    set_show_table(false);
  }

  let handle_add_todo = () =>{
    //console.log(new Date(Todo_date).toISOString(),todo_description);
    dispatch(event_actions.add_event({
      id:uuidv4(),
      created_at:new Date(Todo_date).toISOString(),
      description:todo_description,
      is_completed:false
    }));
    set_show_table(false);
  }

  
  //day_sorter(day);

  //console.log(sat);

  return (
    <div className="container my-4 ">
      {show_table && (

          <div className ="row">
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
              // function to add a task where needed
              const add_a_task = () => {
                if (j.day_check !== "prev") {
                  return (
                    <td>
                      <button
                        type="button"
                        className="btn btn-warning"
                        data-bs-toggle="modal"
                        data-bs-target="#staticBackdrop"
                      >
                        Add Item
                      </button>

                      <div
                        className="modal fade"
                        id="staticBackdrop"
                        data-bs-backdrop="static"
                        data-bs-keyboard="false"
                        tabindex="-1"
                        aria-labelledby="staticBackdropLabel"
                        aria-hidden="true"
                      >
                        <div className="modal-dialog">
                          <div className="modal-content">
                            <div className="modal-header">
                              <h5
                                className="modal-title"
                                id="staticBackdropLabel"
                              >
                                ADD TASK
                              </h5>
                              <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                              ></button>
                            </div>
                            <div className="modal-body">
                              <label className="form-label">
                                Task Description
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Work To Do"
                                onChange={(event) => set_todo_description(event.target.value)}
                              />
                              <div className="my-3">
                                <label className="mx-3">
                                  {" "}
                                  Please select Todo Date:{" "}
                                </label>
                                <DatePicker
                                  selected={Todo_date}
                                  onChange={(date) => setTodo_date(date)}
                                  minDate={new Date()}
                                  showDisabledMonthNavigation
                                />
                              </div>
                            </div>
                            <div className="modal-footer">
                              <button
                                type="button"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                              >
                                Close
                              </button>
                              <button type="button" data-bs-dismiss="modal" className="btn btn-primary" onClick={() => {handle_add_todo()}}>
                                Add Task
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </td>
                  );
                } 
              };



                return (
                  
                   
                      <div className="col">
                       
                        <div className={day_class_name}> {j.day} </div>
                        <span className={date_class_name}> {j.date}</span>
                        {event_arr.map(k =>{
                          //checking events that are on the same day 
                          if(sameDay(new Date(j.date_ins),new Date(k.created_at))){
                            let arr2 = [];

                            if (k.is_completed) {
                              arr2.push(
                                <div id={k.id}
                                  className="done_todo col-12 col-md-2"
                                  onClick={() => {handle_mark_as_done(k.id)}
                                  }
                                >
                                  <p>{k.description}</p>
                                </div>
                              );
                            } else {
                              arr2.push(
                                <td>
                                  {
                                    <div className="row justify-content-center px-4">
                                      <div className="col-12 col-md-2 ">
                                        <CheckCircle color="green" size="1.4rem" id={k.id} onClick={() => {handle_mark_as_done(k.id)}}>
                                          {" "}
                                        </CheckCircle>
                                      </div>
                                      <div className="col-12 col-md-7">
                                        <p>{k.description}</p>
                                      </div>
                                      <div className="col-12 col-md-3">
                                        <Trash color="red" size="1.4rem" id={k.id} onClick={() => {handle_remove_todo(k.id)}}>
                                          {" "}
                                        </Trash>
                                      </div>
                                    </div>
                                  }
                                </td>
                              );
                            }
                            return (
                              <div className = "row">
                                {arr2}
                              </div>
                            )
                          }
                        })}
                        {add_a_task()}
                      </div>
                      
                );

            })}
            </div>
           
      )}
       
        <div className="row my-4">
        <div className="col d-flex justify-content-end">
          <button
            className="btn btn-primary"
            onClick={() => handle_prev_week()}
          >
            {" "}
            <SkipBackwardCircle
              color="white"
              size="1.4rem"
            ></SkipBackwardCircle>
          </button>
        </div>

        <div className="col  d-flex justify-content-start">
          <button
            className="btn btn-primary"
            onClick={() => handle_next_week()}
          >
            {" "}
            <SkipForwardCircle color="white" size="1.4rem"></SkipForwardCircle>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
