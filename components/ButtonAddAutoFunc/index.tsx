/* eslint-disable @next/next/link-passhref */
import { Button } from '@mui/material';
import { useEffect, useState } from 'react';
import {
    DragDropContext, Draggable, Droppable
} from "react-beautiful-dnd";
import CardAutoFuncao from '../CardAddAutoFunc';
// Utils
import {
    getEmptyGroup, getEmptyTask, move,
    reorder
} from "../../utils/utils.js";
import { Row } from '../CardEscala/Card.styles';

export const initialNewTaskData = { isAdding: false, groupId: null };

export default function ButtonAddAutoFunc({ handleDeleteTask }) {

    const [state, setState] = useState([getEmptyGroup("No Status", false)] as any[]);
    const [newTask, setNewTask] = useState(initialNewTaskData);

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
        <DragDropContext onDragEnd={onDragEnd}>
            {state.map((el: any) => {
                const {
                    id: groupId,
                    tasks,
                } = el;
                return (
                    <Droppable key={groupId} droppableId={groupId}>
                        {(provided) => (
                            <div>
                                <div
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                >
                                    {tasks.map((task, index) => {
                                        return (
                                            <Draggable
                                                key={task?.id}
                                                draggableId={`draggable-${task?.id}`}
                                                index={index}
                                            >
                                                {(provided) => (
                                                    <div
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                    >
                                                        <CardAutoFuncao
                                                            handleDeleteTask={handleDeleteCard(
                                                                groupId,
                                                                task?.id
                                                            )} />
                                                    </div>
                                                )}
                                            </Draggable>
                                        );
                                    })}
                                    {provided.placeholder}
                                </div>
                                <Row>
                                    <Button
                                        onClick={toggleNewCard(groupId)}
                                        className='addFunc'
                                        variant="contained"
                                    >
                                        Adicionar função autoescalável
                                    </Button>
                                </Row>
                            </div>
                        )}
                    </Droppable>
                );
            })}
        </DragDropContext>
    );
}
