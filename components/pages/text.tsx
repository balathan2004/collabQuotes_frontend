import React, { FC, useEffect } from "react";

const TestPage: FC = () => {
  const url = import.meta.env.VITE_DEST_URL;

  useEffect(() => {
    async function getCred() {
      try {
        console.log("started");
        const response = await fetch(`${url}/hello`, {
          method: "GET",
          credentials: "include",
          headers:{
            "Content-Type": "application/json",
          }
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const res = await response.json();
        console.log(res);

        if (res && res.status === 200) {
          console.log("Success");
        }
      } catch (error) {
        console.error("Error in getCred:", error);
      }
    }
    getCred();
  }, []);

  return (
    <div className="container">
      <p>hello world</p>
    </div>
  );
};

export default TestPage;
