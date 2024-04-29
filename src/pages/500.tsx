// ** React Imports
import { ReactNode } from "react";

//** react dom */
import { Link } from "react-router-dom";

// ** MUI Components
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Box, { BoxProps } from "@mui/material/Box";
import BlankLayout from "../components/layouts/BlankLayout";

// ** Styled Components
const BoxWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    width: "90vw",
  },
}));

const Img = styled("img")(({ theme }) => ({
  marginTop: theme.spacing(15),
  marginBottom: theme.spacing(15),
  [theme.breakpoints.down("lg")]: {
    height: 450,
    marginTop: theme.spacing(10),
    marginBottom: theme.spacing(10),
  },
  [theme.breakpoints.down("md")]: {
    height: 400,
  },
}));

const StyledTypography = styled(Typography)`
  color: #fff;
`;
const Error500 = () => {
  return (
    <Box className="content-center">
      <Box
        sx={{
          p: 5,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <BoxWrapper>
          <StyledTypography variant="h1" sx={{ mb: 2.5 }}>
            500
          </StyledTypography>

          <StyledTypography
            variant="h5"
            sx={{ mb: 2.5, fontSize: "1.5rem !important" }}
          >
            Internal server error 👨🏻‍💻
          </StyledTypography>

          <StyledTypography variant="body2">
            Oops, something went wrong!
          </StyledTypography>
        </BoxWrapper>
        <Img alt="error-illustration" src="/images/pages/404.png" />
        <Button component={Link} to="/" variant="contained" sx={{ px: 5.5 }}>
          Back to Home
        </Button>
      </Box>
    </Box>
  );
};

Error500.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>;

export default Error500;
