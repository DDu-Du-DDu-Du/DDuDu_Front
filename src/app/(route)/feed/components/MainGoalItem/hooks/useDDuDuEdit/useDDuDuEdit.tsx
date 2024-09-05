import { useState } from "react";

interface UseDDuDuEditProps {
  setIsCreateDDuDu: React.Dispatch<React.SetStateAction<boolean>>;
}

const useDDuDuEdit = ({ setIsCreateDDuDu }: UseDDuDuEditProps) => {
  const [currentDDuDuId, setCurrentDDuDuId] = useState(-1);
  const [editDDuDuId, setEditDDuDuId] = useState(-1);

  const handleCloseDDuDuInput = () => {
    setIsCreateDDuDu(false);
    setEditDDuDuId(-1);
    setCurrentDDuDuId(-1);
  };

  const handleUpdateEditDDuDuId = (id: number) => {
    setEditDDuDuId(id);
  };

  return {
    currentDDuDuId,
    editDDuDuId,
    setCurrentDDuDuId,
    handleCloseDDuDuInput,
    handleUpdateEditDDuDuId,
  };
};

export default useDDuDuEdit;
