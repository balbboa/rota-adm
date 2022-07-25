/* eslint-disable @next/next/link-passhref */
import { TextField } from '@mui/material';
import Card from '@mui/material/Card';
import { DeleteForever } from "@styled-icons/material/DeleteForever";
import { useEffect, useState } from 'react';
import { CardEscala, Column, Row } from '../CardEscala/Card.styles';
import { Form } from '../Form/Form.Styles';
// Utils
import {
    getEmptyGroup, getEmptyTask, move,
    reorder
} from "../../utils/utils.js";
import ButtonAddAutoFunc from '../ButtonAddAutoFunc';
import ButtonAddNaoAutoFunc from '../ButtonAddNaoAutoFunc';

export const initialNewTaskData = { isAdding: false, groupId: null };

export default function CardPosto({ handleDeleteTask }) {

    const [state, setState] = useState([getEmptyGroup("No Status", false)] as any[]);
    const [newTask, setNewTask] = useState(initialNewTaskData);
    const [cardDiff, setCardDiff] = useState<any>();

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
    })

    const onDragEnd = (result) => {
        const { source, destination } = result;
        // If dropped outside the list
        if (!result.destination) {
            return;
        }
        const sInd = source.droppableId;
        const dInd = destination.droppableId;

        if (sInd === dInd) {
            const selectedGroup = state.filter((group) => group.id === sInd);
            const reorderedGroup = reorder(
                selectedGroup,
                source.index,
                destination.index
            );
            const newState = state.map((group) =>
                group.id === sInd ? reorderedGroup : group
            );
            setState(newState);
        } else {
            const fromGroup = state.filter((group) => group.id === sInd);
            const toGroup = state.filter((group) => group.id === dInd);
            const result: any | null = move(fromGroup, toGroup, source, destination);
            const newState = state.map((group) => {
                if (group.id === sInd) {
                    return result.source;
                } else if (group.id === dInd) {
                    return result.destination;
                } else {
                    return group;
                }
            });
            setState(newState);
        }
    };

    const handleDeleteCard = (groupId, taskId) => (event) => {
        event.stopPropagation();
        if (!(groupId || taskId)) return;
        const newState = state.map((group) => {
            const { id, tasks } = group;
            if (groupId === id) {
                return {
                    ...group,
                    tasks: tasks.filter((task) => !(taskId === task.id)),
                };
            }
            return group;
        });
        setState(newState);
    };

    const addCardInGroup = (groupId) => {
        const newState: any = state.map((group) => {
            const { id, tasks } = group;
            if (groupId === id) {
                return { ...group, tasks: [...tasks, getEmptyTask()] };
            }
            return group;
        });
        setState(newState);
    };

    const toggleNewCard = (groupId) => () => {
        addCardInGroup(groupId);
        setNewTask({ ...newTask, isAdding: !newTask?.isAdding, groupId });
    };

    return (
        <CardEscala>
            <Card id="card-posto" className='card'>
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
                        <ButtonAddAutoFunc handleDeleteTask></ButtonAddAutoFunc>
                        <ButtonAddNaoAutoFunc handleDeleteTask></ButtonAddNaoAutoFunc>
                    </Column>
                </Form>
            </Card>
        </CardEscala>
    );
}
