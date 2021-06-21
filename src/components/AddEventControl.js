import React, { Component } from "react";
import AddEventForm1 from "./AddEventForm1";
import AddEventForm2 from "./AddEventForm2";
import AddEventForm3 from "./AddEventForm3";
import EventsView from "./EventsView";
export class AddEventControl extends Component {
  state = {
    step: 3,
    events: [],
    eventName: "",
    startDate: "",
    startTime: "",
    endDate: "",
    endTime: "",
    location: "",
    description: "",
    ageRestriction: "",
    minCost: 0,
    maxCost: 0,
    link: "",
    noEndDate: true,
    image: "https://brewlogix.com/wp-content/uploads/2021/03/X_Logo_Color.png",
    categories: [],
    eventId: 0,
  };

  nextStep = () => {
    const { step } = this.state;
    step === 2 ? this.setState({ step: 3 }) : this.setState({ step: step + 1 });
    console.log(step);
  };

  prevStep = () => {
    const { step } = this.state;
    this.setState({ step: step - 1 });
    step === -1
      ? this.setState({ step: 3 })
      : this.setState({ step: step - 1 });
    console.log(step);
  };

  addEvent = () => {
    this.setState({ step: 0 });
  };

  handleChange = (input) => (e) => {
    this.setState({ [input]: e.target.value });
  };

  addEndDate = () => {
    this.setState({ noEndDate: !this.state.noEndDate });
  };

  saveEvent = (item) => {
    let newEvents = this.state.events;

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    };
    fetch("http://localhost:3000/events", requestOptions);
    newEvents.push(item);

    this.setState({
      events: newEvents,
      step: 3,
      eventName: "",
      startDate: "",
      startTime: "",
      endDate: "",
      endTime: "",
      location: "",
      description: "",
      ageRestriction: "",
      minCost: 0,
      maxCost: 0,
      link: "",
      noEndDate: true,
    });
    //this.setState({ events: [...this.state.events, item] });
    console.log(this.state.step);
  };

  saveImage = (e) => {
    this.setState({
      image: URL.createObjectURL(e.target.files[0]),
    });
  };

  getEventInfo = () => {
    this.setState({ step: 4 });
  };

  render() {
    const { step } = this.state;
    const {
      eventName,
      startDate,
      startTime,
      endDate,
      endTime,
      location,
      description,
      ageRestriction,
      minCost,
      maxCost,
      categories,
      link,
      events,
      noEndDate,
      image,
    } = this.state;
    const values = {
      eventName,
      startDate,
      startTime,
      endDate,
      endTime,
      location,
      description,
      ageRestriction,
      minCost,
      maxCost,
      categories,
      link,
      events,
      noEndDate,
      image,
    };
    console.log(step);
    switch (step) {
      case 0:
        return (
          <div className="add-form">
            <AddEventForm1
              nextStep={this.nextStep}
              prevStep={this.prevStep}
              handleChange={this.handleChange}
              addEndDate={this.addEndDate}
              values={values}
            />
          </div>
        );
      case 1:
        return (
          <div className="add-form">
            <AddEventForm2
              nextStep={this.nextStep}
              prevStep={this.prevStep}
              handleChange={this.handleChange}
              values={values}
            />
          </div>
        );
      case 2:
        return (
          <div className="add-form">
            <AddEventForm3
              nextStep={this.nextStep}
              prevStep={this.prevStep}
              handleChange={this.handleChange}
              values={values}
              saveEvent={this.saveEvent}
              saveImage={this.saveImage}
            />
          </div>
        );
      default:
        return (
          <div>
            <EventsView addEvent={this.addEvent} values={values} />
          </div>
        );
    }
  }
}

export default AddEventControl;