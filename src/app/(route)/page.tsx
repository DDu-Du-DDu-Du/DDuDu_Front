"use client";

import useToast from "../_components/client/Toast/hooks/useToast/useToast";

const Home = () => {
  const { createToast } = useToast();
  return (
    <main className="w-full">
      DDuDu
      <button
        type="button"
        onClick={() => createToast("fdsjkfbskdj")}
      >
        ddd
      </button>
    </main>
  );
};

export default Home;
