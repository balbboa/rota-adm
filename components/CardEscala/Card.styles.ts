import styled from "styled-components";

export const CardEscala = styled.div`
  @media (min-width: 992px) and (max-width: 1400px) {
    div.card {
      padding: 20px;
      border-radius: 25px;
      background-color: #d6d6d6;
      margin-top: 20px;

      box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.5);
      -webkit-box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.5);
      -moz-box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.5);
    }
  
    div.card-AddPosto {
      padding: 20px;
      border-radius: 25px;
      background-color: #d6d6d6;
      margin-top: 20px;

      box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.5);
      -webkit-box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.5);
      -moz-box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.5);
    }
    
    div.active {
      border-left: 10px solid #001e3c;
      background-color: #ffffff;
    }
  }

  @media (min-width: 1400px) {
    div.card {
      padding: 20px;
      border-radius: 25px;
      border-left: 10px solid #001e3c;

      box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.5);
      -webkit-box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.5);
      -moz-box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.5);
    }
    div.card-AddPosto {
      padding: 20px;
      border-radius: 25px;
      border-left: 10px solid #001e3c;

      box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.5);
      -webkit-box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.5);
      -moz-box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.5);
    }
    div.active {
      border-left: 0px !important;
    }
  }

  @media (max-width: 992px) {
    div.card {
      padding: 20px;
      border-radius: 25px;
      border-left: 10px solid #001e3c;

      box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.5);
      -webkit-box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.5);
      -moz-box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.5);
    }
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 20px;
  align-items: center;
  justify-content: center;

  div {
    margin-right: 10px;
  }

  :last-child {
    margin-bottom: 0px;
  }

  button.addPosto {
    margin-top: 20px;
    background-color: #001e3c;

    :hover {
      background-color: #1976d2;
    }
  }
  button.addFunc {
    background-color: transparent;

    :hover {
      background-color: #1976d2;
      color: white;
    } 
  }
  button.addFunc2 {
    background-color: #001e3c;

    :hover {
      background-color: #1976d2;
      color: white;
    }
  }
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
