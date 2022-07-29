/* eslint-disable @next/next/link-passhref */
import { TextField } from '@mui/material';
import Card from '@mui/material/Card';
import { DeleteForever } from "@styled-icons/material/DeleteForever";
import { DragIndicator } from "@styled-icons/material/DragIndicator";
import { useEffect, useRef, useState } from 'react';
import {
    DraggableProvidedDragHandleProps
} from 'react-beautiful-dnd';
import { CardEscala, Column, Row } from '../CardEscala/Card.styles';

import { Form } from '../Form/Form.Styles';
// Utils
import ButtonAddAutoFunc from '../ButtonAddAutoFunc';
import ButtonAddNaoAutoFunc from '../ButtonAddNaoAutoFunc';

export interface Props {
    dragHandleProps: DraggableProvidedDragHandleProps
    handleDeleteTask: any
}

export default function CardPosto({ handleDeleteTask, dragHandleProps }: Props) {

    const [isActive, setIsActive] = useState<any>("");
    const card: any | null = useRef(null);

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
        // only add the event listener when the dropdown is opened
        if (!isActive) return;
        function handleClick(event) {
          if (card.current && !card.current.contains(event.target)) {
            setIsActive('');
          }
        }
        window.addEventListener("click", handleClick);
        // clean up
        return () => window.removeEventListener("click", handleClick);
      }, [isActive]);

    return (
        <CardEscala>
            <Card onClick={() => setIsActive('active')} className={`card ${isActive}`} ref={card}>
                <span className='drag-icon' {...dragHandleProps}>
                    <DragIndicator size={30} />
                </span>
                <div onClick={(event) => handleDeleteTask(event)} className="add delete"><DeleteForever size={20} /></div>
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
                        <ButtonAddNaoAutoFunc handleDeleteTask></ButtonAddNaoAutoFunc>
                        <ButtonAddAutoFunc handleDeleteTask></ButtonAddAutoFunc>
                    </Column>
                </Form>
            </Card>
        </CardEscala>
    );
}
