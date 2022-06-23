import { Button } from "@mui/material";
import { useState } from "react";
import CardPosto from "../../components/CardAddPosto";
import CardInfo from "../../components/CardEscala";
import { Row } from "../../components/CardEscala/Card.styles";
import Container from "../../components/Container";
import { Tittle } from "../../components/Container/Container.Styles";
import withAuth from "../../utils/withAuth";

function AddEscalas() {

  const [postos, setPostos] = useState<any>([]);

  function AddPosto(){
    setPostos(postos?.concat(<CardPosto key={postos.length} />));
  }

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
      {postos}
    </Container>
  );
}

export default withAuth(AddEscalas);


