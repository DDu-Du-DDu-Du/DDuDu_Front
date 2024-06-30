"use client";

import { Fragment, useState } from "react";

import { DDuDuSheet } from "@/app/_components/client";
import { GoalItem } from "@/app/_components/server";
import { useToggle } from "@/app/_hooks";

import { MainDDuDusType, MainGoalItemType } from "../../feed.types";
import { MainDDuDuInput, MainDDuDuItem } from "./components";

const MainGoalList = ({ goal, ddudus }: MainGoalItemType) => {
  const [dduduList, setDDuDuList] = useState(ddudus);
  const [isCreateDDuDu, setIsCreateDDuDu] = useState(false);

  const { isToggle, handleToggleOn, handleToggleOff } = useToggle();

  const onOpenDDuDuInput = () => {
    setIsCreateDDuDu(true);
  };

  const onCloseDDuDuInput = () => {
    setIsCreateDDuDu(false);
  };

  const onCreateDDuDu = (ddudu: string) => {
    const newDDuDu: MainDDuDusType = { id: 1000, name: ddudu, status: "UNCOMPLETED" };

    setDDuDuList([...dduduList, newDDuDu]);
  };

  const onDDuDuCheckToggle = (id: number) => {
    const changeDDuDuList: MainDDuDusType[] = dduduList.map((ddudu) =>
      ddudu.id === id
        ? { ...ddudu, status: ddudu.status === "COMPLETE" ? "UNCOMPLETED" : "COMPLETE" }
        : ddudu,
    );

    setDDuDuList(changeDDuDuList);
  };

  return (
    <li className="mb-[2.5rem]">
      <GoalItem
        type="create"
        id={goal.id}
        goalName={goal.name}
        onOpenDDuDuInput={onOpenDDuDuInput}
      />
      <ul className="flex flex-col gap-[1rem]">
        {dduduList.map(({ id, name, status }) => (
          <Fragment key={id}>
            <MainDDuDuItem
              id={id}
              ddudu={name}
              status={status}
              color={goal.color}
              onDDuDuCheckToggle={onDDuDuCheckToggle}
              handleToggleOn={handleToggleOn}
            />
          </Fragment>
        ))}
        {isCreateDDuDu && (
          <MainDDuDuInput
            goalId={goal.id}
            color={goal.color}
            onCloseDDuDuInput={onCloseDDuDuInput}
            onCreateDDuDu={onCreateDDuDu}
          />
        )}
      </ul>
      {isToggle && <DDuDuSheet onClose={handleToggleOff} />}
    </li>
  );
};

export default MainGoalList;
