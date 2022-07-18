import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import CardPosto from "../../components/CardAddPosto";
import CardInfo from "../../components/CardEscala";
import { Row } from "../../components/CardEscala/Card.styles";
import Container from "../../components/Container";
import { Tittle } from "../../components/Container/Container.Styles";
import withAuth from "../../utils/withAuth";

function AddEscalas() {
  const [postos, setPostos] = useState<any>([]);
  const [cont, setCont] = useState<any>(0);

  function AddPosto() {
    setCont(cont + 1)
    setPostos(postos?.concat(<li id={cont} key={cont}><CardPosto /></li>));
  }

  useEffect(() => {
    const cardsPosto: any | null = document.getElementById("postos")?.getElementsByClassName("card")
    for (let i = 0; i < cardsPosto.length; i++) {
      cardsPosto[i].id = `posto${i}`;
    }
  })

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
      <ul id="postos">
        {postos}
      </ul>
    </Container>
  );
}

export default withAuth(AddEscalas);


