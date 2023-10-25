import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { makeStyles } from "tss-react/mui";
import { Header } from "./components/Header";
import { HomePage } from "./pages/HomePage";
import { CoinPage } from "./pages/CoinPage";

function App() {
    const useStyles = makeStyles()(() => {
        return {
            App: {
                backgroundColor: "#14161a",
                color: "white",
                minHeight: "100vh",
            },
        };
    });

    const { classes } = useStyles();

    return (
        <BrowserRouter>
            <div className={classes.App}>
                <Header />
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/coins/:id" element={<CoinPage />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
