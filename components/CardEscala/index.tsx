/* eslint-disable @next/next/link-passhref */
import { TextField } from '@mui/material';
import Card from '@mui/material/Card';
import { Form } from '../Form/Form.Styles';
import { CardEscala, Column, Row } from './Card.styles';


export default function CardInfo() {

    let card: any = "";

    if (typeof window !== "undefined") {
        card = document.getElementById("card");
    }

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

    var open = false

    var activeCard = function () {
        card.classList.add("active");
        open = true
    }
    var deactiveCard = function () {
        card.classList.remove("active");
        open = false
    }

    function SetActiveDiv() {
        var toggle = open ? deactiveCard : activeCard;
        toggle();
    }

    return (
        <CardEscala>
            <Card onClick={SetActiveDiv} id="card" className='card'>
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
