/* eslint-disable @next/next/link-passhref */
import { TextField } from '@mui/material';
import Card from '@mui/material/Card';
import { useEffect } from 'react';
import { Form } from '../Form/Form.Styles';
import { CardEscala, Column, Row } from './Card.styles';


export default function CardInfo() {

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
        const card: any | null = document.getElementById("card");
        // Client-side-only code
        window.addEventListener('click', function (e) {
                if (card?.contains(e.target)) {
                    // Clicked in box
                    card?.classList.add('active');
                } else {
                    // Clicked outside the box
                    card?.classList.remove('active');
                }
        
        });
    })

    return (
        <CardEscala>
            <Card id="card" className='card'>
                <Form>
                    <Column>
                        <Row>
                            <TextField
                                fullWidth
                                name="operacao"
                                label="Operação"
                                InputLabelProps={{ shrink: true, required: false }}
                                type="text"
                            />
                            <TextField
                                fullWidth
                                name="unidade"
                                label="Unidade"
                                InputLabelProps={{ shrink: true, required: true }}
                                type="text"
                            />
                        </Row>
                        <Row>
                            <TextField
                                fullWidth
                                name="tipo-de-escala"
                                label="Tipo de escala"
                                InputLabelProps={{ shrink: true, required: true }}
                                type="text"
                            />
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
                                name="pagamento"
                                label="Pagamento antecipado"
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
                    </Column>
                </Form>
            </Card>
        </CardEscala>
    );
}
