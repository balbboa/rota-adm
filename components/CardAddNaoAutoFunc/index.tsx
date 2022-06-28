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
        const cardNaoAuto: any | null = document.getElementById("card-naoauto")
        // Client-side-only code
        window.addEventListener('click', function (e) {
            if (typeof cardNaoAuto === 'object' && cardNaoAuto !== null && 'contains' in cardNaoAuto) {
                if (cardNaoAuto?.contains(e.target)) {
                    // Clicked in box
                    cardNaoAuto?.classList.add('active');
                } else {
                    // Clicked outside the box
                    cardNaoAuto?.classList.remove('active');
                }
            }
        });

        for (let i = 0; i < cardNaoAuto?.length; i++) {
            cardNaoAuto[i].id = `funcao${i}`;
        }
    })

    return (
        <CardEscala id='card-escala'>
            <Card id='card-naoauto' className='card'>
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
