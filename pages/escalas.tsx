import { Alert, Button, Chip, TextField } from "@mui/material";
import { GridColDef } from '@mui/x-data-grid';
import axios from "axios";
import { useEffect, useState } from "react";
import Container from "../components/Container";
import { Tittle } from "../components/Container/Container.Styles";
import { Form } from "../components/Form/Form.Styles";
import DataTable from "../components/Table";
import withAuth from "../utils/withAuth";

function Escalas() {

  const columns: GridColDef[] = [
    { field: 'titulo_escala', flex: 1, headerName: 'Título', type: 'string', minWidth: 230 },
    { field: 'prefixo_posto', flex: 1, headerName: 'Posto', minWidth: 150, type: 'string' },
    { field: 'inicio', flex: 1, headerName: 'Início', type: 'date', minWidth: 135 },
    { field: 'termino', flex: 1, headerName: 'Término', type: 'date', minWidth: 135 },
    {
      field: 'situacao',
      flex: 1,
      headerName: 'Situação',
      renderCell: (params) => (
        <Chip label={params.value.name} variant="outlined" color={params.value.color} />
      ),
      minWidth: 105
    }
  ];

  type InputEscala = {
    inicio: string;
    termino: string;
  }

  const [rows, setRows] = useState<any>([])
  const [erro, setErro] = useState<any>()
  const [state, setState] = useState<boolean>()

  useEffect(() => {
    const previewRows = sessionStorage.getItem('escala')

    if (previewRows) {
      const parse = JSON.parse(previewRows)
      setRows(parse)
    }

  }, [])

  async function getEscalas(date: InputEscala) {
    await axios.post(`https://treinamento.rota.pm.rn.gov.br/api/minhas_escalas`, date,
      {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('auth_token')
        }
      }).then(res => {

        const c = res.data.data

        const rows = c
          .filter(item => item.situacao !== 'Cancelada')
          .map(item => {
            let color = 'info'
            if (item.situacao === 'Fiscalizada') {
              color = 'success'
            }
            if (item.situacao === 'Publicada') {
              color = 'primary'
            }
            if (item.situacao === 'Digitando') {
              color = 'warning'
            }

            return ({
              id: Math.random(),
              titulo_escala: item.titulo_escala,
              prefixo_posto: item.prefixo_posto,
              inicio: item.inicio,
              termino: item.termino,
              local: item.local,
              observacao: item.observacao,
              situacao: { name: item.situacao, color },

            })
          })

        sessionStorage.setItem('escala', JSON.stringify(rows))

        setRows(rows)
        setState(true)

      })
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const date = {
      inicio: `${data.get('inicio')}`,
      termino: `${data.get('termino')}`
    }

    sessionStorage.setItem('saveInitDate-Escalas', date.inicio)
    sessionStorage.setItem('saveFinalDate-Escalas', date.termino)

    await getEscalas(date)
  }

  const curr = new Date();
  curr.setDate(curr.getDate())
  const today = curr.toLocaleDateString('en-CA');
  let startDate
  let finalDate
  try {
    const previewStart = sessionStorage.getItem('saveInitDate-Escalas')
    const previewFinal = sessionStorage.getItem('saveFinalDate-Escalas')

    startDate = previewStart ? previewStart : today
    finalDate = previewFinal ? previewFinal : today
  }
  catch {
    startDate = today
    finalDate = today
  }

  return (
    <Container title="Escalas">
      <Tittle>Minhas Escalas</Tittle>
      <Form onSubmit={handleSubmit}>
        <TextField
          name="inicio"
          label="Início"
          InputLabelProps={{ shrink: true, required: true }}
          type="date"
          defaultValue={startDate}
        />
        <TextField
          name="termino"
          label="Término"
          InputLabelProps={{ shrink: true, required: true }}
          type="date"
          defaultValue={finalDate}
        />
        <Button
          type="submit"
          variant="contained"
        >
          Consultar
        </Button>
      </Form>
      {state == false ? (
        <Alert sx={{ my: 2 }} variant="filled" severity="error">{erro?.msg}{erro?.Mensagem}</Alert>
      ) : (null)
      }
      <DataTable columns={columns} rows={rows} />

    </Container>
  );
}

export default withAuth(Escalas);


