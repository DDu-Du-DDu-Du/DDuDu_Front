"use client";

import { Fragment, useState } from "react";

import { DDuDuSheet } from "@/app/_components/client";
import { GoalItem } from "@/app/_components/server";
import { useToggle } from "@/app/_hooks";
import { fetchCompleteToggleDDuDu, fetchDeleteDDuDu } from "@/app/_services/client";
import { useMutation } from "@tanstack/react-query";

import { MainDDuDusType, MainDailyListType } from "../../feed.types";
import { MainDDuDuInput, MainDDuDuItem } from "./components";

import { useSession } from "next-auth/react";

const MainGoalList = ({ goal, ddudus }: MainDailyListType) => {
  const [dduduList, setDDuDuList] = useState(ddudus);
  const [isCreateDDuDu, setIsCreateDDuDu] = useState(false);
  const [currentDDuDuId, setCurrentDDuDuId] = useState(-1);
  const [isDDuDuEdit, setIsDDuDuEdit] = useState(-1);

  const { isToggle, handleToggleOn, handleToggleOff } = useToggle();

  const { data: session } = useSession();

  const deleteDDuDuMutation = useMutation({
    mutationKey: ["deleteDDuDu"],
    mutationFn: fetchDeleteDDuDu,
  });

  const completeToggleDDuDuMutation = useMutation({
    mutationKey: ["completeToggle"],
    mutationFn: fetchCompleteToggleDDuDu,
  });

  // const { data } = useQuery({
  //   queryKey: [""],
  //   queryFn: () => getDDuDuDetail({accessToken: session?.sessionToken as string, id}),
  // });

  const onOpenDDuDuInput = () => {
    setIsCreateDDuDu(true);
  };

  const onCloseDDuDuInput = () => {
    setIsCreateDDuDu(false);
    setIsDDuDuEdit(-1);
    setCurrentDDuDuId(-1);
  };

  const onCreateDDuDu = ({ id, ddudu }: { id: number; ddudu: string }) => {
    // 뚜두 생성 API
    const newDDuDu: MainDDuDusType = { id, name: ddudu, status: "UNCOMPLETED" };
    setDDuDuList([...dduduList, newDDuDu]);
  };

  const onEditDDuDu = (editDDuDu: MainDDuDusType) => {
    // 뚜두 수정 API
    const editedDDuDuList = dduduList.map((ddudu) =>
      ddudu.id === editDDuDu.id ? editDDuDu : ddudu,
    );

    setDDuDuList(editedDDuDuList);
    onCloseDDuDuInput();
  };

  const onDDuDuCheckToggle = (id: number) => {
    completeToggleDDuDuMutation.mutate({
      accessToken: session?.sessionToken as string,
      id,
    });

    const changeDDuDuList: MainDDuDusType[] = dduduList.map((ddudu) =>
      ddudu.id === id
        ? { ...ddudu, status: ddudu.status === "COMPLETE" ? "UNCOMPLETED" : "COMPLETE" }
        : ddudu,
    );

    setDDuDuList(changeDDuDuList);
  };

  const handleDDuDuSheetOpen = (id: number) => {
    setCurrentDDuDuId(id);
    handleToggleOn();
  };

  const handleEditDDuDuId = (id: number) => {
    setIsDDuDuEdit(id);
  };

  const handleDeleteDDuDuId = (id: number) => {
    // 삭제 API 동작
    deleteDDuDuMutation.mutate({
      accessToken: session?.sessionToken as string,
      id,
    });

    const deleteDDuDuList = dduduList.filter((ddudu) => ddudu.id !== id);
    setDDuDuList(deleteDDuDuList);

    handleToggleOff();
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
            {id === isDDuDuEdit ? (
              <MainDDuDuInput
                type="edit"
                goalId={goal.id}
                color={goal.color}
                dduduItem={{ id, name, status }}
                onEditDDuDu={onEditDDuDu}
                onCloseDDuDuInput={onCloseDDuDuInput}
              />
            ) : (
              <MainDDuDuItem
                id={id}
                ddudu={name}
                status={status}
                color={goal.color}
                onDDuDuCheckToggle={onDDuDuCheckToggle}
                handleToggleOn={() => handleDDuDuSheetOpen(id)}
              />
            )}
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
      {isToggle && (
        <DDuDuSheet
          dduduId={currentDDuDuId}
          handleEditDDuDuId={handleEditDDuDuId}
          handleDeleteDDuDuId={handleDeleteDDuDuId}
          onClose={handleToggleOff}
        />
      )}
    </li>
  );
};

export default MainGoalList;
