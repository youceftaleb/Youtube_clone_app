import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../helpers/validation";
import { googleAuth, login } from "../services/auth";
import { useDispatch, useSelector } from "react-redux";
import GoogleIcon from "@mui/icons-material/Google";
import { auth, provider } from "../services/firebase";
import { signInWithPopup } from "firebase/auth";

export const SignInPage = () => {
  const dispatch = useDispatch();
  const { dark_mode } = useSelector((state) => state.app);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(loginSchema) });
  const onSubmit = (data) => {
    const { email, password } = data;
    login({ email, password }, dispatch);
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
          component="h1"
          variant="h5"
          sx={{ color: dark_mode ? "white" : "black" }}
        >
          Sign in
        </Typography>
        <form
          noValidate
          style={{ marginTop: 1 }}
          onSubmit={handleSubmit(onSubmit)}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            focused
            sx={{
              input: { color: dark_mode ? "white" : "black" },
              color: "primary.main",
            }}
            {...register("email")}
            error={!!errors?.email}
            helperText={errors?.email ? errors.email.message : null}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label={"Password"}
            type="password"
            id="password"
            autoComplete="current-password"
            focused
            sx={{
              input: { color: dark_mode ? "white" : "black" },
              color: "primary.main",
            }}
            {...register("password")}
            error={!!errors?.password}
            helperText={errors?.password ? errors.password.message : null}
          />

          <Button
            type="submit"
            fullWidth
            variant="outlined"
            sx={{ mt: 3, mb: 2, color: "primary.main" }}
          >
            Sign In
          </Button>
        </form>
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
