/* eslint-disable react/jsx-key */
import { Button } from "@mui/material";
import { useState } from "react";
import CardPosto from "../../components/CardAddPosto";
import CardInfo from "../../components/CardEscala";
import { Row } from "../../components/CardEscala/Card.styles";
import Container from "../../components/Container";
import { Tittle } from "../../components/Container/Container.Styles";
import withAuth from "../../utils/withAuth";

function AddEscalas() {
  const [cont, setCont] = useState<any>(0);

  function AddPosto() {
    setCont(cont + 1)
  }

  const listItems = [...Array(cont)].map((_, i) => <CardPosto key={i} />)
  
  return (
    <Container title="Adicionar Escala">
      <Tittle>Adicionar Escala</Tittle>
      <CardInfo />
      <Row>
        <Button className="addPosto"
          variant="contained"
          onClick={AddPosto}
        >
          Adicionar Posto
        </Button>
      </Row>
      {listItems}
    </Container>
  );
}

export default withAuth(AddEscalas);


