/* eslint-disable @next/next/link-passhref */
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Fab,
  TextField
} from "@mui/material";
import {
  DataGrid,
  GridCellParams,
  GridColDef,
  ptBR
} from '@mui/x-data-grid';
import { Check } from '@styled-icons/material';
import { Dangerous } from '@styled-icons/material/Dangerous';
import axios from "axios";
import Link from "next/link";
import * as React from 'react';
import { useState } from "react";
import { AgreeSpan, TextModal } from "./Table.Styles";

interface IParams {
  columns: GridColDef[],
  rows: {}[]
}

interface Escala {
  titulo_escala: string,
  local: string,
  prefixo_posto: string,
  inicio: string,
  termino: string,
  situacao: { name: string },
  observacao: string
}

interface Vale {
  titulo_escala: string,
  prefixo_posto: string,
  inicio_posto: string,
  termino_posto: string,
  situacao_vale: { name: string },
  observacao: string,
  valor_vale_refeicao: string
}

interface Diaria {
  titulo_escala: string,
  data_diaria: string,
  observacao_diaria: string,
  situacao_diaria: { name: string },
  valor_diaria: string
}

interface Marcacao {
  ordem: number,
  unidade: string,
  inicio: string,
  termino: string,
  local: string,
  funcao: string
}

export default function DataTable({ columns, rows }: IParams) {
  const [open, setOpen] = useState(false);
  const [escala, setEscala] = useState<Escala>()
  const [vale, setVale] = useState<Vale>()
  const [diaria, setDiaria] = useState<Diaria>()
  const [marcacao, setMarcacao] = useState<Marcacao>()
  const [btnDisabled, setBtnDisabled] = React.useState(true)
  const [active, setActive] = useState(false);
  const [modalOk, setModalOk] = useState(false);
  const [state, setState] = useState<boolean>(false)

  const handleClose = () => {
    setOpen(false);
  };

  const handleCellOpen = (params: GridCellParams) => {
    setOpen(true)
    const response = params.row
    setEscala(response)
    setVale(response)
    setDiaria(response)
    setMarcacao(response)
  }

  const handleBOpen = () => {
    setActive(true);
  };
  const handleBClose = () => {
    setActive(false);
    setBtnDisabled(true)
  };

  let string1 = 'eu concordo'

  async function marcarDO() {
    await axios.post(`https://treinamento.rota.pm.rn.gov.br/api/minhas_escalas`,
      {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('auth_token')
        }
      }).then(res => {
        setState(true)
      })
  }

  const handleMarcar = async (e) => {
    setModalOk(true)
    await marcarDO()
  }

  const handleCloseMarcar = async (e) => {
    setModalOk(false)
  }

  return (
    <div style={{ width: '100%' }}>
      <DataGrid
        disableSelectionOnClick={true}
        rows={rows}
        columns={columns}
        autoHeight
        pageSize={10}
        getRowId={(row) => row.id}
        rowsPerPageOptions={[10]}
        localeText={ptBR.components.MuiDataGrid.defaultProps.localeText}
        onCellClick={handleCellOpen}
      />
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{'Detalhes'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {escala?.situacao ? (
              <>
                <TextModal><span>T??tulo:</span> {escala?.titulo_escala}</TextModal>
                <TextModal><span>Posto:</span> {escala?.prefixo_posto}</TextModal>
                <TextModal><span>Local:</span> {escala?.local}</TextModal>
                <TextModal><span>In??cio:</span> {escala?.inicio}</TextModal>
                <TextModal><span>T??rmino:</span> {escala?.termino}</TextModal>
                <TextModal><span>Situa????o:</span> {escala?.situacao.name}</TextModal>
                <TextModal><span>Observa????o:</span> {escala?.observacao}</TextModal>
              </>
            ) : ('')}
            {vale?.situacao_vale ? (
              <>
                <TextModal><span>T??tulo:</span> {vale?.titulo_escala}</TextModal>
                <TextModal><span>Posto:</span> {vale?.prefixo_posto}</TextModal>
                <TextModal><span>In??cio:</span> {vale?.inicio_posto}</TextModal>
                <TextModal><span>T??rmino:</span> {vale?.termino_posto}</TextModal>
                <TextModal><span>Valor:</span> {vale?.valor_vale_refeicao}</TextModal>
                <TextModal><span>Situa????o:</span> {vale?.situacao_vale.name}</TextModal>
                <TextModal><span>Observa????o:</span> {vale?.observacao}</TextModal>
              </>
            ) : ('')}
            {diaria?.situacao_diaria ? (
              <>
                <TextModal><span>T??tulo:</span> {diaria?.titulo_escala}</TextModal>
                <TextModal><span>Data:</span> {diaria?.data_diaria}</TextModal>
                <TextModal><span>Valor:</span> {diaria?.valor_diaria}</TextModal>
                <TextModal><span>Situa????o:</span> {diaria?.situacao_diaria.name}</TextModal>
                <TextModal><span>Observa????o:</span> {diaria?.observacao_diaria}</TextModal>
              </>
            ) : ('')}
            {marcacao?.funcao ? (
              <>
                <TextModal><span>Ordem:</span> {marcacao?.ordem}</TextModal>
                <TextModal><span>Unidade:</span> {marcacao?.unidade}</TextModal>
                <TextModal><span>In??cio:</span> {marcacao?.inicio}</TextModal>
                <TextModal><span>Termino:</span> {marcacao?.termino}</TextModal>
                <TextModal><span>Local:</span> {marcacao?.local}</TextModal>
                <TextModal><span>Fun????o:</span> {marcacao?.funcao}</TextModal>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleMarcar}
                >
                  Marcar
                </Button>
              </>
            ) : ('')}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleBOpen} autoFocus>
            Voltar
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={active}
        onClose={handleBClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Requisitos Obrigat??rios para Marcar esta Di??ria"}
        </DialogTitle>
        <DialogContent>
          <h4>Termo de Condi????es e Responsabilidades</h4>
          <DialogContentText id="alert-dialog-description">
            <ul>
              <li>A di??ria operacional ?? de car??ter volunt??rio, contudo, ap??s confirmar sua voluntariedade para o servi??o, o agente ficar?? na responsabilidade para o cumprimento, podendo este, na sua aus??ncia, trazer preju??zo ao servi??o.</li>
              <li>O volunt??rio dever?? apresentar-se ao servi??o no local e hor??rio informado, com o Uniforme e equipamentos adequados.</li>
              <li>?? de responsabilidade do volunt??rio verificar no sistema RotaWeb (menu Minhas Escalas) se n??o h?? nenhum choque de hor??rio entre os servi??os, para o qual foi escalado, fiscalizado ou volunt??rio, e informar, o mais breve poss??vel, altera????es que o mesmo identificar ?? administra????o da sua Unidade.</li>
              <li>O volunt??rio ao marcar uma Di??ria Opercional no sistema RotaWeb declara estar ciente dos requisitos exigidos para o servi??o e que atende os mesmos sem ressalvas.</li>
              <li>O volunt??rio que deixar de participar, a tempo, via SEI, a impossibilidade de comparecer ao servi??o, faltar ou chegar atrasado, poder?? sobre san????es previstas em lei.</li>
              <li>Digite <AgreeSpan>{string1}</AgreeSpan> para prosseguir</li>
            </ul>
          </DialogContentText>
          <TextField
            fullWidth
            name="termo"
            label="Assinatura"
            type="text"
            onChange={(e) => {
              if (e.target.value == string1) { setBtnDisabled(false) }
              else { setBtnDisabled(true) }
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button disabled={btnDisabled} variant="contained" onClick={handleMarcar}>Confirmar</Button>
          <Button onClick={handleBClose} autoFocus>
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={modalOk}
        onClose={handleCloseMarcar}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{
          '& .MuiDialog-paper': {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
          },
        }}
      >
        {state == false ? (
          <>
            <DialogTitle id="alert-dialog-title">
              {"Di??ria marcada com sucesso!"}
            </DialogTitle>
            <DialogContent>
              <Fab aria-label="save">
                <Check color="green" />
              </Fab>
              {/* <Alert sx={{ my: 2 }} variant="filled" severity="error">{erro?.msg}{erro?.Mensagem}</Alert> */}
            </DialogContent>
          </>
        ) : (
          <>
            <DialogTitle id="alert-dialog-title">
              {"Ocorreu algum problema!"}
            </DialogTitle>
            <DialogContent>
              <Dangerous color="red" />
              {/* <Alert sx={{ my: 2 }} variant="filled" severity="error">{erro?.msg}{erro?.Mensagem}</Alert> */}
            </DialogContent>
          </>
        )}
        <DialogActions>
          <Link href='/dashboard'>
            <Button autoFocus>
              Voltar
            </Button>
          </Link>
        </DialogActions>
      </Dialog>
    </div>
  );
}
