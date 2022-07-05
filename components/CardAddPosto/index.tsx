/* eslint-disable @next/next/link-passhref */
import { Button, TextField } from '@mui/material';
import Card from '@mui/material/Card';
import { useEffect, useState } from 'react';
import CardAutoFuncao from '../CardAddAutoFunc';
import CardNaoAutoFuncao from '../CardAddNaoAutoFunc';
import { CardEscala, Column, Row } from '../CardEscala/Card.styles';
import { Form } from '../Form/Form.Styles';

export default function CardPosto() {

    const [funcoes, setFuncoes] = useState<any>([]);

    const curr = new Date();
    curr.setDate(curr.getDate())
    const today = curr.toLocaleDateString('en-CA');
    let date
    try {
        const previewStart = sessionStorage.getItem('saveInitDate-Escalas')
        date = previewStart ? previewStart : today
    }
    catch {
        date = today
    }

    useEffect(() => {
        const cardposto: any | null = document.getElementById("card-posto");

        // Client-side-only code
        window.addEventListener('click', function (e) {
            if (cardposto?.contains(e.target)) {
                // Clicked in box
                cardposto?.classList.add('active');
            } else {
                // Clicked outside the box
                cardposto?.classList.remove('active');
            }
        });
        
        for (let a = 0; a < 100; a++) {
            const cardsfuncoes: any | null = document.getElementById(`posto${a}`)?.getElementsByClassName("teste")

            for (let i = 0; i < cardsfuncoes?.length; i++) {
                cardsfuncoes[i].id = `funcao${Math.floor(Math.random() * 1000)}`;
            }
        }
    })

    function AddFuncaoAuto() {
        setFuncoes(funcoes?.concat(<CardAutoFuncao />));
    }

    function AddFuncaoNaoAuto() {
        setFuncoes(funcoes?.concat(<CardNaoAutoFuncao />));
    }

    return (
        <CardEscala>
            <Card id="card-posto" className='card'>
                <Form>
                    <Column>
                        <Row>
                            <TextField
                                fullWidth
                                name="inicio"
                                label="Início"
                                InputLabelProps={{ shrink: true, required: true }}
                                type="date"
                                defaultValue={date}
                            />
                            <TextField
                                fullWidth
                                name="termino"
                                label="Término"
                                InputLabelProps={{ shrink: true, required: true }}
                                type="date"
                                defaultValue={date}
                            />
                            <TextField
                                fullWidth
                                name="duracao"
                                label="Duração"
                                InputLabelProps={{ shrink: true, required: true }}
                                type="text"
                            />
                            <TextField
                                sx={{ width: '250ch' }}
                                fullWidth
                                name="local"
                                label="Local"
                                InputLabelProps={{ shrink: true, required: true }}
                                type="text"
                            />
                            <TextField
                                fullWidth
                                sx={{ width: '50ch' }}
                                name="qtd-do"
                                label="Qtd. Do"
                                InputLabelProps={{ shrink: true, required: true }}
                                type="text"
                            />
                        </Row>
                        <Row>
                            <TextField
                                fullWidth
                                name="tipo-de-servico"
                                label="Tipo de serviço"
                                InputLabelProps={{ shrink: true, required: true }}
                                type="text"
                            />
                            <TextField
                                fullWidth
                                name="modalidade"
                                label="Modalidade de policiamento"
                                InputLabelProps={{ shrink: true, required: true }}
                                type="text"
                            />
                            <TextField
                                fullWidth
                                name="processo"
                                label="Processo policiamento"
                                InputLabelProps={{ shrink: true, required: true }}
                                type="text"
                            />
                            <TextField
                                fullWidth
                                name="regime"
                                label="Regime de trabalho"
                                InputLabelProps={{ shrink: true, required: true }}
                                type="text"
                            />
                            <TextField
                                sx={{ width: '70ch' }}
                                fullWidth
                                name="efetivo-posto"
                                label="Efetivo posto"
                                InputLabelProps={{ shrink: true, required: true }}
                                type="text"
                            />
                        </Row>
                        <Row>
                            <TextField
                                fullWidth
                                name="obs"
                                label="Observação"
                                InputLabelProps={{ shrink: true, required: false }}
                                type="text"
                            />
                        </Row>
                        <Row>
                            <Button
                                onClick={AddFuncaoAuto}
                                className='addFunc'
                                sx={{ mr: 3 }}
                                variant="outlined"
                            >
                                Adicionar função autoescalável
                            </Button>
                            <Button
                                onClick={AddFuncaoNaoAuto}
                                className='addFunc2'
                                variant="contained"
                            >
                                Adicionar função não autoescalável
                            </Button>
                        </Row>
                        <Column>{funcoes}</Column>
                    </Column>
                </Form>
            </Card>
        </CardEscala>
    );
}
