/* eslint-disable @next/next/link-passhref */
import { TextField } from '@mui/material';
import Card from '@mui/material/Card';
import { KeyboardArrowDown } from "@styled-icons/material/KeyboardArrowDown";
import { KeyboardArrowUp } from "@styled-icons/material/KeyboardArrowUp";
import { useEffect } from 'react';
import { CardEscala, Column, Row } from '../CardEscala/Card.styles';
import { Form } from '../Form/Form.Styles';

export default function CardNaoAutoFuncao() {

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
        const cardNaoAuto: any | null = document.getElementById("card-naoauto")
        // Client-side-only code
        window.addEventListener('click', function (e) {
            if (cardNaoAuto?.contains(e.target)) {
                // Clicked in box
                cardNaoAuto?.classList.add('active');
            } else {
                // Clicked outside the box
                cardNaoAuto?.classList.remove('active');
            }

        });
    })

    function onClickMoveUPorDOWN() {
        const btn_moveDOWN: any | null = Array.from(document.getElementsByClassName('ClickDown'))
        const btn_moveUP: any | null = Array.from(document.getElementsByClassName('ClickUp'))
        btn_moveUP.forEach(onebyone => {
            onebyone.addEventListener('click', ChangePositionUP)
        })
        btn_moveDOWN.forEach(onebyone => {
            onebyone.addEventListener('click', ChangePositionDOWN)
        })
    }

    const listaFuncao: any | null = document.getElementById("funcoes")

    function ChangePositionUP(this: any) {
        const Current = this.parentElement.parentElement.parentElement;
        const Previous = Current.previousElementSibling;
        if (Previous != null) {
            listaFuncao.insertBefore(Current, Previous);
        }
    }

    function ChangePositionDOWN(this: any) {
        const Current = this.parentElement.parentElement.parentElement;
        const Next = Current.nextElementSibling;
        if (Next != null) {
            listaFuncao.insertBefore(Next, Current);
        }
    }

    return (
        <CardEscala id='card-escala'>
            <Card id='card-naoauto' className='card funcoes'>
                <div onClick={onClickMoveUPorDOWN} className="add down ClickDown"><KeyboardArrowDown size={20} /></div>
                <div onClick={onClickMoveUPorDOWN} className="add up ClickUp"><KeyboardArrowUp size={20} /></div>
                <Form>
                    <Column>
                        <Row>
                            <TextField
                                fullWidth
                                name="tipo-funcao"
                                label="Tipo de função"
                                InputLabelProps={{ shrink: true, required: true }}
                                type="text"
                            />
                            <TextField
                                fullWidth
                                name="agente"
                                label="Agente"
                                InputLabelProps={{ shrink: true, required: true }}
                                type="text"
                            />
                            <TextField
                                fullWidth
                                name="vtr"
                                label="VTR"
                                InputLabelProps={{ shrink: true, required: true }}
                                type="text"
                            />
                            <TextField
                                sx={{ width: '250ch' }}
                                fullWidth
                                name="obs"
                                label="Local"
                                InputLabelProps={{ shrink: true, required: true }}
                                type="text"
                            />
                        </Row>
                    </Column>
                </Form>
            </Card>
        </CardEscala>
    );
}
