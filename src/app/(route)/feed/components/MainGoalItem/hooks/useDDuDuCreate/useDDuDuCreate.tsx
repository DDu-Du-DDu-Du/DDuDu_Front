import { useState } from "react";

const useDDuDuCreate = () => {
  const [isCreateDDuDu, setIsCreateDDuDu] = useState(false);

  const handleOpenDDuDuInput = () => {
    setIsCreateDDuDu(true);
  };

  return {
    isCreateDDuDu,
    setIsCreateDDuDu,
    handleOpenDDuDuInput,
  };
};

export default useDDuDuCreate;
