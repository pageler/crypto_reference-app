import { Container, Typography } from "@mui/material";
import { makeStyles } from "tss-react/mui";
import { Carousel } from "./Carousel";

type BannerProps = {};

export const Banner = (props: BannerProps) => {
    const useStyles = makeStyles()(() => {
        return {
            banner: {
                backgroundImage: "url(../images/banner2.jpg)",
            },
            bannerContent: {
                height: 400,
                display: "flex",
                flexDirection: "column",
                paddingTop: 25,
                justifyContent: "space-around",
            },
            tagline: {
                display: "flex",
                height: "40%",
                flexDirection: "column",
                textAlign: "center",
            },
        };
    });

    const { classes } = useStyles();

    return (
        <>
            <div className={classes.banner}>
                <Container className={classes.bannerContent}>
                    <div className={classes.tagline}>
                        <Typography
                            variant="h2"
                            style={{
                                fontWeight: "bold",
                                marginBottom: 15,
                                fontFamily: "Montserrat",
                            }}
                        >
                            Crypto Reference App
                        </Typography>
                        <Typography
                            variant="subtitle2"
                            style={{
                                color: "darkgrey",
                                textTransform: "capitalize",
                                fontFamily: "Montserrat",
                            }}
                        >
                            Get all Info regarding your favorite Cryptocurrency!
                        </Typography>
                    </div>
                    <Carousel />
                </Container>
            </div>
        </>
    );
};
