import React, { Component } from "react";

import logo from "../../assets/logo.png";

import { Container, Form } from "./styles";

import CompareList from "../../components/CompareList";

import api from "../../services/api";

import moment from "moment";

export default class Main extends Component {
  state = {
    repositoryError: "",
    repositoryInput: "",
    repositories: [],
    loading: false
  };

  handleAddRepository = async e => {
    e.preventDefault();

    this.setState({ loading: true });

    try {
      const { data: repository } = await api.get(
        `/repos/${this.state.repositoryInput}`
      );

      this.state.repositories.map(item => {
        if (item.id === repository.id) {
          throw "alreadyExist";
        }
      });

      repository.lastCommit = moment(repository.pushed_at).fromNow();

      this.setState({
        repositoryInput: "",
        repositories: [...this.state.repositories, repository],
        repositoryError: false
      });
    } catch (err) {
      console.log(err);
      this.setState({ repositoryError: true });
    } finally {
      this.setState({ loading: false });
      this.saveToStorage();
    }
  };

  deleteCourse = async id => {
    console.log(id);
    await this.setState({
      repositories: this.state.repositories.filter(el => el.id !== id)
    });
    this.saveToStorage();
  };

  refreshCourse = async course => {
    const { data: repository } = await api.get(`/repos/${course.full_name}`);

    this.setState({
      repositories: this.state.repositories.map(item => {
        if (item.id === repository.id) {
          repository.lastCommit = moment(repository.pushed_at).fromNow();
          return repository;
        } else {
          return item;
        }
      })
    });
  };

  saveToStorage = () => {
    localStorage.setItem(
      "course_list",
      JSON.stringify(this.state.repositories)
    );
  };

  componentDidMount() {
    this.setState({
      repositories: JSON.parse(localStorage.getItem("course_list"))
    });
  }

  render() {
    return (
      <Container>
        <img src={logo} alt="GitHub Compare" />

        <Form
          onSubmit={this.handleAddRepository}
          withError={this.state.repositoryError}
        >
          <input
            type="text"
            placeholder="usuario/repositorio"
            value={this.state.repositoryInput}
            onChange={e => this.setState({ repositoryInput: e.target.value })}
          />
          <button type="submit">
            {this.state.loading ? (
              <i className="fa fa-spinner fa-pulse" />
            ) : (
              "OK"
            )}
          </button>
        </Form>

        <CompareList
          repositories={this.state.repositories}
          deleteCourse={this.deleteCourse}
          refreshCourse={this.refreshCourse}
        />
      </Container>
    );
  }
}
