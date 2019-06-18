import React from "react";
import { Container, Repository, Actions } from "./styles";

import PropTypes from "prop-types";

const CompareList = ({ repositories, deleteCourse, refreshCourse }) => (
  <Container>
    {repositories &&
      repositories.map(repository => (
        <Repository key={repository.id}>
          <header>
            <img
              src={repository.owner.avatar_url}
              alt={repository.owner.login}
            />
            <strong>{repository.name}</strong>
            <small>{repository.owner.login}</small>
          </header>

          <ul>
            <li>
              {repository.stargazers_count} <small>stars</small>
            </li>
            <li>
              {repository.forks_count} <small>forks</small>
            </li>
            <li>
              {repository.open_issues_count} <small>issues</small>
            </li>
            <li>
              {repository.lastCommit} <small>last commit</small>
            </li>
          </ul>

          <Actions>
            <button
              type="button"
              className="btn_refresh"
              onClick={() => refreshCourse(repository)}
            >
              <i className="fa fa-retweet" />
            </button>
            <button
              type="button"
              className="btn_delete"
              onClick={() => deleteCourse(repository.id)}
            >
              <i className="fa fa-trash" />
            </button>
          </Actions>
        </Repository>
      ))}
  </Container>
);

CompareList.propTypes = {
  repositories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      owner: PropTypes.shape({
        avatar_url: PropTypes.string,
        login: PropTypes.string
      })
    })
  ).isRequired,
  stargazers_count: PropTypes.number,
  forks_count: PropTypes.number,
  open_issues_count: PropTypes.number,
  pushed_at: PropTypes.string,
  lastCommit: PropTypes.string
};

export default CompareList;
