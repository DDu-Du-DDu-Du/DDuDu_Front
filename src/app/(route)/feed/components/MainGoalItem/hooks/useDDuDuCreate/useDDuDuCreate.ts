import { useState } from "react";

interface UseDDuDuCreateProps {
  status?: "IN_PROGRESS" | "DONE";
  handleAlertModalToggleOn?: () => void;
}

const useDDuDuCreate = ({ status, handleAlertModalToggleOn }: UseDDuDuCreateProps) => {
  const [isCreateDDuDu, setIsCreateDDuDu] = useState(false);

  const handleOpenDDuDuInput = () => {
    if (status === "DONE") {
      handleAlertModalToggleOn && handleAlertModalToggleOn();
      return;
    }

    setIsCreateDDuDu(true);
  };

  return {
    isCreateDDuDu,
    setIsCreateDDuDu,
    handleOpenDDuDuInput,
  };
};

export default useDDuDuCreate;
