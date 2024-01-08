// Card.js
import React from "react";
import styled, { css } from "styled-components";
import { TaskData } from "../../models/TaskData";

const CardContainer = styled.div`
  width: 300px;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  transition: transform 0.2s ease-in-out;
  cursor: pointer;

  &:hover {
    transform: scale(1.05);
  }
`;

const CardTitle = styled.h3`
  color: #333;
  font-size: 1.5rem;
  margin-bottom: 10px;
  margin-top: 10px;
`;

const CardContent = styled.p`
  color: #666;
  font-size: 1rem;
  border-bottom: 1px solid #e3e3e3;
  padding-bottom: 10px;
`;

const GroupBox = styled.div`
  padding: 4px 8px;
  background-color: #c4ffd6;
  color: #009016;
  width: fit-content;
  border-radius: 5px;
`;

const LowerContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 12px;
  align-items: center;
`;

const StatusBox = styled.div`
  font-size: 15px;
`;

const ImageBox = styled.div`
  height: 130px;
  width: 100%;
  border-radius: 5px;
  margin-top: 20px;
`;

const PriorityBox = styled.div<{ $priority?: string }>`
  /* height: 10px; */
  color: white;
  border-radius: 3px;
  width: fit-content;
  padding: 4px 8px;

  background-color: ${(props) => {
    switch (props.$priority) {
      case "HIGH":
        return "red";
      case "MEDIUM":
        return "orange";
      case "LOW":
        return "pink";
      default:
        return "transparent";
    }
  }};

  /* Add more styles if needed */
`;

const UpperContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const DueDateBox = styled.div`
  font-size: 10px;
  color: #666;
  font-weight: bold;
`;

const Card = ({task} : {task: TaskData}) => {
  return (
    <CardContainer>
      <UpperContainer>
        <PriorityBox $priority={task.attributes.priority}>{task.attributes.priority}</PriorityBox>
        <GroupBox>{task.attributes.group}</GroupBox>
      </UpperContainer>
      <ImageBox>
        <img className="card-image" src={task.attributes.attachment ?? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyVaxs3qBS_MeNaG5dioG8xKand1IJoBULoNm3UmqQHg&s"} alt="" />
      </ImageBox>
      <CardTitle>{task.attributes.title}</CardTitle>
      <CardContent>{task.attributes.description}</CardContent>
      <LowerContainer>
        <DueDateBox>{task.attributes.due_date}</DueDateBox>
        <StatusBox>{task.attributes.status}</StatusBox>
      </LowerContainer>
    </CardContainer>
  );
};

export default Card;
