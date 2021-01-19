import React, { Component } from "react";
import API from "../utils/API";
import Hero from "../components/Hero";
import Container from "../components/Container";
import SearchForm from "../components/SearchForm";
import SearchResults from "../components/SearchResults";
// import Alert from "../components/Alert";

class Home extends Component {
    state = {
        search: "",
        name: [],
        results: [],
        employees: [{}],
        error: ""
    };

    // When the component mounts, get a list of all available base breeds and update this.state.breeds
    componentDidMount() {
        API.getEmployees()
            .then(res => {
                console.log(res.data.results);
                this.setState({ employees: res.data.results })
            })
            .catch(err => console.log(err));
    }

    handleInputChange = event => {
        this.setState({ search: event.target.value });
    };

    handleFormSubmit = event => {
        event.preventDefault();
        API.getEmployees(this.state.search)
            .then(res => {
                if (res.data.status === "error") {
                    throw new Error(res.data.message);
                }
                this.setState({ results: res.data.message, error: "" });
            })
            .catch(err => this.setState({ error: err.message }));
    };
    render() {
        return (
            <div>
                <Hero backgroundImage="https://cdn.pixabay.com/photo/2016/01/19/17/53/writing-1149962_1280.jpg">
                    <h1>Employee Directory</h1>
                </Hero>
                <Container style={{ minHeight: "80%" }}>
                    <h1 className="text-center">Search By Name!</h1>
                    <SearchForm
                        handleFormSubmit={this.handleFormSubmit}
                        handleInputChange={this.handleInputChange}
                        name={this.state.name}
                    />
                    <SearchResults employees={this.state.employees} />
                </Container>
            </div>
        );
    }
}

export default Home;
