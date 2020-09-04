import React, { Component } from "react";
import axios from "axios";
import "./RegStyleSheet.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap";

class PostList extends Component {
  state = {
    data: [],
  };

  componentDidMount() {
    axios
      .get("./JsonTest_Sheet.json")
      .then((res) => {
        const response = res.data;

        const map = new Map();
        for (let i = 0; i < response.length; i++) {
          let value = {
            Mobile: response[i].mobile,
            Id: response[i].earning_id,
            Earning: response[i].earning,
          };

          map.set(response[i].earning_id, value);
        }

        this.setState({
          data: map,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  onAccept = () => {
    const inputChecked = document.querySelectorAll(
      "input[name='list']:checked"
    );

    const favorite = [];
    const { data } = this.state;

    inputChecked.forEach((elem, i) => {
      const id = parseInt(elem.id);
      if (data.has(id)) {
        const value = data.get(id);
        value["action"] = "Approved!";
        favorite.push(value);
      }
    });

    console.log("Accepted Entries", favorite);
  };

  onReject = () => {
    const inputChecked = [
      ...document.querySelectorAll("input[name='list']:checked"),
    ];

    const { data } = this.state;

    if (inputChecked.length > 1) {
      alert("You can reject only one row at a time");
    } else {
      const [entry] = inputChecked;
      const id = parseInt(entry.id);
      if (data.has(id)) {
        const value = data.get(id);
        value["remark"] = "Wrong Earning";
        value["action"] = "Reject!";
        console.log("Rejected Entries", value);
      } else {
        console.log("No Such Entry found!");
      }
    }
  };

  onRefresh = () => {};

  render() {
    const { data } = this.state;

    const items = [];

    for (let [key, value] of data) {
      items.push(
        <React.Fragment key={key}>
          <div className="grid-item">
            <input type="checkbox" name="list" id={key} />
          </div>
          <div className="grid-item">{value.Id}</div>
          <div className="grid-item">{value.Mobile}</div>
          <div className="grid-item">{value.Earning}</div>
        </React.Fragment>
      );
    }

    return (
      <div>
        <form>
          <h1>
            <center> List View </center>
          </h1>
          <div id="grid" className="grid-container">
            <div id="select" className="grid-item">
              Select
            </div>
            <div id="mobile" className="grid-item">
              Id
            </div>
            <div id="id" className="grid-item">
              Mobile
            </div>
            <div id="earning" className="grid-item">
              Earning
            </div>
            {items}
          </div>
          <p className="color">
            <em>
              Select Check box and click on button to see outcomes on console
            </em>
          </p>
          <div className="col-md-20 text-center">
            <button
              type="button"
              id="singlebutton"
              name="singlebutton"
              className="btn btn-success"
              onClick={this.onAccept}
            >
              Accept
            </button>
            <button
              type="button"
              id="singlebutton"
              name="singlebutton"
              className="btn btn-danger"
              onClick={this.onReject}
            >
              Reject
            </button>
            <button
              id="singlebutton"
              name="singlebutton"
              className="btn btn-primary"
              onClick={(event) => {
                this.onRefresh(event);
              }}
            >
              Refresh
            </button>
          </div>
        </form>
      </div>
    );
  }
}
export default PostList;
