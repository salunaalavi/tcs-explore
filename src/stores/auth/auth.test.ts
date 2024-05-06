import { renderHook } from "@testing-library/react";
import { useAuthStore } from "./auth";
import { login, register } from "@/features/auth";
import { act } from "react-test-renderer";

jest.mock("@/features/auth", () => ({
  __esModule: true,
  ...jest.requireActual("@/features/auth"),
  login: jest.fn(),
  logout: jest.fn(),
  register: jest.fn(),
}));

// as jest.Mock helps to not provide all axios response
const mockedLogin = jest.mocked(login) as jest.Mock;
const mockedRegister = jest.mocked(register) as jest.Mock;

const setup = () => {
  const userData = {
    email: "marmar12@gmail.com",
    username: "marmar12",
    bio: null,
    image: "https://api.realworld.io/images/smiley-cyrus.jpeg",
  };

  const { result } = renderHook(() => useAuthStore());

  return { userData, result };
};
describe("auth store", () => {
  it("initially provides null user", () => {
    const { result } = renderHook(() => useAuthStore());
    expect(result.current.user).toEqual(null);
  });

  it("on doLogin sets a user", async () => {
    const { result, userData } = setup();

    mockedLogin.mockImplementationOnce(() =>
      Promise.resolve({
        data: {
          user: userData,
        },
      }),
    );

    await act(async () => {
      await result.current.doLogin({
        email: "marmar12@gmail.com",
        password: "marmar12",
      });
    });

    expect(result.current.user).toEqual(userData);
  });
  it("doLogout removes current user", async () => {
    const { result, userData } = setup();

    mockedLogin.mockImplementationOnce(() =>
      Promise.resolve({
        data: {
          user: userData,
        },
      }),
    );

    await act(async () => {
      await result.current.doLogin({
        email: "marmar12@gmail.com",
        password: "marmar12",
      });
    });

    expect(result.current.user).toEqual(userData);

    await act(async () => {
      await result.current.doLogout();
    });

    expect(result.current.user).toEqual(null);
  });
  it("doRegister", async () => {
    const { result, userData } = setup();

    mockedRegister.mockImplementationOnce(() =>
      Promise.resolve({
        data: {
          user: userData,
        },
      }),
    );

    await act(async () => {
      await result.current.doRegister({
        email: "marmar12@gmail.com",
        password: "marmar12",
        username: "marmar12",
      });
    });

    expect(result.current.user).toEqual(userData);
  });
  it("resetUser", async () => {
    const { result, userData } = setup();

    mockedLogin.mockImplementationOnce(() =>
      Promise.resolve({
        data: {
          user: userData,
        },
      }),
    );

    await act(async () => {
      await result.current.doLogin({
        email: "marmar12@gmail.com",
        password: "marmar12",
      });
    });

    act(() => {
      result.current.resetUser();
    });

    expect(result.current.user).toEqual(null);
  });
});
