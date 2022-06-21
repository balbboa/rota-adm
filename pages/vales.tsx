import { Alert, Button, Chip, TextField, Tooltip } from "@mui/material";
import { GridColDef } from '@mui/x-data-grid';
import axios from "axios";
import { useEffect, useState } from "react";
import Container from "../components/Container";
import { Tittle } from "../components/Container/Container.Styles";
import { Form } from "../components/Form/Form.Styles";
import DataTable from "../components/Table";
import { CustomSpan } from "../components/Table/Table.Styles";
import withAuth from "../utils/withAuth";

const columns: GridColDef[] = [
  {
    field: 'titulo_escala', flex: 1,
    renderCell: (params: any) => (
      <Tooltip title={params.value}>
        <CustomSpan>{params.value}</CustomSpan>
      </Tooltip>
    ),
    headerName: 'Título', type: 'string', minWidth: 230
  },
  {
    field: 'prefixo_posto', minWidth: 150,
    renderCell: (params: any) => (
      <Tooltip title={params.value}>
        <CustomSpan>{params.value}</CustomSpan>
      </Tooltip>
    ),
    headerName: 'Posto', type: 'string', flex: 1
  },
  { field: 'inicio_posto', headerName: 'Início', type: 'date', minWidth: 135, flex: 1 },
  { field: 'termino_posto', headerName: 'Término', type: 'date', minWidth: 135, flex: 1 },
  { field: 'valor_vale_refeicao', headerName: 'Valor', type: 'string', minWidth: 80, flex: 1 },
  {
    field: 'situacao_vale',
    headerName: 'Situação',
    renderCell: (params) => (
      <Chip label={params.value.name} variant="outlined" color={params.value.color} />
    ),
    minWidth: 105,
    flex: 1
  },
];

type InputVale = {
  inicio: string;
  termino: string;
}

function Vales() {
  const [rows, setRows] = useState([])
  const [erro, setErro] = useState<any>()
  const [state, setState] = useState<boolean>()



  useEffect(() => {
    const previewRows = sessionStorage.getItem('vales')
    if (previewRows) {
      const parse = JSON.parse(previewRows)
      setRows(parse)
    }

  }, [])

  async function getVales(date: InputVale) {
    await axios.post(`https://treinamento.rota.pm.rn.gov.br/api/meus_vales`, date,
      {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('auth_token')
        }
      }).then(res => {

        const k = res.data.data

        const rows = k.map(item => {
          let color = 'info'
          if (item.situacao_vale === 'Gerado') {
            color = 'primary'
          }
          if (item.situacao_vale === 'Glosado') {
            color = 'error'
          }
          if (item.situacao_vale === 'Incluído na Remessa') {
            color = 'warning'
          }
          if (item.situacao_vale === 'Incluído no Pedido') {
            color = 'warning'
          }
          if (item.situacao_vale === 'Pago pelo banco') {
            color = 'success'
          }
          return ({
            id: Math.random(),
            titulo_escala: item.titulo_escala,
            prefixo_posto: item.prefixo_posto,
            inicio_posto: item.inicio_posto,
            termino_posto: item.termino_posto,
            valor_vale_refeicao: item.valor_vale_refeicao,
            observacao: item.observacao,
            situacao_vale: { name: item.situacao_vale, color },
          })
        })

        setRows(rows)
        setState(true)
        sessionStorage.setItem('vales', JSON.stringify(rows))


      }).catch(err => {
        console.log(err.response.data)
        setErro(err.response.data)
        setState(false)
      })
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const date = {
      inicio: `${data.get('inicio')}`,
      termino: `${data.get('termino')}`
    }
    sessionStorage.setItem('saveInitDate-Vales', date.inicio)
    sessionStorage.setItem('saveFinalDate-Vales', date.termino)
    await getVales(date)
  }

  const curr = new Date();
  curr.setDate(curr.getDate())
  const today = curr.toLocaleDateString('en-CA');
  let startDate
  let finalDate
  try {
    const previewStart = sessionStorage.getItem('saveInitDate-Vales')
    const previewFinal = sessionStorage.getItem('saveFinalDate-Vales')

    startDate = previewStart ? previewStart : today
    finalDate = previewFinal ? previewFinal : today
  }
  catch {
    startDate = today
    finalDate = today
  }

  return (
    <Container title="Meus Vales">
      <Tittle>Meus Vales</Tittle>
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

export default withAuth(Vales);


