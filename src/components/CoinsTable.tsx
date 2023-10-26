import {
    Container,
    LinearProgress,
    Pagination,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    ThemeProvider,
    Typography,
    createTheme,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { makeStyles } from "tss-react/mui";
import { CryptoState } from "./CryptoContext";
import { numberWithCommas } from "./banner/Carousel";
import axios from "axios";
import { CoinList } from "../config/api";

type CoinsTableProps = {};

export const CoinsTable = (props: CoinsTableProps) => {
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [coins, setCoins] = useState([]);

    const { currency, symbol } = CryptoState();

    useEffect(() => {
        const fetchCoinList = async () => {
            try {
                setLoading(true);
                const { data } = await axios.get(CoinList(currency));

                console.log("CoinList", data);

                setCoins(data);
                setLoading(false);
            } catch (error: any) {
                console.log(error.message);
            }
        };

        fetchCoinList();
    }, [currency]);

    const navigate = useNavigate();

    const darkTheme = createTheme({
        palette: {
            primary: {
                main: "#fff",
            },
            mode: "dark",
        },
    });

    const handleSearch = () => {
        return coins.filter(
            (coin: any) =>
                coin.name.toLowerCase().includes(search) ||
                coin.symbol.toLowerCase().includes(search)
        );
    };

    const useStyles = makeStyles()(() => {
        return {
            row: {
                backgroundColor: "#16171a",
                cursor: "pointer",
                "&:hover": {
                    backgroundColor: "#131111",
                },
                fontFamily: "Montserrat",
            },
            pagination: {
                "& .MuiPaginationItem-root": {
                    color: "gold",
                },
            },
        };
    });

    const { classes } = useStyles();

    return (
        <>
            <ThemeProvider theme={darkTheme}>
                <Container style={{ textAlign: "center" }}>
                    <Typography
                        variant="h4"
                        style={{ margin: 18, fontFamily: "Montserrat" }}
                    >
                        Cryptocurrency Prices by Market Cap
                    </Typography>

                    <Typography>
                        <TextField
                            label="Search Cryptocurrency by: Name or Ticker Symbol"
                            variant="outlined"
                            style={{ marginBottom: 20, width: "100%" }}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <TableContainer component={Paper}>
                            {loading ? (
                                <LinearProgress
                                    style={{ backgroundColor: "gold" }}
                                />
                            ) : (
                                <Table>
                                    <TableHead
                                        style={{ backgroundColor: "#EEBC1D" }}
                                    >
                                        <TableRow>
                                            {[
                                                "Coin",
                                                "Price",
                                                "24hr Change",
                                                "Market Cap",
                                            ].map((head: any) => (
                                                <TableCell
                                                    style={{
                                                        color: "black",
                                                        fontWeight: "700",
                                                        fontFamily:
                                                            "Montserrat",
                                                    }}
                                                    key={head}
                                                    align={
                                                        head === "Coin"
                                                            ? "inherit"
                                                            : "right"
                                                    }
                                                >
                                                    {head}
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    </TableHead>

                                    <TableBody>
                                        {handleSearch()
                                            .slice(
                                                (page - 1) * 10,
                                                (page - 1) * 10 + 10
                                            )
                                            .map((row: any) => {
                                                const profit = Number(
                                                    row.price_change_percentage_24h >=
                                                        0
                                                );
                                                return (
                                                    <TableRow
                                                        onClick={() =>
                                                            navigate(
                                                                `/coins/${row.id}`
                                                            )
                                                        }
                                                        className={classes.row}
                                                        key={row.name}
                                                    >
                                                        <TableCell
                                                            component="th" // Table header.
                                                            scope="row"
                                                            style={{
                                                                display: "flex",
                                                                gap: 15,
                                                            }}
                                                        >
                                                            <img
                                                                src={row.image}
                                                                alt={row.name}
                                                                height="50"
                                                                style={{
                                                                    marginBottom: 10,
                                                                }}
                                                            />
                                                            <div
                                                                style={{
                                                                    display:
                                                                        "flex",
                                                                    flexDirection:
                                                                        "column",
                                                                }}
                                                            >
                                                                <span
                                                                    style={{
                                                                        textTransform:
                                                                            "uppercase",
                                                                        fontSize: 22,
                                                                    }}
                                                                >
                                                                    {row.symbol}
                                                                </span>

                                                                <span
                                                                    style={{
                                                                        color: "darkgrey",
                                                                    }}
                                                                >
                                                                    {row.name}
                                                                </span>
                                                            </div>
                                                        </TableCell>

                                                        <TableCell align="right">
                                                            {symbol}{" "}
                                                            {numberWithCommas(
                                                                row.current_price.toFixed(
                                                                    2
                                                                )
                                                            )}
                                                        </TableCell>

                                                        <TableCell
                                                            align="right"
                                                            style={{
                                                                color:
                                                                    profit >= 0
                                                                        ? "rgb(14, 203, 129)"
                                                                        : "red",
                                                                fontWeight: 500,
                                                            }}
                                                        >
                                                            {profit && "+"}{" "}
                                                            {row.price_change_percentage_24h.toFixed(
                                                                2
                                                            )}
                                                            %
                                                        </TableCell>

                                                        <TableCell align="right">
                                                            {symbol}{" "}
                                                            {numberWithCommas(
                                                                row.market_cap
                                                                    .toString()
                                                                    .slice(
                                                                        0,
                                                                        -6
                                                                    )
                                                            )}
                                                            MM
                                                        </TableCell>
                                                    </TableRow>
                                                );
                                            })}
                                    </TableBody>
                                </Table>
                            )}
                        </TableContainer>

                        <Pagination
                            count={Number(
                                (handleSearch()?.length / 10).toFixed(0)
                            )}
                            style={{
                                padding: 20,
                                width: "100%",
                                display: "flex",
                                justifyContent: "center",
                            }}
                            classes={{ ul: classes.pagination }}
                            onChange={(_, value) => {
                                setPage(value);
                                window.scroll(0, 450);
                            }}
                        />
                    </Typography>
                </Container>
            </ThemeProvider>
        </>
    );
};
