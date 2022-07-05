import { Button } from "@mui/material";
import dynamic from 'next/dynamic';
import { useEffect, useState } from "react";
import CardPosto from "../../components/CardAddPosto";
import CardInfo from "../../components/CardEscala";
import { Row } from "../../components/CardEscala/Card.styles";
import Container from "../../components/Container";
import { Tittle } from "../../components/Container/Container.Styles";
import withAuth from "../../utils/withAuth";

const DynamicComponentWithNoSSR = dynamic(() =>
  import('../../components/CardAddPosto'),
  {
    ssr: false
  })

function AddEscalas() {

  const [postos, setPostos] = useState<any>([]);

  function AddPosto() {
    setPostos(postos?.concat(<CardPosto />));
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
      <div id="postos">{postos}</div>
    </Container>
  );
}

export default withAuth(AddEscalas);


