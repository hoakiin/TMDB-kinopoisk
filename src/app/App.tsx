import { Header } from "./layout/Header/Header";
import { Routing } from "./Routing";
import s from "./App.module.css";
import { Footer } from "./layout/Footer/Footer";
import { ToastContainer } from "react-toastify";
import { LinearProgress } from "../common/components/LinearProgress/LinearProgress";
import { useAppSelector, useGlobalLoading } from "../common/hooks";
import { useEffect } from "react";
import { selectThemeMode } from "./tmdb-slice";

function App() {
  const isGlobalLoading = useGlobalLoading();
  const themeMode = useAppSelector(selectThemeMode);

  useEffect(() => {
    document.body.setAttribute("data-theme", themeMode);
  }, [themeMode]);

  return (
    <div className={s.app}>
      <Header />
      {isGlobalLoading && (
        <div className={s.progress}>
          <LinearProgress />
        </div>
      )}
      <div className={s.layout}>
        <Routing />
      </div>
      <Footer />
      <ToastContainer />
    </div>
  );
}

export default App;
