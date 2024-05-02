interface IconViewerProps {
  children: React.ReactNode;
}

const IconViewer = ({ children }: IconViewerProps) => {
  return (
    <section
      style={{
        width: "5rem",
        height: "5rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "0.5rem",
        border: "1px solid #D9D9D9",
      }}
    >
      {children}
    </section>
  );
};
export default IconViewer;
