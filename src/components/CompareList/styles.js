import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: center;

  margin-top: 50px;
`;

export const Repository = styled.div`
  width: 250px;
  background: #fff;
  border-radius: 3px;

  display: flex;
  flex-direction: column;
  margin: 0 10px;

  header {
    padding: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;

    img {
      width: 64px;
    }

    strong {
      font-size: 24px;
      margin-top: 10px;
    }

    small {
      font-size: 14px;
      color: #666;
    }
  }

  ul {
    list-style: none;

    li {
      font-weight: bold;
      padding: 12px 20px;

      small {
        font-weight: normal;
        font-size: 12px;
        color: #999;
        font-style: italic;
      }
      &:nth-child(2n - 1) {
        background: #f5f5f5;
      }
    }
  }
`;

export const Actions = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 5px;

  button {
    background: none;
    border: 0;
    padding: 5px;
    height: 40px;
    width: 40px;
    color: #fff;
    border-radius: 50%;
    font-size: 18px;
    transition: background 0.4s;
    cursor: pointer;

    &.btn_refresh {
      background: #08afec;

      &:hover {
        background: #074a84;
      }
    }
    &.btn_delete {
      background: #ea5151;

      &:hover {
        background: #9e0000;
      }
    }
  }
`;
