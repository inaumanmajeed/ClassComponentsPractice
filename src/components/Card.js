import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

export default class CardComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: props.data.title,
      description: props.data.description,
      trimmedTitle: "",
      trimmedDescription: "",
    };
  }

  componentDidMount() {
    this.setState({
      trimmedTitle: this.state.title,
      trimmedDescription: this.state.description,
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.data !== this.props.data) {
      this.setState({
        title: this.props.data.title,
        description: this.props.data.description,
        trimmedTitle: this.props.data.title,
        trimmedDescription: this.props.data.description,
      });

      setTimeout(() => {
        this.trimData(this.props.data);
      }, 2000);
    }
  }

  trimData(data) {
    const trimmedTitle =
      data.title.length > 45 ? `${data.title.substring(0, 45)}...` : data.title;
    const trimmedDescription =
      data.description.length > 80
        ? `${data.description.substring(0, 80)}...`
        : data.description;

    this.setState({ trimmedTitle, trimmedDescription });
  }

  render() {
    const { data } = this.props;
    const { trimmedTitle, trimmedDescription } = this.state;
    const defaultImage = "https://via.placeholder.com/150"; // URL of the dummy image

    return (
      <Card style={{ width: "18rem" }}>
        <Card.Img
          variant="top"
          src={data.urlToImage || defaultImage}
          alt={data.title}
          style={{ height: "150px", objectFit: "cover" }}
        />
        <Card.Body>
          <Card.Title>{trimmedTitle}</Card.Title>
          <Card.Text>{trimmedDescription}</Card.Text>
          <Button
            className="btn btn-sm"
            variant="primary"
            href={data.url}
            target="_blank"
          >
            Read more
          </Button>
        </Card.Body>
      </Card>
    );
  }
}
