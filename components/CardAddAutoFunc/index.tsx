/* eslint-disable @next/next/link-passhref */
import { TextField } from '@mui/material';
import Card from '@mui/material/Card';
import { DeleteForever } from "@styled-icons/material/DeleteForever";
import { useEffect, useRef, useState } from 'react';
import { CardEscala, Column, Row } from '../CardEscala/Card.styles';
import { Form } from '../Form/Form.Styles';

export default function CardAutoFuncao({ handleDeleteTask }) {
    const [isActive, setIsActive] = useState<any>("");
    const cardfunc2: any | null = useRef(null);

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
        // only add the event listener when the dropdown is opened
        if (!isActive) return;
        function handleClick(event) {
          if (cardfunc2.current && !cardfunc2.current.contains(event.target)) {
            setIsActive('');
          }
        }
        window.addEventListener("click", handleClick);
        // clean up
        return () => window.removeEventListener("click", handleClick);
      }, [isActive]);

    return (
        <CardEscala id='card-escala'>
            <Card onClick={() => setIsActive('active')} className={`card funcoes ${isActive}`} ref={cardfunc2}>
            <div onClick={(event) => handleDeleteTask(event)} className="add delete2"><DeleteForever size={20} /></div>
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
                                name="requisitos"
                                label="Requisitos"
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
