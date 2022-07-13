/* eslint-disable @next/next/link-passhref */
import { Button, TextField } from '@mui/material';
import Card from '@mui/material/Card';
import { KeyboardArrowDown } from "@styled-icons/material/KeyboardArrowDown";
import { KeyboardArrowUp } from "@styled-icons/material/KeyboardArrowUp";
import { useEffect, useState } from 'react';
import CardAutoFuncao from '../CardAddAutoFunc';
import CardNaoAutoFuncao from '../CardAddNaoAutoFunc';
import { CardEscala, Column, Row } from '../CardEscala/Card.styles';
import { Form } from '../Form/Form.Styles';

export default function CardPosto() {

    const [funcoes, setFuncoes] = useState<any>([]);
    const [cont, setCont] = useState<any>(0);

    // ------------------------------HORA----------------------------------- //
    const curr = new Date();
    curr.setDate(curr.getDate())
    const today = curr.toLocaleDateString('en-CA');
    let date: unknown
    try {
        const previewStart = sessionStorage.getItem('saveInitDate-Escalas')
        date = previewStart ? previewStart : today
    }
    catch {
        date = today
    }
    // ------------------------------HORA----------------------------------- //

    useEffect(() => {
        const cardposto: any | null = document.getElementById("card-posto");
        window.addEventListener('click', function (e) {
            if (cardposto?.contains(e.target)) {
                cardposto?.classList.add('active');
            } else {
                cardposto?.classList.remove('active');
            }
        });
        for (let a = 0; a < 100; a++) {
            const cardsfuncoes: any | null = document.getElementById(`posto${a}`)?.getElementsByClassName("funcoes")

            for (let i = 0; i < cardsfuncoes?.length; i++) {
                cardsfuncoes[i].id = `funcao${Math.floor(Math.random() * 1000)}`;
            }
        }
    })

    function AddFuncaoAuto() {
        setCont(cont + 1)
        setFuncoes(funcoes?.concat(<li key={cont}><CardAutoFuncao /></li>));
    }

    function AddFuncaoNaoAuto() {
        setCont(cont + 1)
        setFuncoes(funcoes?.concat(<li key={cont}><CardNaoAutoFuncao /></li>));
    }

    function onClickMoveUPorDOWN() {
        const btn_moveDOWN: any | null = Array.from(document.getElementsByClassName('ClickDOWN'))
        const btn_moveUP: any | null = Array.from(document.getElementsByClassName('ClickUP'))
        btn_moveUP.forEach(onebyone => {
            onebyone.addEventListener('click', ChangePositionUP)
        })
        btn_moveDOWN.forEach(onebyone => {
            onebyone.addEventListener('click', ChangePositionDOWN)
        })
    }

    const listaPosto: any | null = document.getElementById("postos")

    function ChangePositionUP(this: any) {
        const Current = this.parentElement.parentElement.parentElement;
        const Previous = Current.previousElementSibling;
        if (Previous != null) {
            listaPosto.insertBefore(Current, Previous);
        }
    }

    function ChangePositionDOWN(this: any) {
        const Current = this.parentElement.parentElement.parentElement;
        const Next = Current.nextElementSibling;
        if (Next != null) {
            listaPosto.insertBefore(Next, Current);
        }
    }

    return (
        <CardEscala>
            <Card id="card-posto" className='card'>
                <div onClick={onClickMoveUPorDOWN} className="add down ClickDOWN"><KeyboardArrowDown size={20} /></div>
                <div onClick={onClickMoveUPorDOWN} className="add up ClickUP"><KeyboardArrowUp size={20} /></div>
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
                        <ul id='funcoes'>{funcoes}</ul>
                    </Column>
                </Form>
            </Card>
        </CardEscala>
    );
}
