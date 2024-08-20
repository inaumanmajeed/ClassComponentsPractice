import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import CardComponent from "./components/Card";
import axios from "axios";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: true,
      error: null,
    };
  }

  componentDidMount() {
    this.fetchData();
  }


  componentWillUnmount() {
    console.log("Component will unmount");
  }

  fetchData = async () => {
    try {
      const response = await axios.get(
        "https://newsapi.org/v2/everything?q=apple&from=2024-08-19&to=2024-08-19&sortBy=popularity&apiKey=7fbaeb26adb040739b2016efaeede97c"
      );
      // Accessing the articles array from the response data
      this.setState({ data: response.data.articles, loading: false });
    } catch (error) {
      this.setState({ error, loading: false });
    }
  };

  render() {
    const { data, loading, error } = this.state;
    console.log("🚀 ~ App ~ render ~ data:", data);

    if (loading) {
      return <div>Loading...</div>;
    }

    if (error) {
      return <div>Error fetching data: {error.message}</div>;
    }

    if (!Array.isArray(data)) {
      return <div>Unexpected data format</div>;
    }

    return (
      <div className="container-fluid p-4 bg-secondary ">
        <div className="text-center py-3">
          <h1 className="text-white text-capitalize">
            News Articles From apple
          </h1>
        </div>
        <div className="row">
          {data.map((item) => (
            <div
              className="col-md-4 col-sm-6 col-xs-12 col-lg-3 p-2"
              key={item.url} // Using URL as a unique key
            >
              <CardComponent data={item} />
            </div>
          ))}
        </div>
      </div>
    );
  }
}
