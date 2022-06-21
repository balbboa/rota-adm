import styled from "styled-components";

export const CardEscala = styled.div`
  @media(min-width: 992px) and (max-width: 1400px) {  
    div.card {
      padding: 20px;
      border-radius: 25px;
      border-left: 10px solid #001E3C;

      box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.5);
      -webkit-box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.5);
      -moz-box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.5);
    }
  }

  @media(min-width: 1400px) {  
    div.card {
      padding: 20px;
      border-radius: 25px;
      border-left: 10px solid #001E3C;

      box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.5);
      -webkit-box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.5);
      -moz-box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.5);      
    }
  }

  @media(max-width: 992px) {  
    div.card {
      padding: 20px;
      border-radius: 25px;
      border-left: 10px solid #001E3C;

      box-shadow: 0px 0px 0px 0px rgba(0,0,0,0);
      -webkit-box-shadow: 0px 0px 0px 0px rgba(0,0,0,0);
      -moz-box-shadow: 0px 0px 0px 0px rgba(0,0,0,0);
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

  :last-child{
    margin-bottom: 0px;
  }
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;