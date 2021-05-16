import React from 'react';
import ListProducts from "./components/listProducts";
import Header from "./components/header";
import ListText from "./components/listText";

const url = "192.168.1.88:3010";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fetched: false,
      fetchError: false,
      url: "http://" + url + "/info",
      list: [],
      originalList: [],
      count: 0,
    }
  }
  componentDidMount() {
    fetch(this.state.url)
      .then(res => res.text())
      .then(
        (data) => {
          return data ? JSON.parse(data) : {};
        }
      ).then((data) => {
        let customData = JSON.stringify(data);

        this.setState({
          list: data,
          originalList: customData
        })

        this.setState({
          fetched: true,
          originalList: JSON.parse(customData)
        })
      })
      .catch((error) => {
        this.setState({
          fetched: true,
          fetchError: true
        })
      })

  }

  async updateList(name, action) {
    if (this.state.fetchError != true && this.state.fetched == true) {
      let count = 0;
      let originalList = JSON.stringify(this.state.originalList);
      let updatingList = this.state.list;

      originalList = JSON.parse(originalList);
      if (action === "add") {
        updatingList.rows.find((data) => {
          if (data.productName === name) {
            if (data.productAmount < 10 && data.productAmount >= 0) {
              data.productAmount += 1;
              data.productPriceWithAmount = data.productPrice * data.productAmount;
            }

          }
        })

        originalList.rows.find((data) => {
          if (data.productName === name) {
            if (data.productAmount < 10 && data.productAmount >= 0) {
              data.productAmount += 1;
              data.productPriceWithAmount = data.productPrice * data.productAmount;
            }

          }
        })
        this.setState({
          list: updatingList,
        })
        this.setState({
          originalList: originalList,
        })

      } else if (action === "subtract") {
        updatingList.rows.find((data) => {
          if (data.productName === name) {
            if (data.productAmount <= 10 && data.productAmount > 0) {
              data.productAmount -= 1;
              data.productPriceWithAmount = data.productPrice * data.productAmount;
            }
          }
        })
        originalList.rows.find((data) => {
          if (data.productName === name) {
            if (data.productAmount <= 10 && data.productAmount > 0) {
              data.productAmount -= 1;
              data.productPriceWithAmount = data.productPrice * data.productAmount;
            }
          }
        })
        this.setState({
          list: updatingList,
        })
        this.setState({
          originalList: originalList,
        })
      }

      else if (action === "search") {
        console.log(name.target.value)
        if (name.target.value.length > 0) {
          let search = originalList.rows.filter(data => {
            if (data.productName.toLowerCase().includes(name.target.value.toLowerCase())) {
              return data;
            }
          })
          updatingList.rows = search;
          this.setState({
            list: updatingList,
          })
        }
        else {
          let toSendList = JSON.stringify(originalList)
          this.setState({
            list: JSON.parse(toSendList),
          })
        }
      }
      else if (action === "cleanSearch") {
        let toSendList = JSON.stringify(originalList)
        this.setState({
          list: JSON.parse(toSendList),
        })
      }

      else if (action == "remove") {
        updatingList.rows.find((data) => {
          if (data.productName === name) {
            data.productAmount = 0;
            data.productPriceWithAmount = 0;
          }
        })
        originalList.rows.find((data) => {
          if (data.productName === name) {
            if (data.productAmount <= 10 && data.productAmount > 0) {
              data.productAmount = 0;
              data.productPriceWithAmount = 0;
            }
          }
        })
        this.setState({
          list: updatingList,
        })
        this.setState({
          originalList: originalList,
        })
      }

      for (var i = 0; i < originalList.rows.length; ++i) {
        count = originalList.rows[i].productPriceWithAmount + count;
        this.setState({
          count: count
        })
      }
    }
  }

  render() {
    let updateList = this.updateList.bind(this);
    return (
      <div>
        <Header count={this.state.count} updateList={updateList.bind(this)} />
        <ListProducts updateList={updateList.bind(this)} father={this.state} />
        <ListText father={this.state} updateList={updateList.bind(this)} />
      </div>
    );
  }
}

export default App;
