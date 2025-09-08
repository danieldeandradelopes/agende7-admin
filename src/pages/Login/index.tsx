import { InputPassword } from "@/components/design/InputPassword";
import Wrapper from "@/components/Wrapper";
import { useBrandingContext } from "@/context/branding";
import { brandingToUI } from "@/context/types";
import { useLogin } from "@/hooks/integration/auth/mutations";
import { useGetBranding } from "@/hooks/integration/branding/queries";
import { useAuth } from "@/hooks/utils/use-auth";
import { useCustomNavigate } from "@/hooks/utils/use-custom-navigate";
import { FormProvider } from "@/libs/form/FormProvider";
import { useZodForm } from "@/libs/form/useZodForm";
import { MoonOutlined, MoreOutlined, SunOutlined } from "@ant-design/icons";
import { FloatButton } from "antd";
import { useEffect } from "react";
import { Controller } from "react-hook-form";
import s from "./login.module.scss";
import { LoginType, loginSchema } from "./schema";

function Login() {
  const navigate = useCustomNavigate();
  const { getUser } = useAuth();
  const user = getUser();

  const { mutateAsync: loginMutateAsync, isPending } = useLogin();
  const { data: brandingData } = useGetBranding();

  const { handleSetBranding, theme, setTheme } = useBrandingContext();

  const form = useZodForm({
    schema: loginSchema,
    mode: "onSubmit",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function handleSubmit(formData: LoginType) {
    const result = await loginMutateAsync(formData);
    handleNavigate(result.user.access_level);
  }

  function handleNavigate(userType: string) {
    if (userType === "barber" || userType === "admin") {
      navigate("/barber-schedules");
      return;
    }

    navigate("/schedules");
  }

  useEffect(() => {
    if (user && user?.id) {
      if (user.access_level === "barber" || user.access_level === "admin") {
        navigate("/barber-schedules");
        return;
      }

      navigate("/schedules");
    }
  }, [user]);

  useEffect(() => {
    if (brandingData) {
      const parsed = brandingData.map(brandingToUI);
      handleSetBranding(parsed);
    }
  }, [brandingData]);

  function handleChangeTheme() {
    setTheme(theme === "dark" ? "light" : "dark");
  }

  return (
    <div className={s.container}>
      <div className={s.content}>
        <h1>Login</h1>
        <FormProvider
          form={form}
          onSubmit={(data) => handleSubmit(data)}
          className={s.form}
        >
          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Wrapper<LoginType>
                errorMessage={fieldState.error?.message}
                error={Boolean(fieldState.error)}
                name="email"
              >
                <input
                  name="email"
                  type="email"
                  placeholder="Digite seu email"
                  value={field.value}
                  onChange={(value) => field.onChange(value)}
                />
              </Wrapper>
            )}
          />
          <Controller
            name="password"
            control={form.control}
            render={({ field, fieldState }) => (
              <Wrapper
                errorMessage={fieldState.error?.message}
                error={Boolean(fieldState.error)}
                name="password"
              >
                <InputPassword
                  name="password"
                  type="password"
                  placeholder="Digite sua senha"
                  value={field.value}
                  onChange={(value) => field.onChange(value)}
                />
              </Wrapper>
            )}
          />

          <div className={s.buttons}>
            <button className="btn--primary" type="submit" disabled={isPending}>
              ENTRAR
            </button>
          </div>
        </FormProvider>
      </div>

      <FloatButton.Group
        trigger="click"
        placement="top"
        style={{ position: "absolute", bottom: 96 }}
        type="primary"
        icon={<MoreOutlined />}
      >
        <FloatButton
          shape="circle"
          type="primary"
          icon={theme === "dark" ? <SunOutlined /> : <MoonOutlined />}
          className={s.float}
          onClick={handleChangeTheme}
        />
      </FloatButton.Group>
    </div>
  );
}

export default Login;
