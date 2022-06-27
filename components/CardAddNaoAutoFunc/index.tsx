/* eslint-disable @next/next/link-passhref */
import { TextField } from '@mui/material';
import Card from '@mui/material/Card';
import { useEffect } from 'react';
import { CardEscala, Column, Row } from '../CardEscala/Card.styles';
import { Form } from '../Form/Form.Styles';

export default function CardNaoAutoFuncao(id) {

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
        const cardNaoAuto: any | null = document.getElementById("card-naoauto");
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

        const cardsEscala: any | null = document.getElementById("card-escala")?.getElementsByClassName("card")
        for (let i = 0; i < cardsEscala.length; i++) {
            cardsEscala[i].id = i;
        }
    })

    return (
        <CardEscala id='card-escala'>
            <Card id="card-naoauto" className='card'>
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