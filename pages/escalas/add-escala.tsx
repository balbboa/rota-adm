import AddCards from "../../components/CardEscala";
import Container from "../../components/Container";
import { Tittle } from "../../components/Container/Container.Styles";
import withAuth from "../../utils/withAuth";

function AddEscalas() {

  return (
    <Container title="Adicionar Escala">
      <Tittle>Adicionar Escala</Tittle>
      <AddCards />
    </Container>
  );
}

export default withAuth(AddEscalas);


