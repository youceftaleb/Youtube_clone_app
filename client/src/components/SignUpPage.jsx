import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "../helpers/validation";
import GoogleIcon from "@mui/icons-material/Google";
import { auth, provider } from "../services/firebase";
import { signInWithPopup } from "firebase/auth";
import { googleAuth, signUp } from "../services/auth";
import { useDispatch, useSelector } from "react-redux";

export const SignUpPage = () => {
  const dispatch = useDispatch();
  const { dark_mode } = useSelector((state) => state.app);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(registerSchema) });
  const onSubmit = (data) => {
    const { email, password, userName } = data;
    signUp({ email, password, userName });
  };
  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => googleAuth(result, dispatch))
      .catch((err) => console.log(err));
  };
  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar
          sx={{
            m: 1,
            bgcolor: "primary.main",
            color: dark_mode ? "black" : "white",
          }}
        >
          <LockOutlinedIcon />
        </Avatar>
        <Typography
          sx={{ color: dark_mode ? "white" : "black" }}
          component="h1"
          variant="h5"
        >
          Sign up
        </Typography>
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          sx={{ mt: 3 }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="given-name"
                name="userName"
                required
                fullWidth
                id="userName"
                label="User Name"
                focused
                color="primary"
                sx={{ input: { color: dark_mode ? "white" : "black" } }}
                {...register("userName")}
                error={!!errors?.userName}
                helperText={errors?.userName ? errors.userName.message : null}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                focused
                color="primary"
                sx={{ input: { color: dark_mode ? "white" : "black" } }}
                {...register("email")}
                error={!!errors?.email}
                helperText={errors?.email ? errors.email.message : null}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                focused
                color="primary"
                sx={{ input: { color: dark_mode ? "white" : "black" } }}
                {...register("password")}
                error={!!errors?.password}
                helperText={errors?.password ? errors.password.message : null}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="outlined"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
        </Box>
        <Button
          onClick={signInWithGoogle}
          fullWidth
          variant="outlined"
          endIcon={<GoogleIcon />}
        >
          sign in with Google
        </Button>
      </Box>
    </Container>
  );
};
