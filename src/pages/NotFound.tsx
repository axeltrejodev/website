import { useEffect } from "react";

function NotFound() {
  useEffect(() => {
    document.title = "Axel Trejo - Not Found";
  }, []);
  return (
    <>
      <h1>404</h1>
      <h2>Not Found</h2>
    </>
  );
}

export default NotFound;
