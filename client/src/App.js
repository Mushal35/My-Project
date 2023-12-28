import Topbar from "./components/Topbar";
import { useState } from "react";
import Sidebar from "./components/Sidebar";
import { Outlet } from "react-router-dom";
import {useStateContext} from "./contexts/contextProvider"

const App = () => {
  const {setloginState, setuserData} = useStateContext()
  useEffect(() => {
    const getUser = () => {
      fetch("http://localhost:5000/auth/login/success", {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
      })
        .then((response) => {
          if (response.status === 200) {
            setloginState(true)
            return response.json()
          };
          throw new Error("authentication has been failed!");
        })
        .then((resObject) => {
          console.log(resObject.user)
          setuserData(resObject.user);
        })
        .catch((err) => {
          setloginState(false)
          console.log(err);
        });
    };
    getUser();
  }, []);

  const [isSidebar, setIsSidebar] = useState(true);
  return (
    <div className="app">
      <Sidebar isSidebar={isSidebar} />
      <main className="content">
        <Topbar setIsSidebar={setIsSidebar} />
        <Outlet />
      </main>
    </div>
  );
};

export default App;
