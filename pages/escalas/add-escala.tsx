/* eslint-disable react/jsx-key */
import { Button } from "@mui/material";
import { useState } from "react";
import {
  DragDropContext, Draggable, Droppable
} from "react-beautiful-dnd";
import CardPosto from "../../components/CardAddPosto";
import CardInfo from "../../components/CardEscala";
import { Row } from "../../components/CardEscala/Card.styles";
import Container from "../../components/Container";
import { Tittle } from "../../components/Container/Container.Styles";
import withAuth from "../../utils/withAuth";
// Utils
import {
  getEmptyGroup, getEmptyTask, move,
  reorder
} from "../../utils/utils.js";

export const initialNewTaskData = { isAdding: false, groupId: null };

function AddEscalas() {
  const [cont, setCont] = useState<any>(0);
  const [state, setState] = useState([getEmptyGroup("No Status", false)]);
  const [newTask, setNewTask] = useState(initialNewTaskData);

  function AddPosto() {
    setCont(cont + 1)
  }

  const listItems = [...Array(cont)].map((_, i) => <CardPosto key={i} />)

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

  const addTaskInGroup = (groupId) => {
    const newState: any = state.map((group) => {
      const { id, tasks } = group;
      if (groupId === id) {
        return { ...group, tasks: [...tasks, getEmptyTask()] };
      }
      return group;
    });
    setState(newState);
  };

  const toggleNewTask = (groupId) => () => {
    addTaskInGroup(groupId);
    setNewTask({ ...newTask, isAdding: !newTask?.isAdding, groupId });
  };
  
  return (
    <Container title="Adicionar Escala">
      <Tittle>Adicionar Escala</Tittle>
      <CardInfo />
      <Row>
        <Button className="addPosto"
          variant="contained"
          onClick={AddPosto}
        >
          Adicionar Posto
        </Button>
      </Row>
      {/* {listItems} */}


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
                            <CardPosto />
                            </div>
                          )}
                        </Draggable>
                      );
                    })}
                    {provided.placeholder}
                  </div>
                  <button
                    onClick={toggleNewTask(groupId)}
                  >
                    + New Task
                  </button>
                </div>
              )}
            </Droppable>
          );
        })}
      </DragDropContext>
    </Container>
  );
}

export default withAuth(AddEscalas);


